import { ValidationError } from 'express-validator';
import { HttpException } from './HttpException'
import { HttpStatusCode } from "./HttpStatusCode";

export class ValidationException extends HttpException {
  constructor(private errors: ValidationError[]) {
    super("VALIDATION ERROR", HttpStatusCode.BAD_REQUEST, "validation error");
  }
  getErrors(): ValidationError[] {
    return this.errors || [];
  }
}