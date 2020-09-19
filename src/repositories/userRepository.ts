import User from '@entities/User'
import { CreateUserRequestDTO } from '@services/users/createUser/createUserDTO'
import { Database } from '@config/database'

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
}
