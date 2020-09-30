import { NextFunction, Request } from 'express'
import requestErrorHandler from './requestErrorHandler'
import { ValidationException } from '@errors/ValidationException'
import { ValidationError } from 'express-validator'

let isEmptyReturnedValue = false
jest.mock('express-validator', () => ({
  validationResult: jest.fn().mockReturnValue({
    isEmpty: jest.fn().mockReturnValue(isEmptyReturnedValue),
    array: jest.fn().mockReturnValue([])
  })
}))

jest.mock('@errors/ValidationException', () => ({
  ValidationException: jest.fn().mockImplementation(() => {
    return {}
  })
}))

describe('request error handler', () => {
  let mockedRequest
  let mockNext

  beforeEach(() => {
    mockedRequest = {} as Request
    mockNext = jest.fn() as NextFunction
  })

  test('should call next function with validationException when validation issue occurs', () => {
    expect(mockNext).not.toBeCalled()
    requestErrorHandler(mockedRequest, mockNext)
    const validationErrors: ValidationError[] = []
    const exception = new ValidationException(validationErrors)
    expect(mockNext).toHaveBeenCalledWith(exception)
  })

  test('should instantiate a validation exception object', () => {
    expect(ValidationException).not.toBeCalled()
    requestErrorHandler(mockedRequest, mockNext)
    expect(ValidationException).toHaveBeenCalledWith([])
  })

  test('should return false when validation result isEmpty method returns false', () => {
    const result = requestErrorHandler(mockedRequest, mockNext)
    expect(result).toBe(false)
  })

  test('should return true when validation result isEmpty method returns true', () => {
    isEmptyReturnedValue = true
    const result = requestErrorHandler(mockedRequest, mockNext)
    expect(result).toBe(false)
  })
})
