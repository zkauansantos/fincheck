import { ErrorCode } from './error-codes.enum';
import { ErrorResponse } from './error-response.interface';

export interface BaseExceptionProps {
  message: string;
  code: ErrorCode;
  statusCode: number;
  internalMessage?: string;
}

export abstract class BaseException extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly internalMessage: string;

  constructor(props: BaseExceptionProps) {
    super(props.message);
    this.name = this.constructor.name;
    this.code = props.code;
    this.statusCode = props.statusCode;
    this.internalMessage = props.internalMessage || props.message;
    Error.captureStackTrace(this, this.constructor);
  }

  toErrorResponse(): ErrorResponse {
    return {
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }

  getInternalMessage(): string {
    return this.internalMessage;
  }
}
