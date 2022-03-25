import supertest, { SuperAgentTest } from 'supertest';
import { createApp } from '../../app';
import { createTestInvitation } from '../utils/invitation';
import { loginTestUser, registerTestUser } from '../utils/auth';
import { prismaClient } from '../../utils';
import { cookieParser } from '../utils/cookieParser';

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

    expect(res.statusCode).toEqual(200);
    expect(res.body.passwordHash).toBeUndefined();

    const dbUser = await prismaClient.user.findFirst({ where: { email } });
    expect(dbUser).not.toBeNull();
  });

  it('User can login', async () => {
    const email = 'second@user.com';
    const invitation = await createTestInvitation(request);
    await registerTestUser(request, invitation.body.code, email, 'changeme');
    const res = await loginTestUser(request, email, 'changeme');

    expect(res.statusCode).toEqual(200);

    const cookies = cookieParser(res.headers['set-cookie']);
    const connectSid = cookies['connect.sid'];
    expect(connectSid).not.toBeUndefined();

    const dbUser = await prismaClient.user.findFirst({ where: { email } });
    expect(dbUser).not.toBeNull();
    const sessions = await prismaClient.session.findMany({});
    const userSessions = sessions.filter(
      (session) => JSON.parse(session.data).passport.user === dbUser?.id
    );
    expect(userSessions).not.toEqual([]);
  });
});
