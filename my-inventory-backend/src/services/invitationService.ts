import { prismaClient } from 'src/utils';
import { InvitationCode, InvitationStatus } from 'my-inventory-common/dto';
import { Invitation } from '@prisma/client';

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

interface UpdateInvitation {
  expiresAt?: Date;
  status?: InvitationStatus;
  userId?: string;
}

export const updateInvitation = async (
  invitation: Invitation,
  { expiresAt, status }: UpdateInvitation
) =>
  prismaClient.invitation.update({
    where: { id: invitation.id },
    data: { expiresAt, status }
  });
