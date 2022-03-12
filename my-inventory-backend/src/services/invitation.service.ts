import {
  HttpExpiredInvitationCode,
  HttpInactiveInvitationCode,
  HttpInvalidInvitationCode
} from 'my-inventory-common/errors';
import { storages } from 'src/storages/prisma-postgres';
import {
  CreateInvitationData,
  InvitationStorageDTO,
  UpdateInvitationData
} from 'src/storages/prisma-postgres/invitation.storage';
import { InvitationCode } from 'my-inventory-common/dto';

export const createInvitation = (data: Optional<CreateInvitationData, 'status'>) =>
  storages.invitationStorage.createInvitation({
    status: 'ACTIVE',
    ...data
  });

export const burnInvitation = async (invitation: InvitationStorageDTO) => {
  const newVolume = invitation.volume - 1;
  await checkIsInvitationValid(invitation);
  await storages.invitationStorage.updateInvitation(
    { code: invitation.code },
    { volume: newVolume }
  );
};

export const getInvitationByCode = (code: InvitationCode) =>
  storages.invitationStorage.getInvitation({ code });

export const updateInvitation = async (invitation: InvitationStorageDTO, data: UpdateInvitationData) => {
  const res = await storages.invitationStorage.updateInvitation({ code: invitation.code }, data);
  if (res === null) throw new HttpInvalidInvitationCode();
  await checkIsInvitationValid(res, true);
  return res;
};

type CheckIsInvitationValidReturn =
  | HttpInvalidInvitationCode
  | HttpExpiredInvitationCode
  | HttpInactiveInvitationCode
  | undefined;
export const checkIsInvitationValid = async (
  invitation: InvitationStorageDTO,
  doNotThrow = false
): Promise<CheckIsInvitationValidReturn> => {
  try {
    if (invitation.status === 'EXPIRED') throw new HttpExpiredInvitationCode();
    if (invitation.expiresAt < new Date()) {
      await expireInvitation(invitation);
      throw new HttpExpiredInvitationCode();
    }

    if (invitation.status === 'INACTIVE') return new HttpInactiveInvitationCode();
    if (invitation.volume < 1) {
      await inactivateInvitation(invitation);
      throw new HttpInactiveInvitationCode();
    }
    return;
  } catch (e) {
    if (!doNotThrow) {
      throw e;
    }
  }
};

export const inactivateInvitation = async (invitation: InvitationStorageDTO) =>
  updateInvitation(invitation, { status: 'INACTIVE' });

export const expireInvitation = async (invitation: InvitationStorageDTO) =>
  updateInvitation(invitation, { status: 'EXPIRED' });
