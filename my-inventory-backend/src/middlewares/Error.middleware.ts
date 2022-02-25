import { NextFunction, Request, Response } from 'express';
import { HttpError, HttpInternalServerError } from 'my-inventory-common/utils/Errors';

export const ErrorMiddleware = (err: HttpError | Error, _req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  const returnError = err instanceof HttpError ? err : new HttpInternalServerError();
  res.status(returnError.statusCode).send(returnError.toJson());
  next();
};
