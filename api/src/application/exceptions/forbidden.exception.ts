import {
  BaseException,
  BaseExceptionProps,
} from '../../shared/exceptions/base.exception';
import { ForbiddenErrorCode } from '../../shared/exceptions/error-codes.enum';

export class ForbiddenException extends BaseException {
  private constructor(props: Omit<BaseExceptionProps, 'statusCode'>) {
    super({ ...props, statusCode: 403 });
  }

  static invalidOwnership(resourceName: string): ForbiddenException {
    return new ForbiddenException({
      message: `Você não tem permissão para acessar este(a) ${resourceName}`,
      code: ForbiddenErrorCode.INVALID_OWNERSHIP,
    });
  }

  static accessDenied(): ForbiddenException {
    return new ForbiddenException({
      message: 'Acesso negado',
      code: ForbiddenErrorCode.ACCESS_DENIED,
    });
  }
}
