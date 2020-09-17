import database from '@config/database'
import UserRepository from '@repositories/userRepository'
import CreateUserUseCase from '@useCases/users/createUser/createUserUseCase'
import CreateUserController from '@useCases/users/createUser/createUserController'
import { Request, Response } from 'express'

jest.mock('@config/database', () => ({}))
jest.mock('@repositories/userRepository')
jest.mock('@useCases/users/createUser/createUserUseCase')

describe('create user controller', () => {
  describe('execute', () => {
    let userRepository;
    let createUserUseCase;
    let createUserController;

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
      createUserUseCase = new CreateUserUseCase(userRepository)
      createUserUseCase.execute = jest.fn().mockResolvedValue('return value');
      createUserController = new CreateUserController(createUserUseCase);
    })

    test('should call createUserUseCase with request.body params', async () => {
      const mockedParams = mockRequest.body;
      expect(createUserUseCase.execute).not.toHaveBeenCalled();
      await createUserController.execute(mockRequest, mockResponse);
      expect(createUserUseCase.execute).toHaveBeenCalledWith(mockedParams)
    })

    test('should set status 200 to the request', async () => {
      expect(mockResponse.status).not.toHaveBeenCalled();
      await createUserController.execute(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200)
    })

    test('should call json response.json method wih the result of createUserUseCase', async () => {
      expect(mockResponse.status(200).json).not.toHaveBeenCalled()
      await createUserController.execute(mockRequest, mockResponse);
      expect(mockResponse.status(200).json).toHaveBeenCalled()
    })
  })
})