import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { Repository } from '@prisma/client';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  async retrieveAll(): Promise<Repository[]> {
    return await this.githubService.retrieveAll();
  }

  @Get('/:name')
  async retrieveByName(
    @Param('name') repositoryName: string,
  ): Promise<Repository | null> {
    return await this.githubService.retrieveOneByName(repositoryName);
  }
}
