import database from '@config/database'
import CreateUserController from './createUserController';
import UserRepository from '@repositories/userRepository';
import CreateUserUseCase from './createUserUseCase';

const userRepository = new UserRepository(database);
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export default createUserController;
