import { Router } from 'express';
import { asyncHandler, zodSanitize } from 'src/utils';
import { zodRegisterUserDTO } from 'my-inventory-common/dto';
import { zodWithBody } from 'src/utils/zod';
import { AuthController } from 'src/controllers';
import { handleInvitationValidationError } from 'src/utils/invitation/handleInvitationValidationError';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  asyncHandler(
    zodSanitize(zodWithBody(zodRegisterUserDTO), {
      onError: handleInvitationValidationError('invitationCode')
    }),
    AuthController.registerUser
  )
);
