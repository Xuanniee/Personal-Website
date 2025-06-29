import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateInternshipDto,
  UpdateInternshipDto,
} from './dtos/internship.dto';
import { Internship, Prisma } from '@prisma/client';
import { AchievementService } from 'src/achievements/achievements.service';

@Injectable()
export class InternshipService {
  // Use DI to get our Prisma Service
  constructor(
    private readonly prisma: PrismaService,
    private achievementService: AchievementService,
  ) {}

  // CRUD Functions for the DB
  async retrieveAll(): Promise<Internship[]> {
    const internships = await this.prisma.internship.findMany({
      include: {
        _count: {
          select: {
            achievements: true,
          },
        },
        achievements: true,
      },
    });

    return internships;
  }

  async retrieveOne(internshipId: number): Promise<Internship | null> {
    const targetInternship = await this.prisma.internship.findFirst({
      where: {
        id: internshipId,
      },
      include: {
        achievements: true,
      },
    });

    return targetInternship;
  }

  /**
   * Creates an internship object, followed by their relevant achievement objects
   *
   * @param createInternshipDto CreateInternshipDto
   * @returns Promise<Internship>
   */
  async create(createInternshipDto: CreateInternshipDto): Promise<Internship> {
    const { intern_title, company, start_date, end_date, achievements } =
      createInternshipDto;

    // 1. Internship Creation
    const createdInternship = await this.prisma.internship.create({
      data: {
        intern_title: intern_title,
        company: company,
        start_date: start_date,
        end_date: end_date,
      },
    });

    // 2. Achievement Creation
    if (achievements && achievements.length > 0) {
      // Create the achievements
      const numberAchievements = await this.achievementService.createMany(
        createdInternship.id,
        achievements,
      );

      if (numberAchievements !== achievements.length) {
        throw new Error(`Something went wrong when creating achievements. ${achievements.length} achievements were sent to the 
          database, but only ${numberAchievements} were inserted.`);
      }
    }

    return createdInternship;
  }

  /**
   * Deletes an internship with all the associated achievements.
   *
   * @param internshipId number
   * @returns
   */
  async delete(internshipId: number): Promise<void> {
    // 1. Delete the associated achievements first
    await this.achievementService.deleteMany(internshipId);

    // 2. Delete the internship next
    await this.prisma.internship.delete({
      where: {
        id: internshipId,
      },
    });
  }

  async update(
    internshipId: number,
    updateInternshipDto: UpdateInternshipDto,
  ): Promise<void> {
    const { intern_title, company, start_date, end_date, achievements } =
      updateInternshipDto;

    // 1. Update base internship details
    const internshipUpdateData: Prisma.InternshipUpdateInput = {
      ...(intern_title !== undefined && { intern_title: intern_title }),
      ...(company !== undefined && { company: company }),
      ...(start_date !== undefined && { start_date: start_date }),
      ...(end_date !== undefined && { end_date: end_date }),
    };

    // Other than updating the base internship, make a GET query to fetch the associated achievements
    const updatedInternship = await this.prisma.internship.update({
      data: internshipUpdateData,
      where: {
        id: internshipId,
      },
    });

    // 2. Update the achievements if any
    if (achievements && achievements.length > 0) {
      await this.achievementService.update(internshipId, achievements);
    }
  }

  // Cron Function to update itself with Github Data
}
