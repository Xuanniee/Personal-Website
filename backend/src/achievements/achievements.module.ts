// May not be needed since achievements are nested tightly with internships
import { Module } from '@nestjs/common';
import { AchievementService } from './achievements.service';
import { AchievementController } from './achievements.controller';

@Module({
  imports: [],
  providers: [AchievementService],
  controllers: [AchievementController],
  exports: [AchievementService],
})
export class AchievementModule {}
