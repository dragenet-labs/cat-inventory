import { NextFunction, Request, Response } from 'express';
import { HttpError, HttpInternalServerError, HttpNotFound } from 'my-inventory-common/errors';

export const DefaultErrorMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpNotFound());
};

export const ErrorLoggerMiddleware = (
  err: HttpError | Error,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (!(err instanceof HttpError)) console.error(err);
  next(err);
};

export const ErrorMiddleware = (
  err: HttpError | Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  const returnError = err instanceof HttpError ? err : new HttpInternalServerError();
  res.status(returnError.statusCode).json(returnError.toJson());
  next();
};
