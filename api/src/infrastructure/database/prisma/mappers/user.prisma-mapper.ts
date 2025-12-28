import { User as PrismaUser } from '@prisma/client';
import { User } from '../../../../domain/entities/user.entity';
import { Email } from '../../../../domain/value-objects/email.vo';
import { Password } from '../../../../domain/value-objects/password.vo';

export class UserPrismaMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return User.reconstitute({
      id: prismaUser.id,
      name: prismaUser.name,
      email: Email.create(prismaUser.email),
      password: Password.createHashed(prismaUser.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toPrismaCreate(user: User) {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getValue(),
    };
  }

  static toPrismaUpdate(user: User) {
    return {
      name: user.getName(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getValue(),
    };
  }
}
