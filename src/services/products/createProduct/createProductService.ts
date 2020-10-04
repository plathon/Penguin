import ProductRepository from '@repositories/productRepository'
import UserRepository from '@repositories/userRepository'
import { CreateProductRequestDTO, CreateProductResponseDTO } from './createProductDTO'

export default class CreateProductService {
  constructor (
    private productRepository: ProductRepository,
    private userRepository: UserRepository
  ) { }

  async execute (createProductRequestDTO: CreateProductRequestDTO, userId: number): Promise<CreateProductResponseDTO> {
    const user = await this.userRepository.findUserById(userId)
    const product = await this.productRepository.createProduct(createProductRequestDTO, user)
    return {
      name: product.name,
      description: product.description
    }
  }
}
