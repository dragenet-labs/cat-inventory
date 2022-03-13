import { UserStorageDTO } from 'src/storages/prisma-postgres/user.storage';
import { InvitationStorageDTO } from 'src/storages/prisma-postgres/invitation.storage';
import { prismaClient } from 'src/utils';
import { services } from 'src/services/index';
import { storages } from 'src/storages/prisma-postgres';

export type CreateUserWithInvitationDTO = Pick<UserStorageDTO, 'email' | 'passwordHash'>;
export const createUserWithInvitation = async (
  user: CreateUserWithInvitationDTO,
  invitation: InvitationStorageDTO
) =>
  prismaClient.$transaction(async () => {
    await services.invitationService.burnInvitation(invitation);
    return await storages.userStorage.createUser({ ...user, invitationId: invitation.id });
  });
