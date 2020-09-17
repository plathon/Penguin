import { Router } from 'express';
import createUserController from './useCases/users/createUser';

const routes = Router();

routes.post('/users', createUserController.execute);

export default routes;
