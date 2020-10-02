import 'reflect-metadata'
import '@utils/environment'
import express from 'express'
import passport from '@config/passport'
import routes from './routes'
import { ErrorHandler } from '@errors/ErrorHandler'

const httpProvider = express()

httpProvider.use(express.json())
httpProvider.use(passport.initialize())

httpProvider.use(routes)

const errorHandler = new ErrorHandler()
httpProvider.use(errorHandler.handle)

export default httpProvider
