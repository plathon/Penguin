import UserRepository from '@repositories/userRepository'
import { CreateUserRequestDTO, CreateUserResponseDTO } from './createUserDTO'

export default class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    createUserRequestDTO: CreateUserRequestDTO
  ): Promise<CreateUserResponseDTO> {
    const user = await this.userRepository.createUser(createUserRequestDTO)
    const token = user.generateAccessToken()
    return token
  }
}
