import { randomBytes } from 'crypto';
import { responseOf, parseResponse, TypedRequestBody } from 'src/utils';
import moment from 'moment';
import {
  BurnInvitationRequestDTO,
  ValidateInvitationRequestDTO,
  CreateInvitationCodeRequestDTO,
  zodInvitationResponseDTO
} from 'my-inventory-common/dto';
import { services } from 'src/services';
import { HttpInvalidInvitationCode, HttpNotFound } from 'my-inventory-common/errors';
import { checkIsInvitationValid } from 'src/services/invitation.service';

export async function createInvitation(data: TypedRequestBody<CreateInvitationCodeRequestDTO>) {
  const code = randomBytes(process.env.INVITATION_CODE_LENGTH / 2).toString('hex');
  const expiresAt = moment().add(data.body.expiresIn, 'days').toDate();
  const { volume } = data.body;

  const createdInvitation = await services.invitationService.createInvitation({
    code,
    expiresAt,
    volume
  });

  if (createdInvitation === null) throw new HttpNotFound();

  return responseOf(parseResponse(createdInvitation, zodInvitationResponseDTO));
}

export async function validateInvitation(data: TypedRequestBody<ValidateInvitationRequestDTO>) {
  const invitation = await services.invitationService.getInvitationByCode(data.body.code);
  if (invitation === null) return new HttpInvalidInvitationCode();
  await checkIsInvitationValid(invitation);

  return responseOf(parseResponse(invitation, zodInvitationResponseDTO));
}

export async function burnInvitation(data: TypedRequestBody<BurnInvitationRequestDTO>) {
  const invitation = await services.invitationService.getInvitationByCode(data.body.code);

  if (invitation === null) return new HttpInvalidInvitationCode();

  await services.invitationService.burnInvitation(invitation);
  return responseOf({});
}
