import { SuperAgentTest } from 'supertest';
import { InvitationCode, InvitationResponseDTO } from 'my-inventory-common/dto';
import { TestResponseWithBody } from 'src/__test__/utils/common';

export type InvitationTest = TestResponseWithBody<InvitationResponseDTO>;

export const createTestInvitation = async (
  request: SuperAgentTest,
  expiresIn = 7,
  volume?: number
): Promise<InvitationTest> =>
  await request.post('/invitation').send({
    expiresIn,
    volume
  });

export const validateTestInvitation = async (
  request: SuperAgentTest,
  code: InvitationCode
): Promise<InvitationTest> =>
  await request.post('/invitation/validate').send({
    code
  });

type BurnInvitationResponse = TestResponseWithBody<Record<string, never>>;
export const burnTestInvitation = async (
  request: SuperAgentTest,
  code: InvitationCode
): Promise<BurnInvitationResponse> =>
  await request.post('/invitation/burn').send({
    code
  });
