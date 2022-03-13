import { ZodRegisterUserRequestDTO } from 'my-inventory-common/dto';
import { parseResponse, responseOf, TypedRequestBody } from 'src/utils';
import bcrypt from 'bcrypt';
import { services } from 'src/services';
import { checkIsInvitationValid } from 'src/services/invitation.service';
import { HttpInvalidInvitationCode } from 'my-inventory-common/errors';
import { zodUserDTO } from 'my-inventory-common/dist/dto';

export const registerUser = async (data: TypedRequestBody<ZodRegisterUserRequestDTO>) => {
  const { email, password, invitationCode } = data.body;
  const invitation = await services.invitationService.getInvitationByCode(invitationCode);

  if (invitation === null) throw new HttpInvalidInvitationCode();
  await checkIsInvitationValid(invitation);

  const passwordHash = await bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_ROUNDS));

  const user = await services.authService.createUserWithInvitation(
    { email, passwordHash },
    invitation
  );

  return responseOf(parseResponse(user, zodUserDTO));
};
