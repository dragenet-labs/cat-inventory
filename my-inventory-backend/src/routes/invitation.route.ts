import { Router } from 'express';
import { InvitationController } from 'src/controllers';
import { asyncHandler, zodSanitize } from 'src/utils';
import {
  zodCreateInvitationCodeRequestDTO,
  zodValidateInvitationRequestDTO
} from 'my-inventory-common/dto';
import { HttpInvalidInvitationCode } from 'my-inventory-common/errors';
import { zodWithParams } from 'src/utils/zod';
import { ZodError } from 'zod';
import { zodBurnInvitationRequestDTO } from 'my-inventory-common/dist/dto';

export const invitationRoutes = Router();

const handleInvitationValidationError = (error: ZodError) => {
  const validationCode = error.errors
    .map((error) => error.code)
    .filter((errorCode) => errorCode === 'too_small' || errorCode === 'too_big');
  if (validationCode.length > 0) {
    throw new HttpInvalidInvitationCode();
  }
};

invitationRoutes.get(
  '/:invitationCode',
  asyncHandler(
    zodSanitize(zodWithParams(zodValidateInvitationRequestDTO), {
      onError: handleInvitationValidationError
    }),
    InvitationController.validateInvitation
  )
);

invitationRoutes.post(
  '/',
  asyncHandler(
    zodSanitize({ body: zodCreateInvitationCodeRequestDTO }),
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
