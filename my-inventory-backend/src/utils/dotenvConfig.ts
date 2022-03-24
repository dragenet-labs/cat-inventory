import path from 'path';
import dotenv from 'dotenv';

export const dotenvConfig = () => {
  const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
  const options = { path: path.resolve(process.cwd(), envFile) };
  dotenv.config(options);
};
