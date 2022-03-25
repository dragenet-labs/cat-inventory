import { AuthenticatedUserData } from 'src/middlewares/requiredAuthentication.middleware';
import { parseResponse, responseOf } from 'src/utils';
import { zodUserDTO } from 'my-inventory-common/dto';

export const getCurrentUser = (data: AuthenticatedUserData) =>
  responseOf(parseResponse(data.user, zodUserDTO));
