import { ZodError } from 'zod';
import { HttpInvalidInvitationCode } from 'my-inventory-common/errors';

export const handleInvitationValidationError =
  (invitationCodeFieldName = 'code') =>
  (error: ZodError) => {
    const validationCode = error.errors
      .filter(
        (error) =>
          error.path.includes(invitationCodeFieldName) &&
          (error.code === 'too_small' || error.code === 'too_big')
      )
      .map((error) => error.code);
    if (validationCode.length > 0) {
      throw new HttpInvalidInvitationCode();
    }
  };
