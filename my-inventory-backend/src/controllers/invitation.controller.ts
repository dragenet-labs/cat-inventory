import { randomBytes } from 'crypto';
import { responseOf, parseResponse, TypedRequestBody, TypedRequestParams } from 'src/utils';
import moment from 'moment';
import {
  CreateInvitationCodeRequestDTO,
  zodInvitationCodeResponseDTO
} from 'my-inventory-common/dto';
import { ValidateInvitationRequestDTO } from 'my-inventory-common/dist/dto';
import { services } from 'src/services';
import {
  HttpInvalidInvitationCode,
  HttpExpiredInvitationCode,
  HttpUsedInvitationCode
} from 'my-inventory-common/errors';

export async function createInvitation(data: TypedRequestBody<CreateInvitationCodeRequestDTO>) {
  const invitationCode = randomBytes(process.env.INVITATION_CODE_LENGTH / 2).toString('hex');
  const expiresAt = moment().add(data.body.expiresIn, 'days').toDate();

  const createdInvitationCode = await services.invitationService.createInvitation({
    invitationCode,
    expiresAt
  });

  return responseOf(parseResponse(createdInvitationCode, zodInvitationCodeResponseDTO));
}

export async function validateInvitation(data: TypedRequestParams<ValidateInvitationRequestDTO>) {
  const invitation = await services.invitationService.getInvitationByCode(
    data.params.invitationCode
  );

  if (invitation === null) throw new HttpInvalidInvitationCode();
  if (invitation.status === 'EXPIRED' || invitation.expiresAt < new Date()) {
    if (invitation.status !== 'EXPIRED') {
      await services.invitationService.updateInvitation(invitation, { status: 'EXPIRED' });
    }
    throw new HttpExpiredInvitationCode();
  }
  if (invitation.status === 'USED') throw new HttpUsedInvitationCode();

  return responseOf(parseResponse(invitation, zodInvitationCodeResponseDTO));
}
