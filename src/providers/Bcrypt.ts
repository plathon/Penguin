import bcryptProvider from 'bcryptjs'
import IBcrypt from './IBcrypt'

export default class Bcrypt implements IBcrypt {
  async genSalt(rounds = 8): Promise<string> {
    return await bcryptProvider.genSalt(rounds)
  }

  async hash(phrase: string, salt: string): Promise<string> {
    return await bcryptProvider.hash(phrase, salt)
  }

  async compare(phrase: string, hash: string): Promise<boolean> {
    return await bcryptProvider.compare(phrase, hash)
  }
}
