import { Invitation } from '@prisma/client';
import { prismaClient } from 'src/utils';

export type InvitationDTO = Invitation;
export type InvitationMatcher = Partial<Invitation>;

export type CreateInvitationData = Pick<Invitation, 'code' | 'volume' | 'status' | 'expiresAt'>;
export const createInvitation = async (data: CreateInvitationData): Promise<Invitation | null> =>
  prismaClient.invitation.create({
    data
  });

export const getInvitation = async (matcher: InvitationMatcher): Promise<Invitation | null> =>
  prismaClient.invitation.findUnique({ where: matcher });

export type UpdateInvitationData = Partial<Exclude<CreateInvitationData, 'code'>>;
export const updateInvitation = async (
  matcher: InvitationMatcher,
  data: UpdateInvitationData
): Promise<Invitation | null> =>
  prismaClient.invitation.update({
    where: matcher,
    data: data
  });
