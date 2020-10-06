import requestErrorHandler from '@utils/requestErrorHandler'
import { NextFunction, Request, Response } from 'express'
import ListTagsService from './listTagsService'

export default class ListTagsController {
  constructor (private listTagsService: ListTagsService) { }

  execute = async (request: Request, response: Response, next: NextFunction) => {
    if (!requestErrorHandler(request, next)) return

    const limit = parseInt(request.query.limit as string) ? parseInt(request.query.limit as string) : 10
    const skip = parseInt(request.query.skip as string) ? parseInt(request.query.skip as string) : 0
    try {
      const tags = await this.listTagsService.execute(limit, skip)
      response.status(200).json(tags)
    } catch (error) {
      next(error)
    }
  }
}
