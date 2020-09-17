import database from '@config/database';
import userRepository from '@repositories/userRepository';
import createUserUseCase from '@useCases/users/createUser/createUserUseCase'

jest.mock('@config/database', () => ({}));
jest.mock('@repositories/userRepository', () => jest.fn().mockImplementation(() => {
  const mockedUser = { id: 1, name: 'jose', email: 'test@test.com' }
  return {
    createUser: jest.fn().mockResolvedValue(mockedUser)
  }
}));

describe('Create user use case', () => {
  let repository;
  let useCase;
  beforeEach(() => {
    jest.clearAllMocks();
    repository = new userRepository(database)
    useCase = new createUserUseCase(repository)
  });

  describe('execute', () => {
    test('should call createUser method from userRepository', async () => {
      const mockedUser = { name: 'jose', email: 'test@test.com', password: '123' };
      expect(repository.createUser).not.toHaveBeenCalled();
      await useCase.execute(mockedUser);
      expect(repository.createUser).toHaveBeenCalledWith(mockedUser)
    });

    test('should return CreateUserResponseDTO', async () => {
      const mockedUserRequest = { name: 'jose', email: 'test@test.com', password: '123' };
      const mockedUserResponse = { id: 1, name: 'jose', email: 'test@test.com' };
      const user = await useCase.execute(mockedUserRequest);
      expect(user).toEqual(mockedUserResponse);
    });
  })
})