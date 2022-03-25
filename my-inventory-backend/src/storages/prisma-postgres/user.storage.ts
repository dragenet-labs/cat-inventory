import { User } from '@prisma/client';
import { prismaClient } from 'src/utils';

export type UserStorageDTO = User;
export type UserMatcher = Partial<UserStorageDTO>;

export type CreateUserData = Pick<UserStorageDTO, 'email' | 'passwordHash' | 'invitationId'>;
export const createUser = async (data: CreateUserData): Promise<UserStorageDTO | null> =>
  prismaClient.user.create({
    data
  });

export const getUser = async (matcher: UserMatcher): Promise<UserStorageDTO | null> =>
  prismaClient.user.findUnique({ where: matcher });

export type UpdateUserData = Partial<Exclude<CreateUserData, 'invitationId'>>;
export const updateUser = async (
  matcher: UserMatcher,
  data: UpdateUserData
): Promise<UserStorageDTO | null> =>
  prismaClient.user.update({
    where: matcher,
    data: data
  });
