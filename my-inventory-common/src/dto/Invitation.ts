import { z } from 'zod';

export const zodInvitationCode = z.string().length(512);
export type InvitationCode = z.infer<typeof zodInvitationCode>;

export const zodInvitationStatus = z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED']);
export type InvitationStatus = z.infer<typeof zodInvitationStatus>;

export const zodCreateInvitationRequestDTO = z.object({
  expiresIn: z.number(),
  volume: z.number().int().default(1)
});
export type CreateInvitationCodeRequestDTO = z.infer<typeof zodCreateInvitationRequestDTO>;

export const zodInvitationResponseDTO = z.object({
  code: zodInvitationCode,
  status: zodInvitationStatus,
  expiresAt: z.date(),
  createdAt: z.date()
});
export type InvitationCodeResponseDTO = z.infer<typeof zodCreateInvitationRequestDTO>;

export const zodValidateInvitationRequestDTO = z.object({
  code: zodInvitationCode
});
export type ValidateInvitationRequestDTO = z.infer<typeof zodValidateInvitationRequestDTO>;

export const zodBurnInvitationRequestDTO = z.object({
  code: zodInvitationCode
});
export type BurnInvitationRequestDTO = z.infer<typeof zodValidateInvitationRequestDTO>;
