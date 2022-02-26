import { z, ZodError } from 'zod';
import { ZodRawShape } from 'zod/lib/types';
import { Request, Response } from 'express';
import { HttpInvalidZodRequestError } from 'my-inventory-common/utils/Errors';

export type ResponseFunction = (res: Response) => void;

export function responseOf<T>(data: T, status = 200): ResponseFunction {
  return (res) => res.status(status).json(data);
}

export const responseOfBuffer =
  (type: string, data: Buffer, status = 200): ResponseFunction =>
  (res) =>
    res.status(status).type(type).send(data);

export const zodSanitize = <S extends ZodRawShape>(schema: S) => {
  return (_data: unknown, req: Request) => {
    try {
      return z.object(schema).parse({
        ...req,
        query: req.query,
        params: req.params,
        body: req.body,
        ...req.params
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpInvalidZodRequestError(error);
      } else {
        throw error;
      }
    }
  };
};

export const sanitizePlug = () => ({});
