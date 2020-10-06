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

const routes = Router()

routes.post('/users', createUserValidator, createUserController.execute)
routes.post('/auth/local', authUserLocalValidator, authUserLocalController.execute)

routes.post('/product', [createProductValidator, passport.authenticate('jwt', { session: false })], createProductController.execute)
routes.get('/products', [listProductsValidator, passport.authenticate('jwt', { session: false })], listProductsController.execute)

export default routes
