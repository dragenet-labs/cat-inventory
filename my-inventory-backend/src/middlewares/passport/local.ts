import { Strategy as LocalStrategy } from 'passport-local';
import { storages } from 'src/storages/prisma-postgres';
import { HttpInvalidEmailOrPassword } from 'my-inventory-common/errors';
import bcrypt from 'bcrypt';

export const localStategy = new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (username, password, done) => {
    const user = await storages.userStorage.getUser({ email: username });
    if (user === null) return done(new HttpInvalidEmailOrPassword());

    const passwdValidationResult = await bcrypt.compare(password, user.passwordHash);
    if (passwdValidationResult) {
      done(null, user);
    } else {
      done(new HttpInvalidEmailOrPassword());
    }
  }
);
