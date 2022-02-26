import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { DefaultErrorMiddleware, ErrorMiddleware } from 'src/middlewares';
import { PrismaClient } from '@prisma/client';
import { HttpNotFound } from 'my-inventory-common/utils/Errors';
import methodOverride from 'method-override';
import { responseOf, zodSanitize, asyncHandler } from 'src/utils';
import { z } from 'zod';

const zodSchema = z.object({ email: z.string() });
const prisma = new PrismaClient();

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

app.post(
  '/',
  asyncHandler(zodSanitize({ body: zodSchema }), async (_, req) => {
    const res = await prisma.user.create({
      data: {
        email: req.body.email
      }
    });
    return responseOf(res);
  })
);
app.use((_req, _res, next) => {
  next(new HttpNotFound());
});

app.use(DefaultErrorMiddleware);
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
