import { Database } from '@config/database'
import Product from '@entities/Product'
import User from '@entities/User'
import { CreateProductRequestDTO } from '@services/products/createProduct/createProductDTO'

export default class ProductRepository {
  constructor (private database: Database) { }

  async createProduct (createProductRequestDTO: CreateProductRequestDTO, user: User): Promise<Product> {
    const { name, description } = createProductRequestDTO
    const repository = (await this.database.getConnection()).getRepository(Product)
    const product = new Product()
    product.name = name
    product.description = description
    product.user = user
    const result = await repository.save(product)
    return result
  }

  async listProductsByUser (user: User, limit: number, skip: number): Promise<Product[]> {
    const repository = (await this.database.getConnection()).getRepository(Product)
    const products = await repository.find({
      where: {
        user: {
          id: user.id
        }
      },
      take: limit,
      skip: skip
    })
    return products
  }
}
