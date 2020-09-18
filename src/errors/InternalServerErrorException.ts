import { HttpException } from './HttpException'
import { HttpStatusCode } from "./HttpStatusCode";

export class InternalServerErrorException extends HttpException {
  constructor(description = "Internal Server Error") {
    super("INTERNAL SERVER ERROR", HttpStatusCode.INTERNAL_SERVER, description);
  }
}