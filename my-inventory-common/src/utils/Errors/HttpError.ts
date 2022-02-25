import { ErrorTypes } from './ErrorTypes';

export interface HttpErrorDTO {
  type: ErrorTypes;
  message: string;
}

export class HttpError extends Error {
  type: ErrorTypes;
  statusCode: number;

  constructor(type: ErrorTypes, message: string, code: number) {
    super(message);
    this.type = type;
    this.statusCode = code;
  }

  toJson(): HttpErrorDTO {
    return {
      type: this.type,
      message: this.message
    };
  }
}

export class HttpBadRequest extends HttpError {
  constructor(type?: ErrorTypes, message?: string) {
    super(type || ErrorTypes.HTTP_BAD_REQUEST, message || 'Bad request', 400);
  }
}

export class HttpUnauthorized extends HttpError {
  constructor(type?: ErrorTypes, message?: string) {
    super(type || ErrorTypes.HTTP_UNAUTHORIZED, message || 'Unauthorized', 401);
  }
}

export class HttpForbidden extends HttpError {
  constructor(type?: ErrorTypes, message?: string) {
    super(type || ErrorTypes.HTTP_FORBIDDEN, message || 'Forbidden', 401);
  }
}

export class HttpNotFound extends HttpError {
  constructor(type?: ErrorTypes, message?: string) {
    super(type || ErrorTypes.HTTP_NOT_FOUND, message || 'Not found', 404);
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(type?: ErrorTypes, message?: string) {
    super(type || ErrorTypes.HTTP_INTERNAL_SERVER_ERROR, message || 'Internal Server Error', 500);
  }
}
