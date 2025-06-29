import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRepositoryDto } from './dtos/repository.dto';
import { Prisma, Repository } from '@prisma/client';

@Injectable()
export class GithubService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private githubUsername;

  // Liases with Github to retrieve all projects upon Server start-up
  onModuleInit() {
    this.githubUsername = this.configService.get<string>('GITHUB_USERNAME');
    this.retrieveAllRepo(this.githubUsername!);
    return;
  }

  /**
   * Retrieves all the public repositories from a Github Profile at 7am daily
   *
   * @param username string
   */
  @Cron('0 0 7 * * *')
  async retrieveAllRepo(username: string): Promise<void> {
    const GITHUB_URL = this.configService.get<string>('GITHUB_URL');
    const GITHUB_REPO_URL = `${GITHUB_URL}/users/${username}/repos`;
    const GITHUB_TOKEN = this.configService.get<string>('GITHUB_TOKEN');

    // Only repository name is needed to pull all the other data
    const res = await firstValueFrom(
      this.httpService.get(GITHUB_REPO_URL, {
        headers: {
          'Content-Type': 'application/vnd.github+json',
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }),
    );

    // Map the list of repos to a list of DTOs
    const resData = res.data;
    for (const repository of resData) {
      // Parse a repo

      // Instead of pushing to an array, can insert directly if it exists
      const existingRepo = await this.retrieveOneById(repository.id);
      if (existingRepo === null) {
        // Not existing
        const createRepoDto: Prisma.RepositoryCreateInput = {
          id: repository.id,
          name: repository.name,
          full_name: repository.full_name,
          private: repository.private,
          html_url: repository.html_url,
          description: repository.description,
          language: repository.language,
          stargazers_count: repository.stargazers_count,
          open_issues: repository.open_issues,
          forks_count: repository.forks_count,
          created_at: repository.created_at,
          updated_at: repository.updated_at,
          pushed_at: repository.pushed_at,
          homepage: repository.homepage,
        };
        await this.create(createRepoDto);
      } else {
        // Existing, so just update
        const updateRepoData: Prisma.RepositoryUpdateInput = {
          ...(repository.name != null && { name: repository.name }),
          ...(repository.full_name != null && {
            full_name: repository.full_name,
          }),
          ...(repository.private != null && { private: repository.private }),
          ...(repository.html_url != null && { html_url: repository.html_url }),
          ...(repository.description != null && {
            description: repository.description,
          }),
          ...(repository.language != null && { language: repository.language }),
          ...(repository.stargazers_count != null && {
            stargazers_count: repository.stargazers_count,
          }),
          ...(repository.open_issues != null && {
            open_issues: repository.open_issues,
          }),
          ...(repository.forks_count != null && {
            forks_count: repository.forks_count,
          }),
          ...(repository.created_at != null && {
            created_at: repository.created_at,
          }),
          ...(repository.updated_at != null && {
            updated_at: repository.updated_at,
          }),
          ...(repository.pushed_at != null && {
            pushed_at: repository.pushed_at,
          }),
          ...(repository.homepage != null && { homepage: repository.homepage }),
        };

        await this.update(repository.id, updateRepoData);
      }
    }
  }

  // CRUD for DB
  async retrieveAll(): Promise<Repository[]> {
    return await this.prisma.repository.findMany();
  }

  async retrieveOneById(repositoryId: number): Promise<Repository | null> {
    return await this.prisma.repository.findFirst({
      where: {
        id: repositoryId,
      },
    });
  }

  async retrieveOneByName(repositoryName: string): Promise<Repository | null> {
    return await this.prisma.repository.findFirst({
      where: {
        name: repositoryName,
      },
    });
  }

  async create(
    createRepositoryDto: Prisma.RepositoryCreateInput,
  ): Promise<void> {
    await this.prisma.repository.create({
      data: createRepositoryDto,
    });
  }

  async delete(repositoryId: number): Promise<void> {
    await this.prisma.repository.delete({
      where: {
        id: repositoryId,
      },
    });
  }

  async update(
    repositoryId: number,
    updateRepoData: Prisma.RepositoryUpdateInput,
  ): Promise<void> {
    await this.prisma.repository.update({
      where: {
        id: repositoryId,
      },
      data: updateRepoData,
    });
  }
}
