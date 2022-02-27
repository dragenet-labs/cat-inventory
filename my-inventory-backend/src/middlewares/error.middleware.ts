import { NextFunction, Request, Response } from 'express';
import { HttpError, HttpInternalServerError, HttpNotFound } from 'my-inventory-common/errors';

export const DefaultErrorMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpNotFound());
};

export const ErrorMiddleware = (
  err: HttpError | Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  const returnError = err instanceof HttpError ? err : new HttpInternalServerError();
  res.status(returnError.statusCode).json(returnError.toJson());
  next();
};
