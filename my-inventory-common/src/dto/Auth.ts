import { z } from 'zod';
import { zodInvitationCode } from './Invitation';

export const zodEmail = z.string().email({ message: 'Invalid email address' });
export type ZodEmail = z.infer<typeof zodPassword>;

export const zodPassword = z
  .string()
  .min(8, { message: 'Password must contain at least 8 characters' });
export type ZodPassword = z.infer<typeof zodPassword>;

export const zodRegisterUserRequestDTO = z.object({
  email: zodEmail,
  password: zodPassword,
  invitationCode: zodInvitationCode
});
export type ZodRegisterUserRequestDTO = z.infer<typeof zodRegisterUserRequestDTO>;

export const zodLoginRequestDTO = z.object({
  email: zodEmail,
  password: zodPassword
});
export type ZodLoginRequestDTO = z.infer<typeof zodLoginRequestDTO>;
