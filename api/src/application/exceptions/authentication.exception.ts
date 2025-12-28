import {
  BaseException,
  BaseExceptionProps,
} from '../../shared/exceptions/base.exception';
import { AuthenticationErrorCode } from '../../shared/exceptions/error-codes.enum';

type AuthenticationExceptionProps = Omit<BaseExceptionProps, 'statusCode'>;

export class AuthenticationException extends BaseException {
  private constructor(props: AuthenticationExceptionProps) {
    super({ ...props, statusCode: 401 });
  }

  static invalidCredentials(): AuthenticationException {
    return new AuthenticationException({
      message: 'Credenciais Inválidas',
      code: AuthenticationErrorCode.INVALID_CREDENTIALS,
    });
  }

  static tokenExpired(): AuthenticationException {
    return new AuthenticationException({
      message: 'Token de autenticação expirado',
      code: AuthenticationErrorCode.TOKEN_EXPIRED,
    });
  }

  static tokenInvalid(): AuthenticationException {
    return new AuthenticationException({
      message: 'Token de autenticação inválido',
      code: AuthenticationErrorCode.TOKEN_INVALID,
    });
  }

  static unauthorized(): AuthenticationException {
    return new AuthenticationException({
      message: 'Acesso não autorizado',
      code: AuthenticationErrorCode.UNAUTHORIZED,
    });
  }
}
