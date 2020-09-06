import express from 'express';
import routes from './routes';
import 'reflect-metadata';

const httpProvider = express();

httpProvider.use(express.json());
httpProvider.use(routes);

export default httpProvider;
