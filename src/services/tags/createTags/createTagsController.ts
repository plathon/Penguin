import requestErrorHandler from '@utils/requestErrorHandler'
import { NextFunction, Request, Response } from 'express'
import CreateTagsService from './createTagsService'

export default class CreateTagsController {
  constructor(private createTagsService: CreateTagsService) {}

  execute = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!requestErrorHandler(request, next)) return
    const body = request.body
    try {
      const tag = await this.createTagsService.execute(body)
      response.status(200).json(tag)
    } catch (error) {
      next(error)
    }
  }
}
