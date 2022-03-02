import { z } from 'zod';

export const zodInvitationCode = z.string().length(512);
export type InvitationCode = z.infer<typeof zodInvitationCode>;

export const zodInvitationStatus = z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED']);
export type InvitationStatus = z.infer<typeof zodInvitationStatus>;

export const zodCreateInvitationCodeRequestDTO = z.object({
  expiresIn: z.number(),
  volume: z.number().int().default(1)
});
export type CreateInvitationCodeRequestDTO = z.infer<typeof zodCreateInvitationCodeRequestDTO>;

export const zodInvitationCodeResponseDTO = z.object({
  code: zodInvitationCode,
  status: zodInvitationStatus,
  expiresAt: z.date(),
  createdAt: z.date()
});
export type InvitationCodeResponseDTO = z.infer<typeof zodCreateInvitationCodeRequestDTO>;

export const zodValidateInvitationRequestDTO = z.object({
  invitationCode: zodInvitationCode
});
export type ValidateInvitationRequestDTO = z.infer<typeof zodValidateInvitationRequestDTO>;

export const zodBurnInvitationRequestDTO = z.object({
  invitationCode: zodInvitationCode
});
export type BurnInvitationRequestDTO = z.infer<typeof zodValidateInvitationRequestDTO>;
