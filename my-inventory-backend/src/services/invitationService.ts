import { prismaClient } from 'src/utils';
import { InvitationCode, InvitationStatus } from 'my-inventory-common/dto';
import { Invitation } from '@prisma/client';
import {
  HttpExpiredInvitationCode,
  HttpInactiveInvitationCode,
  HttpInvalidInvitationCode
} from 'my-inventory-common/errors';

interface CreateInvitation {
  invitationCode: InvitationCode;
  expiresAt: Date;
  volume: number;
}

export const createInvitation = async ({ invitationCode, expiresAt, volume }: CreateInvitation) =>
  prismaClient.invitation.create({
    data: {
      code: invitationCode,
      expiresAt,
      volume
    }
  });

export const getInvitationByCode = async (invitationCode: InvitationCode) =>
  prismaClient.invitation.findUnique({
    where: { code: invitationCode }
  });

export const burnInvitation = async (invitation: Invitation) => {
  const newVolume = invitation.volume - 1;
  await updateInvitation(invitation, { volume: newVolume });
};

interface UpdateInvitation {
  expiresAt?: Date;
  status?: InvitationStatus;
  volume?: number;
  userId?: string;
}

export const updateInvitation = async (
  invitation: Invitation,
  { expiresAt, status, volume }: UpdateInvitation
) => {
  const res = await prismaClient.invitation.update({
    where: { id: invitation.id },
    data: { expiresAt, status, volume }
  });
  await checkIsInvitationValid(res);
  return res;
};

type CheckIsInvitationValidReturn =
  | HttpInvalidInvitationCode
  | HttpExpiredInvitationCode
  | HttpInactiveInvitationCode
  | null;
export const checkIsInvitationValid = async (
  invitation: Invitation
): Promise<CheckIsInvitationValidReturn> => {
  if (invitation.status === 'EXPIRED') return new HttpExpiredInvitationCode();
  if (invitation.expiresAt < new Date()) {
    await expireInvitation(invitation);
    return new HttpExpiredInvitationCode();
  }

  if (invitation.status === 'INACTIVE') return new HttpInactiveInvitationCode();
  if (invitation.volume < 1) {
    await inactivateInvitation(invitation);
    return new HttpInactiveInvitationCode();
  }

  return null;
};

export const inactivateInvitation = async (invitation: Invitation) =>
  prismaClient.invitation.update({ where: { id: invitation.id }, data: { status: 'INACTIVE' } });

export const expireInvitation = async (invitation: Invitation) =>
  prismaClient.invitation.update({ where: { id: invitation.id }, data: { status: 'EXPIRED' } });
