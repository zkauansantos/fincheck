import {
  BaseException,
  BaseExceptionProps,
} from '../../shared/exceptions/base.exception';

export type DomainExceptionProps = Omit<BaseExceptionProps, 'statusCode'>;

export abstract class DomainException extends BaseException {
  constructor(props: DomainExceptionProps) {
    super({ ...props, statusCode: 422 });
  }
}
