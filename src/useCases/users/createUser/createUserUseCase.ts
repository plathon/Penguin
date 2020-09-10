import { CreateUserRequestDTO } from './createUserDTO';
import UserRepository from '@repositories/userRepository';
import { CreateUserResponseDTO } from './createUserDTO'

export default class CreateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(createUserRequestDTO: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const user = await this.userRepository.createUser(createUserRequestDTO);
    const { id, name, email } = user;
    const userResponseDTO = { id, name, email };
    return userResponseDTO;
  }
}
