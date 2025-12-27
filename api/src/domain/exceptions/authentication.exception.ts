import { DomainException } from './domain.exception';

export class AuthenticationException extends DomainException {
  constructor(message: string) {
    super(message);
  }

  static invalidCredentials(): AuthenticationException {
    return new AuthenticationException('Invalid credentials');
  }

  static tokenExpired(): AuthenticationException {
    return new AuthenticationException('Authentication token has expired');
  }

  static tokenInvalid(): AuthenticationException {
    return new AuthenticationException('Invalid authentication token');
  }

  static unauthorized(): AuthenticationException {
    return new AuthenticationException('Unauthorized access');
  }
}
