import { ZodRegisterUserRequestDTO } from 'my-inventory-common/dto';
import { parseResponse, responseOf, TypedRequestBody } from 'src/utils';
import bcrypt from 'bcrypt';
import { services } from 'src/services';
import { HttpInvalidInvitationCode } from 'my-inventory-common/errors';
import { zodUserDTO } from 'my-inventory-common/dto';
import { storages } from 'src/storages/prisma-postgres';
import { HttpUserWithEmailAlreadyExist } from 'my-inventory-common/dist/errors';

export const registerUser = async (data: TypedRequestBody<ZodRegisterUserRequestDTO>) => {
  const { email, password, invitationCode } = data.body;
  const [invitation, user] = await Promise.all([
    await services.invitationService.getInvitationByCode(invitationCode),
    await storages.userStorage.getUser({ email })
  ]);

  if (user !== null) throw new HttpUserWithEmailAlreadyExist();
  if (invitation === null) throw new HttpInvalidInvitationCode();

  const passwordHash = await bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_ROUNDS));

  const createdUser = await services.authService.createUserWithInvitation(
    { email, passwordHash },
    invitation
  );

  return responseOf(parseResponse(createdUser, zodUserDTO));
};
