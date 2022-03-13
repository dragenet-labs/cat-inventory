import { z } from 'zod';

export const zodUserDTO = z.object({
  id: z.string().uuid(),
  email: z.string().email({ message: 'Invalid email address' }),
  invitationId: z.string().uuid(),
  createdAt: z.date()
});
export type ZodUserDTO = z.infer<typeof zodUserDTO>;
