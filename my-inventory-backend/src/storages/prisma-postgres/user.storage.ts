import {Invitation, User} from '@prisma/client'
import {prismaClient} from "src/utils";

export type UserStorageDTO = User;
export type UserMatcher = Partial<Invitation>;

export type CreateUserData = Pick<UserStorageDTO, 'email' | 'invitationId'>;
export const createUser = async (data: CreateUserData): Promise<UserStorageDTO | null> =>
    prismaClient.user.create({
        data
    });

export const getUser = async (matcher: UserMatcher): Promise<UserStorageDTO | null> =>
    prismaClient.user.findUnique({ where: matcher });

export type UpdateUserData = Partial<Exclude<CreateUserData, 'code'>>;
export const updateInvitation = async (
    matcher: UserMatcher,
    data: UpdateUserData
): Promise<UserStorageDTO | null> =>
    prismaClient.user.update({
        where: matcher,
        data: data
    });