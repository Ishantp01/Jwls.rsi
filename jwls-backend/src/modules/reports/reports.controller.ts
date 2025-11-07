import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  getSalesReport(
    @Query('shopId') shopId: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.reportsService.getSalesReport(shopId, startDate, endDate);
  }

  @Get('inventory')
  getInventoryReport(@Query('shopId') shopId: string) {
    return this.reportsService.getInventoryReport(shopId);
  }
}

