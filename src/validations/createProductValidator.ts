import { body } from 'express-validator'

export default [
  body('name').isLength({ min: 5, max: 255 }),
  body('description').isLength({ min: 5, max: 255 })
]
