import { ErrorHandler } from '@errors/ErrorHandler';
import express from 'express';
import routes from './routes';

const httpProvider = express();

httpProvider.use(express.json());
httpProvider.use(routes);

const errorHandler = new ErrorHandler();
httpProvider.use(errorHandler.handle);

export default httpProvider;
