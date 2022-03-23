import supertest from 'supertest';
import { SuperAgentTest } from 'supertest';
import moment from 'moment';
import { app } from '../app';
import { prismaClient } from '../utils';
import {
  burnTestInvitation,
  createTestInvitation,
  validateTestInvitation
} from './utils/invitation';

const expiresIn = 7;

describe('[E2E] Invitation', () => {
  let request: SuperAgentTest;

  beforeEach(() => {
    request = supertest.agent(app);
  });

  it('can be created', async () => {
    jest.useFakeTimers();

    const res = await createTestInvitation(request, expiresIn);

    expect(res.statusCode).toEqual(200);

    const invitation = await prismaClient.invitation.findFirst({
      where: { code: res.body.code }
    });

    expect(invitation).not.toBeNull();
    expect(invitation?.volume).toBe(1);
    expect(res.body.expiresAt).toBe(moment().add(expiresIn, 'days').toDate().toISOString());
    jest.useRealTimers();
  });

  it('can be create with custom volume', async () => {
    jest.useFakeTimers();
    const invitationVolume = 10;
    const res = await createTestInvitation(request, expiresIn, invitationVolume);

    expect(res.statusCode).toEqual(200);

    const invitation = await prismaClient.invitation.findFirst({
      where: { code: res.body.code }
    });

    expect(invitation).not.toBeNull();
    expect(invitation?.volume).toBe(invitationVolume);
    expect(res.body.expiresAt).toBe(moment().add(expiresIn, 'days').toDate().toISOString());
    jest.useRealTimers();
  });

  it('can be validated', async () => {
    const invitation = await createTestInvitation(request, expiresIn);
    const res = await validateTestInvitation(request, invitation.body.code);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('ACTIVE');
  });

  it('can be burned', async () => {
    const invitation = await createTestInvitation(request, expiresIn);
    const res = await burnTestInvitation(request, invitation.body.code);
    const burnedInvitation = await prismaClient.invitation.findFirst({
      where: { code: invitation.body.code }
    });
    expect(res.statusCode).toEqual(200);
    expect(burnedInvitation?.status).toEqual('INACTIVE');
    expect(burnedInvitation?.volume).toEqual(0);
  });

  it('validate with error when used', async () => {
    const invitation = await createTestInvitation(request, expiresIn);
    await burnTestInvitation(request, invitation.body.code);
    const res = await validateTestInvitation(request, invitation.body.code);
    expect(res.statusCode).toEqual(400);
    expect(res.body.type).toEqual('INACTIVE_INVITATION_CODE');
  });

  it('validate with error when expired', async () => {
    const invitation = await createTestInvitation(request, 0);
    const res = await validateTestInvitation(request, invitation.body.code);
    expect(res.statusCode).toEqual(400);
    expect(res.body.type).toEqual('EXPIRED_INVITATION_CODE');
  });
});
