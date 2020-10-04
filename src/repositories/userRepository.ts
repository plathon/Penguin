import User from '@entities/User'
import { CreateUserRequestDTO } from '@services/users/createUser/createUserDTO'
import { Database } from '@config/database'
import { NotFoundException } from '@errors/NotFoundException'

export default class UserRepository {
  constructor (private database: Database) { }
  async createUser (createUserRequestDTO: CreateUserRequestDTO): Promise<User> {
    const repository = (await this.database.getConnection()).getRepository(User)
    const { name, email, password } = createUserRequestDTO
    const user = new User()
    user.name = name
    user.email = email
    user.password = password
    return repository.save(user)
  }

  async findUserByEmail (email): Promise<User> {
    const repository = (await this.database.getConnection()).getRepository(User)
    const user = await repository.findOne({ email })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async findUserById (id: number): Promise<User> {
    const repository = (await this.database.getConnection()).getRepository(User)
    const user = repository.findOne(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }
}
