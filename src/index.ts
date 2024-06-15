import 'dotenv/config';
import './database/init.mongodb';

import http from 'http';
import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import { CustomError } from './utils/custom_error';

// import router from './routes/root.router.js';
// import limiter from './middlewares/preventSpam.js';

const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet({ contentSecurityPolicy: { directives: { 'script-src': ["'self'", "'unsafe-inline'"] } } }));
app.use(compression());
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  })
);

app.get('/', (_, res) => {
  res.send('Hello World!');
});

// handling error
app.use((_, __, next) => {
  const error: CustomError = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error: CustomError, __: Request, res: Response, _: NextFunction) => {
  console.log(`error::`, error);
  const status = error.status || 500;
  return res.status(status).json({
    status: status,
    stack: error.stack,
    message: error.message || 'Internal Server Error'
  });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
