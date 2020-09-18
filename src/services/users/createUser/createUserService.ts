import UserRepository from '@repositories/userRepository';
import { CreateUserRequestDTO } from './createUserDTO';
import { CreateUserResponseDTO } from './createUserDTO'

export default class CreateUserService {
  constructor(private userRepository: UserRepository) { }

  async execute(createUserRequestDTO: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const user = await this.userRepository.createUser(createUserRequestDTO);
    const { id, name, email } = user;
    const userResponseDTO = { id, name, email };
    return userResponseDTO;
  }
}
