import { Router } from 'express'
import createUserController from '@services/users/createUser'
import createUserValidator from '@validations/createUserValidator'

import authUserLocalController from '@services/authentication/authUserLocal'
import authUserLocalValidator from '@validations/authUserLocalValidator'

const routes = Router()

routes.post('/users', createUserValidator, createUserController.execute)
routes.post('/auth/local', authUserLocalValidator, authUserLocalController.execute)

export default routes
