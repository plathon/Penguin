import database from '@config/database'
import CreateUserController from './createUserController';
import UserRepository from '@repositories/userRepository';
import CreateUserService from './createUserService';

const userRepository = new UserRepository(database);
const createUserService = new CreateUserService(userRepository);
const createUserController = new CreateUserController(createUserService);

export default createUserController;
