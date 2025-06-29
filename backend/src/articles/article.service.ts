import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async retrieveAll(): Promise<Article[]> {
    return await this.prisma.article.findMany();
  }

  //   async retrieveOne(articleId: number): Promise<Article> {
  //     return await this.prisma.article.findFirst({
  //       where: {
  //         id: articleId,
  //       },
  //     });
  //   }

  async create(): Promise<void> {}

  async update(): Promise<void> {}

  async delete(): Promise<void> {}
}
