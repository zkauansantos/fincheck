import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserPrismaMapper } from '../prisma/mappers/user.prisma-mapper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!prismaUser) {
      return null;
    }

    return UserPrismaMapper.toDomain(prismaUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!prismaUser) {
      return null;
    }

    return UserPrismaMapper.toDomain(prismaUser);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email },
    });

    return count > 0;
  }

  async save(user: User): Promise<User> {
    const data = UserPrismaMapper.toPrismaCreate(user);

    const prismaUser = await this.prisma.user.create({
      data,
    });

    return UserPrismaMapper.toDomain(prismaUser);
  }

  async update(user: User): Promise<User> {
    const data = UserPrismaMapper.toPrismaUpdate(user);

    const prismaUser = await this.prisma.user.update({
      where: { id: user.getId() },
      data,
    });

    return UserPrismaMapper.toDomain(prismaUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
