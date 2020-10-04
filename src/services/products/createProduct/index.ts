import database from '@config/database'
import ProductRepository from '@repositories/productRepository'
import UserRepository from '@repositories/userRepository'
import CreateProductController from './createProductController'
import CreateProductService from './createProductService'

const productRepository = new ProductRepository(database)
const userRepository = new UserRepository(database)
const createProductService = new CreateProductService(productRepository, userRepository)
const createProductController = new CreateProductController(createProductService)

export default createProductController
