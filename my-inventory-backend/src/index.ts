import { createApp } from 'src/app';

const app = createApp();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
