import { Controller, Get, Post, Put, Delete } from "@nestjs/common";
import { InternshipService } from "./internship.service";
import { Internship } from "@prisma/client";

@Controller('internships')
export class InternshipController {
    // Inject the Service via DI
    constructor(private readonly internshipService: InternshipService) {};

    // Routes
    @Get()
    const retrieveAll: Promise<Internship> {

    }
}