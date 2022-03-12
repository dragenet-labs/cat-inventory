import { Router } from 'express';
import { invitationRoutes } from 'src/routes/invitation.route';

export const appRoutes = Router();

appRoutes.use('/invitation', invitationRoutes);
