import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config/constants';
import apiRouter from './routes/index';
import { respondWithSuccess, respondWithWarning } from './helpers/respondHandlers';

const app = express();

const whitelist = [
  'http://localhost:4000',
];
const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`));
    }
  },
  credentials: true,
};
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(apiRouter);
app.get('/', (req, res) => respondWithSuccess(res, 200, 'Welcome to auth test', {}));

interface Error {
  status?: number;
  message: string;
}

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found') as Error;
  error.status = 404;
  next(error);
});



if (process.env.NODE_ENV === 'development') {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    return respondWithWarning(res, error.status || 500, error.message, error);
  });
} else {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    // this is a capricorn error message for when account need to be funded
    if (error.message.startsWith('Cannot complete exchange.')) return respondWithWarning(res, 500, 'Unable to process, please try again', null);
    respondWithWarning(res, error.status || 500, 'something bad happened, please try again', null);
  });
}

const port = PORT || 5000;

app.listen(PORT, () => console.log(`app started on port ${port}`));

export default app;
