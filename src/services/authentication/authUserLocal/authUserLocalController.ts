import requestErrorHandler from '@server/utils/requestErrorHandler'
import { NextFunction, Request, Response } from 'express'
import AuthUserLocalService from './authUserLocalService'

export default class AuthUserLocalController {
  constructor (private authUserLocalService: AuthUserLocalService) { }

  execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    if (!requestErrorHandler(request, next)) return
    const body = request.body
    try {
      // const user = await this.authUserLocalService.execute(body)
      response.status(200).json(body)
    } catch (error) {
      next(error)
    }
  }
}
