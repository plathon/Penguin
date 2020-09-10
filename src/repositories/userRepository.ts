import { Connection } from 'typeorm'
import User from '@entities/User';
import { CreateUserRequestDTO } from '@useCases/users/createUser/createUserDTO';

export default class UserRepository {
  constructor(private connection: Promise<Connection>) { }
  async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<User> {
    const repository = (await this.connection).getRepository(User);
    const { name, email, password } = createUserRequestDTO;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    return repository.save(user);
  }
}
