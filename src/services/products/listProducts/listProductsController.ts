import requestErrorHandler from '@utils/requestErrorHandler'
import { NextFunction, Request, Response } from 'express'
import ListProductsService from './listProductsService'

export default class ListProductsController {
  constructor (private listProductsService: ListProductsService) { }

  execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    if (!requestErrorHandler(request, next)) return
    const userId = request.user.id
    const limit = parseInt(request.query.limit as string) ? parseInt(request.query.limit as string) : 10
    const skip = parseInt(request.query.skip as string) ? parseInt(request.query.skip as string) : 0
    try {
      const products = await this.listProductsService.execute(userId, limit, skip)
      response.status(200).json(products)
    } catch (error) {
      next(error)
    }
  }
}
