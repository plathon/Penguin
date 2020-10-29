import Product from '@entities/Product'
import ProductRepository from '@repositories/productRepository'
import UserRepository from '@repositories/userRepository'

export default class ListProductsService {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(
    userId: number,
    limit: number,
    skip: number
  ): Promise<Product[]> {
    const user = await this.userRepository.findUserById(userId)
    const products = this.productRepository.listProductsByUser(
      user,
      limit,
      skip
    )
    return products
  }
}
