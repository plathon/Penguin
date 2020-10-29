import { Router } from 'express'
import passport from '@config/passport'

import createUserController from '@services/users/createUser'
import createUserValidator from '@validations/createUserValidator'

import authUserLocalController from '@services/authentication/authUserLocal'
import authUserLocalValidator from '@validations/authUserLocalValidator'

import createProductController from '@services/products/createProduct'
import createProductValidator from '@validations/createProductValidator'

import listProductsController from '@services/products/listProducts'
import listProductsValidator from '@validations/listProductsValidator'

import createTagsController from '@services/tags/createTags'
import createTagsValidator from '@validations/createTagsValidator'

import listTagsController from '@services/tags/listTags'
import listTagsValidator from '@validations/listTagsValidator'

import createOrderController from '@services/order/createOrder'
import createOrderValidator from '@validations/createOrderValidator'

const routes = Router()

routes.post('/users', createUserValidator, createUserController.execute)
routes.post(
  '/auth/local',
  authUserLocalValidator,
  authUserLocalController.execute
)

routes.post(
  '/product',
  [createProductValidator, passport.authenticate('jwt', { session: false })],
  createProductController.execute
)
routes.get(
  '/products',
  [listProductsValidator, passport.authenticate('jwt', { session: false })],
  listProductsController.execute
)

routes.post(
  '/tag',
  [createTagsValidator, passport.authenticate('jwt', { session: false })],
  createTagsController.execute
)
routes.get(
  '/tags',
  [listTagsValidator, passport.authenticate('jwt', { session: false })],
  listTagsController.execute
)

routes.post(
  '/order',
  [createOrderValidator, passport.authenticate('jwt', { session: false })],
  createOrderController.execute
)

export default routes
