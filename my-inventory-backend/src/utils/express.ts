import { z, ZodError } from 'zod';
import { ZodRawShape } from 'zod/lib/types';
import { NextFunction, Request, Response } from 'express';
import { HttpError, HttpInvalidZodRequestError } from 'my-inventory-common/errors';
import { UserStorageDTO } from 'src/storages/prisma-postgres/user.storage';

export type ResponseFunction = ((res: Response) => void) | HttpError;

export function responseOf<T>(data: T, status = 200): ResponseFunction {
  return (res) => res.status(status).json(data);
}

export const responseOfBuffer =
  (type: string, data: Buffer, status = 200): ResponseFunction =>
  (res) =>
    res.status(status).type(type).send(data);

export interface ZodSanitizeOptions {
  onError?: (error: ZodError) => unknown;
  customError?: HttpError;
}

export const zodSanitize = <S extends ZodRawShape>(schema: S, options?: ZodSanitizeOptions) => {
  return (_data: unknown, req: Request) => {
    try {
      return z.object(schema).parse({
        ...req,
        query: req.query,
        params: req.params,
        body: req.body
      });
    } catch (error) {
      if (error instanceof ZodError) {
        if (options?.onError) {
          options.onError(error);
          throw options.customError;
        }
        if (options?.customError) {
          throw options.customError;
        }
        throw new HttpInvalidZodRequestError(error);
      } else {
        throw error;
      }
    }
  };
};

export const zodSanitizeExpress =
  <S extends ZodRawShape>(schema: S, options?: ZodSanitizeOptions) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = z.object(schema).parse({
        ...req,
        query: req.query,
        params: req.params,
        body: req.body
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req = { ...req, ...parsed };
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        if (options?.onError) {
          options.onError(error);
          next(options.customError);
        }
        if (options?.customError) {
          next(options.customError);
        }
        next(new HttpInvalidZodRequestError(error));
      } else {
        next(error);
      }
    }
  };

export type TypedRequestBody<T> = { body: T; user?: UserStorageDTO };
export type TypedRequestParams<T> = { params: T; user?: UserStorageDTO };
