import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { RatesService } from './rates.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('rates')
@UseGuards(JwtAuthGuard)
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get('metals')
  findAllMetalRates(@Query('shopId') shopId: string) {
    return this.ratesService.findAllMetalRates(shopId);
  }

  @Get('stones')
  findAllStoneRates(@Query('shopId') shopId: string) {
    return this.ratesService.findAllStoneRates(shopId);
  }
}

