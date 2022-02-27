import { ZodSchema } from 'zod';

export function zodWithBody<T>(schema: ZodSchema<T>) {
  return { body: schema };
}

export function zodWithParams<T>(schema: ZodSchema<T>) {
  return { params: schema };
}
