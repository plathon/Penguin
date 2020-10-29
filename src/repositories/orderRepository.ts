import database, { Database } from '@config/database'
import Order, { OrderStatus } from '@entities/Order'
import Product from '@entities/Product'
import User from '@entities/User'

export default class OrderRepository {
  constructor(private database: Database) {}

  async createOrder(products: Product[], user: User): Promise<Order> {
    const repository = await (await database.getConnection()).getRepository(
      Order
    )
    const order = new Order()
    order.status = OrderStatus.awaiting
    order.user = user
    order.products = products
    const result = await repository.save(order)
    return result
  }
}
