import { HttpException } from './HttpException'
import { HttpStatusCode } from './HttpStatusCode'

export class NotFoundException extends HttpException {
  constructor (description = 'Not Found') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, description)
  }
}
