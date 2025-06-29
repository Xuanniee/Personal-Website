import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { InternshipService } from './internship.service';
import { Internship } from '@prisma/client';
import {
  CreateInternshipDto,
  UpdateInternshipDto,
} from './dtos/internship.dto';

@Controller('internships')
export class InternshipController {
  // Inject the Service via DI
  constructor(private readonly internshipService: InternshipService) {}

  // Routes
  @Get()
  async retrieveAll(): Promise<Internship[]> {
    const internships = this.internshipService.retrieveAll();
    return internships;
  }

  @Post('create')
  async create(
    @Body() createInternshipDto: CreateInternshipDto,
  ): Promise<Internship> {
    return await this.internshipService.create(createInternshipDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') internshipId: number,
    @Body() updateInternshipDto: UpdateInternshipDto,
  ): Promise<void> {
    await this.internshipService.update(internshipId, updateInternshipDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') internshipId: number) {
    await this.internshipService.delete(internshipId);
  }
}
