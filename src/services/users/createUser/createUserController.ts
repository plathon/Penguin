import { NextFunction, Request, Response } from 'express'
import CreateUserService from './createUserService'
import requestErrorHandler from '@utils/requestErrorHandler'

export default class CreateUserController {
  constructor (private createUserService: CreateUserService) { }

  execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    if (!requestErrorHandler(request, next)) {
      return
    }

    const body = request.body
    try {
      const user = await this.createUserService.execute(body)
      response.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
