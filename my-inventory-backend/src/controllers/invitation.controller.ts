import { randomBytes } from 'crypto';
import { responseOf, parseResponse, TypedRequestBody, TypedRequestParams } from 'src/utils';
import moment from 'moment';
import {
  CreateInvitationCodeRequestDTO,
  zodInvitationCodeResponseDTO
} from 'my-inventory-common/dto';
import {
  BurnInvitationRequestDTO,
  ValidateInvitationRequestDTO
} from 'my-inventory-common/dist/dto';
import { services } from 'src/services';
import { HttpInvalidInvitationCode } from 'my-inventory-common/errors';
import { checkIsInvitationValid } from 'src/services/invitationService';

export async function createInvitation(data: TypedRequestBody<CreateInvitationCodeRequestDTO>) {
  const invitationCode = randomBytes(process.env.INVITATION_CODE_LENGTH / 2).toString('hex');
  const expiresAt = moment().add(data.body.expiresIn, 'days').toDate();
  const { volume } = data.body;

  const createdInvitationCode = await services.invitationService.createInvitation({
    invitationCode,
    expiresAt,
    volume
  });

  return responseOf(parseResponse(createdInvitationCode, zodInvitationCodeResponseDTO));
}

export async function validateInvitation(data: TypedRequestParams<ValidateInvitationRequestDTO>) {
  const invitation = await services.invitationService.getInvitationByCode(
    data.params.invitationCode
  );
  if (invitation === null) return new HttpInvalidInvitationCode();

  const invitationValidationError = await checkIsInvitationValid(invitation);
  if (invitationValidationError !== null) {
    throw invitationValidationError;
  }
  return responseOf(parseResponse(invitation, zodInvitationCodeResponseDTO));
}

export async function burnInvitation(data: TypedRequestBody<BurnInvitationRequestDTO>) {
  const invitation = await services.invitationService.getInvitationByCode(data.body.invitationCode);
  if (invitation === null) return new HttpInvalidInvitationCode();

  const invitationValidationError = await checkIsInvitationValid(invitation);
  if (invitationValidationError !== null) {
    throw invitationValidationError;
  }
  await services.invitationService.burnInvitation(invitation);
  return responseOf({});
}
