import supertest, { SuperAgentTest } from 'supertest';
import { createApp } from '../../app';
import { createTestInvitation } from '../utils/invitation';
import { registerTestUser } from '../utils/auth';
import { prismaClient } from '../../utils';

describe('[E2E] Auth', () => {
  let request: SuperAgentTest;

  beforeEach(() => {
    const app = createApp();
    request = supertest.agent(app);
  });

  it('User can register with invitation code', async () => {
    const email = 'first@user.com';
    const invitation = await createTestInvitation(request);
    const res = await registerTestUser(request, invitation.body.code, email, 'changeme');

    console.log('res.body', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.passwordHash).toBeUndefined();

    const dbUser = await prismaClient.user.findFirst({ where: { email } });

    expect(dbUser).not.toBeNull();
  });
});
