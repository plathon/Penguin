import { ValidationException } from '@errors/ValidationException';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import CreateUserUseCase from './createUserUseCase';

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return next(new ValidationException());
    }

    const body = request.body
    try {
      const user = await this.createUserUseCase.execute(body);
      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
