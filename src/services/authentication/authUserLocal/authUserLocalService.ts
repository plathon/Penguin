import UserRepository from '@server/repositories/userRepository'
import { AuthUserLocalRequestDTO, AuthUserLocalResponseDTO } from './authUserLocalDTO'

export default class AuthUserLocalService {
  constructor (private userRepository: UserRepository) {}
  async execute (authUserLocalRequestDTO: AuthUserLocalRequestDTO): Promise<AuthUserLocalResponseDTO> {
    const user = await this.userRepository.findUserByEmail(authUserLocalRequestDTO)
    const { id, name, email } = user
    return { id, name, email }
  }
}
