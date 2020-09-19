import { HttpException } from './HttpException'
import { HttpStatusCode } from './HttpStatusCode'

export class ForbiddenException extends HttpException {
  constructor (description = 'Forbidden') {
    super('FORBIDDEN', HttpStatusCode.FORBIDDEN, description)
  }
}
