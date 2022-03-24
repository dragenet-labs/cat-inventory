import { InvitationCode, ZodUserDTO } from 'my-inventory-common/dto';
import { SuperAgentTest } from 'supertest';
import { TestResponseWithBody } from 'src/__test__/utils/common';

type RegisterTestUser = TestResponseWithBody<ZodUserDTO>;
export const registerTestUser = async (
  request: SuperAgentTest,
  code: InvitationCode,
  email: string,
  password: string
): Promise<RegisterTestUser> =>
  request.post('/auth/register').send({
    email,
    password,
    invitationCode: code
  });
