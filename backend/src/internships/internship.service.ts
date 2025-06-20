import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateInternshipDto, InternshipDto } from "./dtos/internship.dto";
import { Internship, Prisma } from "@prisma/client";


@Injectable()
export class InternshipService {
    // Use DI to get our Prisma Service
    constructor(private readonly prisma: PrismaService) {};

    // CRUD Functions for the DB
    async retrieveAll(): Promise<InternshipDto[]> {
        const internships = await this.prisma.internship.findMany({
            include: {
                _count: {
                    select: {
                        achievements: true
                    }
                },
                achievements: true
            }
        });

        return internships;
    }

    async retrieveOne(internshipId: number): Promise<InternshipDto | null> {
        const targetInternship = await this.prisma.internship.findFirst({
            where: {
                id: internshipId
            },
            include: {
                achievements: true
            }
        });

        return targetInternship;
    }

    async create(createInternshipDto: CreateInternshipDto): Promise<Internship> {
        // const createdInternship: Prisma.InternshipCreateInput = {
        //     data: createInternshipDto
        // }
        return await this.prisma.internship.create({
            data: createInternshipDto
        });
    }

    // Cron Function to update itself with Github Data

}