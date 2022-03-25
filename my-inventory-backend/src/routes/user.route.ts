import { Router } from 'express';
import { asyncHandler } from 'src/utils';
import { requireAuthentication } from 'src/middlewares/requiredAuthentication.middleware';
import { UserController } from 'src/controllers';

export const userRoutes = Router();

userRoutes.get('/', asyncHandler(requireAuthentication(), UserController.getCurrentUser));
