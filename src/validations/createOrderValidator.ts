import { body } from 'express-validator'

export default [body('products').isArray(), body('products.*').isNumeric()]
