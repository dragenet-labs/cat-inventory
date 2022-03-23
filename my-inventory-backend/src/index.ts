import path from 'path';
import dotenv from 'dotenv';
import { app } from 'src/app';

const dotenvConfig = {
  path: process.env.NODE_ENV === 'test' ? path.resolve(process.cwd(), '.env.test') : undefined
};
console.log('dotenvConfig', dotenvConfig);
dotenv.config(dotenvConfig);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
