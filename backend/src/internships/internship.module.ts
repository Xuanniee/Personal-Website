import { Module } from '@nestjs/common';
import { InternshipController } from './internship.controller';
import { InternshipService } from './internship.service';
import { AchievementModule } from 'src/achievements/achievements.module';

@Module({
  imports: [AchievementModule],
  controllers: [InternshipController],
  providers: [InternshipService],
})
export class InternshipModule {}
