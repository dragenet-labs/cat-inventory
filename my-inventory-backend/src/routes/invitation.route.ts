import { Router } from 'express';
import { InvitationController } from 'src/controllers';
import { asyncHandler, zodSanitize } from 'src/utils';
import { HttpInvalidInvitationCode } from 'my-inventory-common/errors';
import { zodWithBody } from 'src/utils/zod';
import { ZodError } from 'zod';
import {
  zodBurnInvitationRequestDTO,
  zodCreateInvitationRequestDTO,
  zodValidateInvitationRequestDTO
} from 'my-inventory-common/dto';

export const invitationRoutes = Router();

const handleInvitationValidationError = (error: ZodError) => {
  const validationCode = error.errors
    .map((error) => error.code)
    .filter((errorCode) => errorCode === 'too_small' || errorCode === 'too_big');
  if (validationCode.length > 0) {
    throw new HttpInvalidInvitationCode();
  }
};

invitationRoutes.post(
  '/validate',
  asyncHandler(
    zodSanitize(zodWithBody(zodValidateInvitationRequestDTO), {
      onError: handleInvitationValidationError
    }),
    InvitationController.validateInvitation
  )
);

invitationRoutes.post(
  '/',
  asyncHandler(
    zodSanitize({ body: zodCreateInvitationRequestDTO }),
    InvitationController.createInvitation
  )
);

invitationRoutes.post(
  '/burn',
  asyncHandler(
    zodSanitize({ body: zodBurnInvitationRequestDTO }),
    InvitationController.burnInvitation
  )
);
