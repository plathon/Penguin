import { query } from 'express-validator'
export default [
  query('limit').optional().isInt().withMessage('must be integer').custom(value => {
    if (parseInt(value) < 10 || parseInt(value) > 50) {
      throw Error('must be between 10 and 50')
    }
    return true
  }),
  query('skip').optional().isInt().withMessage('must be integer').custom(value => {
    if (parseInt(value) < 10) {
      throw Error('must be greater than 9')
    }
    return true
  })
]
