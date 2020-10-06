import database from '@config/database'
import ProductRepository from '@repositories/productRepository'
import UserRepository from '@repositories/userRepository'
import ListProductsController from './listProductsController'
import ListProductsService from './listProductsService'

const productRepository = new ProductRepository(database)
const userRepository = new UserRepository(database)
const listProductsService = new ListProductsService(userRepository, productRepository)
const listProductsController = new ListProductsController(listProductsService)

export default listProductsController
