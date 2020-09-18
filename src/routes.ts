import { Router } from 'express';
import createUserController from './useCases/users/createUser';
import createUserValidator from '@validations/createUserValidator'

const routes = Router();

routes.post('/users', createUserValidator, createUserController.execute);

export default routes;
