import { z } from 'zod';

export const zodInvitationCode = z.string().length(512);
export type InvitationCode = z.infer<typeof zodInvitationCode>;

export const zodInvitationStatus = z.enum(['ACTIVE', 'USED', 'EXPIRED']);
export type InvitationStatus = z.infer<typeof zodInvitationStatus>;

export const zodCreateInvitationCodeRequestDTO = z.object({
  expiresIn: z.number()
});
export type CreateInvitationCodeRequestDTO = z.infer<typeof zodCreateInvitationCodeRequestDTO>;

export const zodInvitationCodeResponseDTO = z.object({
  code: zodInvitationCode,
  expiresAt: z.date(),
  status: zodInvitationStatus
});
export type InvitationCodeResponseDTO = z.infer<typeof zodCreateInvitationCodeRequestDTO>;

export const zodValidateInvitationRequestDTO = z.object({
  invitationCode: zodInvitationCode
});
export type ValidateInvitationRequestDTO = z.infer<typeof zodValidateInvitationRequestDTO>;
