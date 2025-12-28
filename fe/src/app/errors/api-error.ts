import { ErrorCode } from './error-codes';
import { ErrorResponse } from './error-response.interface';

export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;

  constructor(errorResponse: ErrorResponse) {
    super(errorResponse.message);
    this.name = 'ApiError';
    this.code = errorResponse.code;
    this.statusCode = errorResponse.statusCode;
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }
}
