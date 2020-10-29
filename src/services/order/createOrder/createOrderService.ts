import OrderRepository from '@repositories/orderRepository'
import ProductRepository from '@repositories/productRepository'
import UserRepository from '@repositories/userRepository'
import { CreateOrderRequestDTO, CreateOrderResponseDTO } from './createOrderDTO'

export default class CreateOrderService {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository
  ) {}

  async execute(
    createOrderRequestDTO: CreateOrderRequestDTO,
    userId: number
  ): Promise<CreateOrderResponseDTO> {
    const { products } = createOrderRequestDTO
    const productList = await this.productRepository.listProductsById(products)
    const user = await this.userRepository.findUserById(userId)
    const order = await this.orderRepository.createOrder(productList, user)
    const response = {
      status: order.status,
      products: order.products,
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      userId: order.user.id
    }
    return response
  }
}
