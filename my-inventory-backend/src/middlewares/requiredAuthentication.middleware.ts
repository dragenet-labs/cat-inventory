import { ZodUserDTO } from 'my-inventory-common/dto';
import { HttpUnauthorized } from 'my-inventory-common/errors';
import { Request } from 'express';

export interface AuthenticatedUserData {
  user: ZodUserDTO;
}
export const requireAuthentication =
  () =>
  (data: unknown, req: Request): AuthenticatedUserData => {
    const { user } = req;
    if (!user) throw new HttpUnauthorized();
    return { ...(data instanceof Object ? data : {}), user };
  };
