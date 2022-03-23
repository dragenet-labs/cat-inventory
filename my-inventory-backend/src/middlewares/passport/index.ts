import { Passport } from 'passport';
import { Express } from 'express';
import { localStategy } from 'src/middlewares/passport/local';
import { storages } from 'src/storages/prisma-postgres';
import { HttpInternalServerError } from 'my-inventory-common/errors';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prismaClient } from 'src/utils';
import session from 'express-session';
import { ZodUserDTO, zodUserDTO } from 'my-inventory-common/dto';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends ZodUserDTO {}
  }
}

export const passport = new Passport();

const prismaSessionStorage = new PrismaSessionStore(prismaClient, {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined
});

export const configurePassport = (app: Express) => {
  passport.use(localStategy);

  passport.serializeUser((user: ZodUserDTO, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await storages.userStorage.getUser({ id: id as string });
    if (user === null) done(new HttpInternalServerError());
    done(null, zodUserDTO.parse(user));
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: prismaSessionStorage,
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        secure: process.env.SESSION_SECURE === 'true',
        httpOnly: process.env.SESSION_HTTP_ONLY === 'true',
        maxAge: parseInt(process.env.SESSION_MAX_AGE) * 1000
      }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
