import { HttpException } from './HttpException'
import { HttpStatusCode } from "./HttpStatusCode";

export class ValidationException extends HttpException {
  constructor(description = "validation error") {
    super("VALIDATION ERROR", HttpStatusCode.BAD_REQUEST, description);
  }
}