import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  findAll(@Query('shopId') shopId: string) {
    return this.jobService.findAll(shopId);
  }
}

