import { HttpException } from './HttpException'
import { HttpStatusCode } from './HttpStatusCode'

export class BadRequestException extends HttpException {
  constructor (description = 'bad request') {
    super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description)
  }
}
