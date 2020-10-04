import { Router } from 'express'
import passport from '@config/passport'

import createUserController from '@services/users/createUser'
import createUserValidator from '@validations/createUserValidator'

import authUserLocalController from '@services/authentication/authUserLocal'
import authUserLocalValidator from '@validations/authUserLocalValidator'

import createProductController from '@services/products/createProduct'
import createProductValidator from '@validations/createProductValidator'

const routes = Router()

routes.post('/users', createUserValidator, createUserController.execute)
routes.post('/auth/local', authUserLocalValidator, authUserLocalController.execute)

routes.post('/product', [createProductValidator, passport.authenticate('jwt', { session: false })], createProductController.execute)
export default routes
