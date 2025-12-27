import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubcategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.SubCategoryCreateArgs) {
    return this.prismaService.subCategory.create(createDto);
  }

  findMany(findManyDto: Prisma.SubCategoryFindManyArgs) {
    return this.prismaService.subCategory.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.SubCategoryFindFirstArgs) {
    return this.prismaService.subCategory.findFirst(findFirstDto);
  }

  findUnique(findUniqueDto: Prisma.SubCategoryFindUniqueArgs) {
    return this.prismaService.subCategory.findUnique(findUniqueDto);
  }

  update(updateDto: Prisma.SubCategoryUpdateArgs) {
    return this.prismaService.subCategory.update(updateDto);
  }

  delete(deleteDto: Prisma.SubCategoryDeleteArgs) {
    return this.prismaService.subCategory.delete(deleteDto);
  }
}
