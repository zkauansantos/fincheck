import { ErrorCode } from './error-codes.enum';

export interface ErrorResponse {
  message: string;
  code: ErrorCode;
  statusCode: number;
}
