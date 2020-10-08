import bcryptProvider from 'bcryptjs'
import IBcrypt from './IBcrypt'

export default class Bcrypt implements IBcrypt {
  async genSalt (rounds = 8) {
    return await bcryptProvider.genSalt(rounds)
  }

  async hash (phrase: string, salt: string) {
    return await bcryptProvider.hash(phrase, salt)
  }

  async compare (phrase: string, hash: string) {
    return await bcryptProvider.compare(phrase, hash)
  }
}
