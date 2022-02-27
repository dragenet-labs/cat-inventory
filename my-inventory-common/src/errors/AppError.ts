import { ZodError } from 'zod';
import { HttpBadRequest, HttpErrorDTO } from './HttpError';
import { ErrorTypes } from './ErrorTypes';

export class HttpInvalidZodRequestError extends HttpBadRequest {
  constructor(public zodError: ZodError) {
    super(ErrorTypes.INVALID_ZOD_REQUEST, 'Request contains invalid data');
  }

  toJson(): HttpErrorDTO {
    return {
      ...super.toJson(),
      errors: this.zodError.errors
    };
  }
}

export class HttpInvalidInvitationCode extends HttpBadRequest {
  constructor() {
    super(ErrorTypes.INVALID_INVITATION_CODE, 'Your invitation code does not exist.');
  }
}

export class HttpExpiredInvitationCode extends HttpBadRequest {
  constructor() {
    super(ErrorTypes.EXPIRED_INVITATION_CODE, 'Your invitation code is expired.');
  }
}

export class HttpUsedInvitationCode extends HttpBadRequest {
  constructor() {
    super(ErrorTypes.USED_INVITATION_CODE, 'Your invitation code was used.');
  }
}
