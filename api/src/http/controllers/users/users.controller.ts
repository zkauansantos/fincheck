import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetMeUseCase } from '../../../application/usecases/users/getMe';
import { ActiveUserId } from '../../../shared/decorators/activeUserId.decorator';

@ApiTags('Users')
@ApiBearerAuth('swagger-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly getMeUseCase: GetMeUseCase) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getMe(@ActiveUserId() userId: string) {
    return this.getMeUseCase.execute({ userId });
  }
}
