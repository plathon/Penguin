import { NextFunction, Request } from 'express'
import { ValidationException } from '@errors/ValidationException'
import { validationResult } from 'express-validator'

export default function requestErrorHandler(
  request: Request,
  next: NextFunction
): boolean {
  const result = validationResult(request)
  if (!result.isEmpty()) {
    const errors = result.array()
    const exception = new ValidationException(errors)
    next(exception)
    return false
  }
  return true
}
