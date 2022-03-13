import { z } from 'zod';
import { zodInvitationCode } from './Invitation';

export const zodPassword = z
  .string()
  .min(8, { message: 'Password must contain at least 8 characters' });
export type ZodPassword = z.infer<typeof zodPassword>;

export const zodRegisterUserDTO = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: zodPassword,
  invitationCode: zodInvitationCode
});
export type ZodRegisterUserDTO = z.infer<typeof zodRegisterUserDTO>;
