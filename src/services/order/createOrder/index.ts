import database from '@config/database'
import OrderRepository from '@repositories/orderRepository'
import ProductRepository from '@repositories/productRepository'
import UserRepository from '@repositories/userRepository'
import CreateOrderController from './createOrderController'
import CreateOrderService from './createOrderService'

const userRepository = new UserRepository(database)
const productRepository = new ProductRepository(database)
const orderRepository = new OrderRepository(database)
const createOrderService = new CreateOrderService(userRepository, productRepository, orderRepository)
const createOrderController = new CreateOrderController(createOrderService)

export default createOrderController
