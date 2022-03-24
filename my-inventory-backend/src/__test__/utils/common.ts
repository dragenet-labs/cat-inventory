import { Request } from 'supertest';
import { HttpError } from 'my-inventory-common/errors';

export interface TestResponseWithBody<T> extends Request {
  body: T | HttpError;
}
