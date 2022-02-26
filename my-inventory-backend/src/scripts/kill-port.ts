import kill from 'kill-port';
import dotenv from 'dotenv';

dotenv.config();
// if (!process.env.PORT) {
//   console.error('PORT undefined');
//   process.exit(1);
// }
kill(process.env.PORT || 0).then(() => {
  console.log(`Process on port ${process.env.PORT} killed`);
});
