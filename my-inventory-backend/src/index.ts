import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { DefaultErrorMiddleware, ErrorMiddleware } from 'src/middlewares';
import methodOverride from 'method-override';
import { appRoutes } from 'src/routes';

dotenv.config();
const PORT = process.env.PORT;

const defaultMorganLogsFormat =
  ':status :method :url HTTP/:http-version :remote-addr :res[content-length]B ":user-agent" - :response-time ms';

const app = express();

app.use(methodOverride());
app.use(morgan(defaultMorganLogsFormat));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use(appRoutes);

app.use(DefaultErrorMiddleware);
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
