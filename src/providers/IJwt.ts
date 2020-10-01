import { sign } from 'crypto'

export default interface IJwt {
  sign(data: any, privateKey: string): string
}
