import { ValidationException } from '@errors/ValidationException';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import CreateUserService from './createUserService';

export default class CreateUserController {
  constructor(private createUserService: CreateUserService) { }

  execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      const errors = result.array();
      const exception = new ValidationException(errors)
      return next(exception);
    }

    const body = request.body
    try {
      const user = await this.createUserService.execute(body);
      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
