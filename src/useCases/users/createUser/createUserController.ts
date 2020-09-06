import { Request, Response } from 'express';

export default class CreateUserController {
  private users = []

  execute = (request: Request, response: Response) => {
    response.status(200).send({ users: this.users });
  }
}
