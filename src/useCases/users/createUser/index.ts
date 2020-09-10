import { createConnection } from 'typeorm';
import CreateUserController from './createUserController';
import UserRepository from '@repositories/userRepository';
import CreateUserUseCase from './createUserUseCase';


const connection = createConnection()
const userRepository = new UserRepository(connection);
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export default createUserController;
