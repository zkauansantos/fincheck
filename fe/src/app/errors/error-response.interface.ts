import { ErrorCode } from './error-codes';

export interface ErrorResponse {
  message: string;
  code: ErrorCode;
  statusCode: number;
}
