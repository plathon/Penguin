import bcryptProvider from 'bcryptjs'
import IBcrypt from './IBcrypt'

export default class Bcrypt implements IBcrypt {
  async genSalt (rounds = 8) {
    return await bcryptProvider.genSalt(rounds)
  }

  async hash (phrase, salt) {
    return await bcryptProvider.hash(phrase, salt)
  }

  async compare (phrase, hash) {
    return await bcryptProvider.compare(phrase, hash)
  }
}
