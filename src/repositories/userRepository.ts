import User from '@entities/User'
import { CreateUserRequestDTO } from '@services/users/createUser/createUserDTO'
import { AuthUserLocalRequestDTO } from '@services/authentication/authUserLocal/authUserLocalDTO'
import { Database } from '@config/database'
import { UnauthorizedException } from '@errors/UnauthorizedException'

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

  async findUserByEmail (authUserLocalRequestDTO: AuthUserLocalRequestDTO): Promise<User> {
    const repository = (await this.database.getConnection()).getRepository(User)
    const { email } = authUserLocalRequestDTO
    const user = await repository.findOne({ email })
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    return user
  }
}
