import { HttpException } from './HttpException'
import { HttpStatusCode } from './HttpStatusCode'

export class UnauthorizedException extends HttpException {
  constructor(description = 'Unauthorized') {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, description)
  }
}
