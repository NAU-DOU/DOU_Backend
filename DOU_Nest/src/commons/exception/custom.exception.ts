import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(statusCode: object, httpCode: number) {
    super(statusCode, httpCode);
  }
}
