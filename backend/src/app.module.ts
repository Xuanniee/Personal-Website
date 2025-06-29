import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { InternshipModule } from './internships/internship.module';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    PrismaModule,
    InternshipModule,
    GithubModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // Default to .env
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
