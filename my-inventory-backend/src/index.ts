import { app } from 'src/app';
import { dotenvConfig } from 'src/utils/dotenvConfig';

dotenvConfig();

console.log('PASSWORD_HASH_ROUNDS', process.env.PASSWORD_HASH_ROUNDS);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
