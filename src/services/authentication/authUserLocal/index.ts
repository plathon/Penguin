import database from '@server/config/database'
import UserRepository from '@server/repositories/userRepository'
import AuthUserLocalController from './authUserLocalController'
import AuthUserLocalService from './authUserLocalService'

const userRepository = new UserRepository(database)
const authUserLocalService = new AuthUserLocalService(userRepository)
const authUserLocalController = new AuthUserLocalController(authUserLocalService)

export default authUserLocalController
