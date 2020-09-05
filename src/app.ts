import express from 'express';
import routes from './routes';

const httpProvider = express();

httpProvider.use(express.json());
httpProvider.use(routes);

export default httpProvider;
