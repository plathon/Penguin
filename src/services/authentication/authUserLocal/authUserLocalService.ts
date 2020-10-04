import { UnauthorizedException } from '@errors/UnauthorizedException'
import UserRepository from '@repositories/userRepository'
import { AuthUserLocalRequestDTO, AuthUserLocalResponseDTO } from './authUserLocalDTO'

export default class AuthUserLocalService {
  constructor (private userRepository: UserRepository) {}
  async execute (authUserLocalRequestDTO: AuthUserLocalRequestDTO): Promise<AuthUserLocalResponseDTO> {
    const { email, password } = authUserLocalRequestDTO
    const user = await this.userRepository.findUserByEmail(email)
    if (!user.comparePassword(password)) {
      throw new UnauthorizedException('user and password not match')
    }
    const token = user.generateAccessToken()
    return token
  }
}
