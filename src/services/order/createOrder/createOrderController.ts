import requestErrorHandler from '@utils/requestErrorHandler'
import { NextFunction, Request, Response } from 'express'
import CreateOrderService from './createOrderService'

export default class CreateOrderController {
  constructor (private createOrderService: CreateOrderService) { }

  execute = async (request: Request, response: Response, next: NextFunction) : Promise<void> => {
    if (!requestErrorHandler(request, next)) return
    const userId = request.user.id
    const body = request.body
    try {
      const order = await this.createOrderService.execute(body, userId)
      response.status(200).json(order)
    } catch (error) {
      next(error)
    }
  }
}
