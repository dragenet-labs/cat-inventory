import { Router } from 'express';
import { invitationRoutes } from 'src/routes/invitation.route';
import { authRoutes } from 'src/routes/auth.route';
import { userRoutes } from 'src/routes/user.route';

export const appRoutes = Router();

appRoutes.use('/invitation', invitationRoutes);
appRoutes.use('/auth', authRoutes);
appRoutes.use('/user', userRoutes);
