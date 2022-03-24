import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { DefaultErrorMiddleware, ErrorMiddleware } from 'src/middlewares';
import methodOverride from 'method-override';
import { appRoutes } from 'src/routes';
import { configurePassport } from 'src/middlewares/passport';
import cors from 'cors';

const defaultMorganLogsFormat =
  ':status :method :url HTTP/:http-version :remote-addr :res[content-length]B ":user-agent" - :response-time ms';

export const app = express();

app.use(methodOverride());
if (process.env.NODE_ENV !== 'test') app.use(morgan(defaultMorganLogsFormat));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
configurePassport(app);

app.use(appRoutes);

app.use(DefaultErrorMiddleware);
app.use(ErrorMiddleware);
