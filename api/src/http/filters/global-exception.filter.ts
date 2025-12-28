import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '../../shared/exceptions/base.exception';
import { SystemErrorCode } from '../../shared/exceptions/error-codes.enum';
import { ErrorResponse } from '../../shared/exceptions/error-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorResponse = this.buildErrorResponse(exception);

    // Log da mensagem interna para debug (Sentry, etc)
    const internalMessage =
      exception instanceof BaseException
        ? exception.getInternalMessage()
        : errorResponse.message;

    this.logger.error(
      `[${errorResponse.code}] Internal: ${internalMessage} | User: ${errorResponse.message}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown): ErrorResponse {
    if (exception instanceof BaseException) {
      return exception.toErrorResponse();
    }

    if (exception instanceof HttpException) {
      return {
        message: exception.message || 'Erro no servidor',
        code: SystemErrorCode.HTTP_EXCEPTION,
        statusCode: exception.getStatus(),
      };
    }

    return {
      message: 'Erro interno do servidor',
      code: SystemErrorCode.INTERNAL_SERVER_ERROR,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
