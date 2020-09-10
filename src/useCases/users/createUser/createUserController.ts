import { Request, Response } from 'express';
import CreateUserUseCase from './createUserUseCase';

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  execute = async (request: Request, response: Response): Promise<void> => {
    const body = request.body
    const user = await this.createUserUseCase.execute(body);
    response.status(200).send({ users: user });
  }
}
