import requestErrorHandler from '@utils/requestErrorHandler'
import { NextFunction, Request, Response } from 'express'
import CreateProductService from './createProductService'

export default class CreateProductController {
  constructor (private createProductService: CreateProductService) {}
  execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    if (!requestErrorHandler(request, next)) return
    const body = request.body
    const { id } = request.user
    try {
      const product = await this.createProductService.execute(body, id)
      response.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
}
