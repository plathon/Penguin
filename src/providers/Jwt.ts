import IJwt, { ISign } from './IJwt'

import jwt from 'jsonwebtoken'

export default class Jwt implements IJwt {
  sign(data: ISign, privateKey: string): string {
    return jwt.sign(data, privateKey)
  }
}
