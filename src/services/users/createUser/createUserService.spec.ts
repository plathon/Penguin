import database from '@config/database'
import UserRepository from '@repositories/userRepository'
import CreateUserService from '@services/users/createUser/createUserService'

jest.mock('@config/database', () => ({}))
jest.mock('@repositories/userRepository', () => jest.fn().mockImplementation(() => {
  const mockedUser = { id: 1, name: 'jose', email: 'test@test.com' }
  return {
    createUser: jest.fn().mockResolvedValue(mockedUser)
  }
}))

describe('Create user use case', () => {
  let repository
  let service
  beforeEach(() => {
    jest.clearAllMocks()
    repository = new UserRepository(database)
    service = new CreateUserService(repository)
  })

  describe('execute', () => {
    test('should call createUser method from userRepository', async () => {
      const mockedUser = { name: 'jose', email: 'test@test.com', password: '123' }
      expect(repository.createUser).not.toHaveBeenCalled()
      await service.execute(mockedUser)
      expect(repository.createUser).toHaveBeenCalledWith(mockedUser)
    })

    test('should return CreateUserResponseDTO', async () => {
      const mockedUserRequest = { name: 'jose', email: 'test@test.com', password: '123' }
      const mockedUserResponse = { id: 1, name: 'jose', email: 'test@test.com' }
      const user = await service.execute(mockedUserRequest)
      expect(user).toEqual(mockedUserResponse)
    })
  })
})
