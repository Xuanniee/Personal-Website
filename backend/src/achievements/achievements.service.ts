import { Injectable } from '@nestjs/common';
import { InternAchievement } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  async retrieveAll(): Promise<InternAchievement[]> {
    const achievements = await this.prisma.internAchievement.findMany({
      include: {
        internship: true,
      },
    });

    return achievements;
  }

  async retrieveOne(achievementId: number): Promise<InternAchievement | null> {
    const targetAchievement = await this.prisma.internAchievement.findFirst({
      where: {
        id: achievementId,
      },
      include: {
        internship: true,
      },
    });

    return targetAchievement;
  }

  /**
   * Creates a list of achievements corresponding to bullet points for the internships
   * Returns the number of achievements created.
   *
   * @param internshipId number
   * @param achievements { details: string }[]
   * @returns Promise<void>
   */
  async createMany(
    internshipId: number,
    achievements: { details: string }[],
  ): Promise<number> {
    if (!achievements.length) {
      console.warn('Achievements are empty.');
      return 0;
    }
    const { count } = await this.prisma.internAchievement.createMany({
      data: achievements.map((achievement) => ({
        internship_id: internshipId,
        details: achievement.details,
      })),
    });

    return count;
  }

  /**
   * Returns the number of deleted achievements after deletion
   *
   * @param internshipId number
   * @returns Promise<number>
   */
  async deleteMany(internshipId: number): Promise<number> {
    const { count } = await this.prisma.internAchievement.deleteMany({
      where: {
        internship_id: internshipId,
      },
    });
    return count;
  }

  /**
   * Updates achievements associated with an internship by updating ones that have an
   * associated achievementId, and creating new ones without.
   *
   * @param internshipId number
   * @param achievements { id?: number; details: string }[]
   * @returns Promise<void>
   */
  async update(
    internshipId: number,
    achievements: { id?: number; details: string }[],
  ): Promise<void> {
    // Cannot use updateMany because it will update all the achievements with the same string
    // 1. Determine which achievements are existing
    const updates = achievements.filter((achievement) => achievement.id);
    const creations = achievements.filter((achievement) => !achievement.id);

    // 2. Update the achievements for the ones that have an id
    await Promise.all(
      updates.map((achievement) => {
        this.prisma.internAchievement.update({
          where: {
            // Guaranteed that it will not be NULL since filtered
            id: achievement.id!,
          },
          data: {
            details: achievement.details,
          },
        });
      }),
    );

    // 3. Create achievements that are not existing yet
    await this.prisma.internAchievement.createMany({
      // map() returns an array
      data: creations.map((achievement) => ({
        internship_id: internshipId,
        details: achievement.details,
      })),
    });
  }
}
