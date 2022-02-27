import { ZodSchema } from 'zod';

export function parseResponse<T>(response: unknown, zodValidator: ZodSchema<T>): T {
  return zodValidator.parse(response);
}
