import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('integrations')
@UseGuards(JwtAuthGuard)
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Get()
  findAll(@Query('shopId') shopId: string) {
    return this.integrationService.findAll(shopId);
  }
}

