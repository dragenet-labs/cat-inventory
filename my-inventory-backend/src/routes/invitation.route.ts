import { Router } from 'express';
import { InvitationController } from 'src/controllers';
import { asyncHandler, zodSanitize } from 'src/utils';
import { zodWithBody } from 'src/utils/zod';
import {
  zodBurnInvitationRequestDTO,
  zodCreateInvitationRequestDTO,
  zodValidateInvitationRequestDTO
} from 'my-inventory-common/dto';
import { handleInvitationValidationError } from 'src/utils/invitation/handleInvitationValidationError';

export const invitationRoutes = Router();

invitationRoutes.post(
  '/validate',
  asyncHandler(
    zodSanitize(zodWithBody(zodValidateInvitationRequestDTO), {
      onError: handleInvitationValidationError()
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
