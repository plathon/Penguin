import database from '@config/database'
import UserRepository from '@repositories/userRepository'
import CreateUserService from '@services/users/createUser/createUserService'

jest.mock('@config/database', () => ({}))
const mockGenerateAccessToken = jest.fn().mockReturnValue('mocked')
jest.mock('@repositories/userRepository', () =>
  jest.fn().mockImplementation(() => {
    return {
      createUser: jest.fn().mockResolvedValue({
        generateAccessToken: mockGenerateAccessToken
      })
    }
  })
)

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
      const mockedUser = {}
      expect(repository.createUser).not.toHaveBeenCalled()
      await service.execute(mockedUser)
      expect(repository.createUser).toHaveBeenCalledWith(mockedUser)
    })

    test('should generate accessToken', async () => {
      const mockedUser = {}
      expect(mockGenerateAccessToken).not.toBeCalled()
      await service.execute(mockedUser)
      expect(mockGenerateAccessToken).toBeCalled()
    })

    test('should return the result of generateAccessToken', async () => {
      const mockedUserRequest = {}
      const user = await service.execute(mockedUserRequest)
      expect(user).toEqual('mocked')
    })
  })
})
