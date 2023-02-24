import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const exceptionResponse: any = exception.getResponse();
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.status(exceptionResponse.statusCode);
    response.json({
      message: exceptionResponse.message.toString(),
    });
    console.error({
      status: exceptionResponse.statusCode,
      message: exceptionResponse.message.toString(),
    });
  }
}
