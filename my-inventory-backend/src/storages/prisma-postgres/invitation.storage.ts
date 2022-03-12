import { Invitation } from '@prisma/client';
import { prismaClient } from 'src/utils';

export type InvitationStorageDTO = Invitation;
export type InvitationMatcher = Partial<Invitation>;

export type CreateInvitationData = Pick<InvitationStorageDTO, 'code' | 'volume' | 'status' | 'expiresAt'>;
export const createInvitation = async (data: CreateInvitationData): Promise<InvitationStorageDTO | null> =>
  prismaClient.invitation.create({
    data
  });

export const getInvitation = async (matcher: InvitationMatcher): Promise<InvitationStorageDTO | null> =>
  prismaClient.invitation.findUnique({ where: matcher });

export type UpdateInvitationData = Partial<Exclude<CreateInvitationData, 'code'>>;
export const updateInvitation = async (
  matcher: InvitationMatcher,
  data: UpdateInvitationData
): Promise<InvitationStorageDTO | null> =>
  prismaClient.invitation.update({
    where: matcher,
    data: data
  });
