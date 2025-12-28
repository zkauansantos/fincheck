import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
import { UserRepository } from 'src/domain/repositories/user.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { GetMeUseCaseInput } from './input';
import { GetMeUseCaseOutput } from './output';

@Injectable()
export class GetMeUseCase
  implements UseCase<GetMeUseCaseInput, Promise<GetMeUseCaseOutput>>
{
  constructor(
    @InjectRepository('USERS')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: GetMeUseCaseInput): Promise<GetMeUseCaseOutput> {
    const { userId } = input;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw ResourceNotFoundException.user(userId);
    }

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail().getValue(),
    };
  }
}
