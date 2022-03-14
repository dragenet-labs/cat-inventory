import { Router } from 'express';
import { asyncHandler, zodSanitize, zodSanitizeExpress } from 'src/utils';
import { zodRegisterUserRequestDTO, zodLoginRequestDTO } from 'my-inventory-common/dto';
import { zodWithBody } from 'src/utils/zod';
import { AuthController } from 'src/controllers';
import { handleInvitationValidationError } from 'src/utils/invitation/handleInvitationValidationError';
import { passport } from 'src/middlewares/passport';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  asyncHandler(
    zodSanitize(zodWithBody(zodRegisterUserRequestDTO), {
      onError: handleInvitationValidationError('invitationCode')
    }),
    AuthController.registerUser
  )
);

authRoutes.post(
  '/login',
  zodSanitizeExpress(zodWithBody(zodLoginRequestDTO)),
  passport.authenticate('local'),
  asyncHandler(zodSanitize(zodWithBody(zodLoginRequestDTO)), AuthController.loginUser)
);
