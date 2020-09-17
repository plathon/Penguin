import database from '@config/database'
import userRepository from '@repositories/userRepository'
import User from '@entities/User'

jest.mock('@entities/User');

jest.mock('@config/database', () => {
  const save = jest.fn(user => user).mockReturnValue('returned value')
  const repository = { save: save }
  const getRepository = jest.fn().mockReturnValue(repository)
  const getConnection = jest.fn().mockResolvedValue({ getRepository: getRepository })

  return {
    getConnection: getConnection
  }
})

describe('User repository', () => {
  describe('Create user', () => {
    let repository;
    let db;
    const mockedUser = { id: 1, name: 'jose', email: 'jose@test.com', password: '123' }

    beforeEach(() => {
      jest.clearAllMocks();
      db = database;
      repository = new userRepository(db);
    })

    test('should get the user repository', async () => {
      expect((await db.getConnection()).getRepository).not.toHaveBeenCalled();
      await repository.createUser(mockedUser);
      expect((await db.getConnection()).getRepository).toHaveBeenCalledWith(User);
    })

    test('should instantiate a new user', async () => {
      expect(User).not.toBeCalled();
      await repository.createUser(mockedUser);
      expect(User).toBeCalled();
    })

    test('should save a new user through the user`s repository', async () => {
      const repo = (await db.getConnection()).getRepository()
      expect(repo.save).not.toHaveBeenCalled();
      await repository.createUser(mockedUser);
      const mockedUserToCompare = new User()
      mockedUserToCompare.name = mockedUser.name
      mockedUserToCompare.email = mockedUser.email
      mockedUserToCompare.password = mockedUser.password
      expect(repo.save).toHaveBeenCalledWith(mockedUserToCompare)
    })

    test('should return the result of repository.save() method', async () => {
      const user = await repository.createUser(mockedUser);
      expect(user).toBe('returned value');
    })
  })
})