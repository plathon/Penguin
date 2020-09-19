import database from '@config/database'
import UserRepository from '@repositories/userRepository'
import CreateUserService from '@services/users/createUser/createUserService'
import CreateUserController from '@services/users/createUser/createUserController'
import { Request, Response } from 'express'

jest.mock('@config/database', () => ({}))
jest.mock('@repositories/userRepository')
jest.mock('@services/users/createUser/createUserService')

describe('create user controller', () => {
  describe('execute', () => {
    let userRepository
    let createUserService
    let createUserController

    const mockRequest = {
      body: {
        name: 'jose',
        email: 'jose@test.com',
        password: '123'
      }
    } as Request

    const mockResponse = {
      status: jest.fn().mockReturnValue({
        json: jest.fn()
      })
    } as unknown as Response

    beforeEach(() => {
      userRepository = new UserRepository(database)
      createUserService = new CreateUserService(userRepository)
      createUserService.execute = jest.fn().mockResolvedValue('return value')
      createUserController = new CreateUserController(createUserService)
    })

    test('should call createUserService with request.body params', async () => {
      const mockedParams = mockRequest.body
      expect(createUserService.execute).not.toHaveBeenCalled()
      await createUserController.execute(mockRequest, mockResponse)
      expect(createUserService.execute).toHaveBeenCalledWith(mockedParams)
    })

    test('should set status 200 to the request', async () => {
      expect(mockResponse.status).not.toHaveBeenCalled()
      await createUserController.execute(mockRequest, mockResponse)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
    })

    test('should call json response.json method wih the result of createUserService', async () => {
      expect(mockResponse.status(200).json).not.toHaveBeenCalled()
      await createUserController.execute(mockRequest, mockResponse)
      expect(mockResponse.status(200).json).toHaveBeenCalled()
    })
  })
})
