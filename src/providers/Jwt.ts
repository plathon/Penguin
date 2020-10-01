import IJwt from './IJwt'

import jwt from 'jsonwebtoken'

export default class Jwt implements IJwt {
  sign (data, privateKey) {
    return jwt.sign(data, privateKey)
  }
}
