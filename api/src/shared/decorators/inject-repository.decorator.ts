import { Inject } from '@nestjs/common';
import { REPOSITORY_TOKENS } from '../../domain/repositories/tokens/repository.tokens';

export const InjectRepository = (
  repositoryName: keyof typeof REPOSITORY_TOKENS,
) => {
  return Inject(REPOSITORY_TOKENS[repositoryName]);
};
