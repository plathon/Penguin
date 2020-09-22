import 'reflect-metadata'
import '@utils/environment'
import express from 'express'
import routes from './routes'
import { ErrorHandler } from '@errors/ErrorHandler'

const httpProvider = express()

httpProvider.use(express.json())
httpProvider.use(routes)

const errorHandler = new ErrorHandler()
httpProvider.use(errorHandler.handle)

export default httpProvider
