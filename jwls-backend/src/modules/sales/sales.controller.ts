import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: any) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll(@Query('shopId') shopId: string) {
    return this.salesService.findAll(shopId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Post('payments')
  createPayment(@Body() createPaymentDto: any) {
    return this.salesService.createPayment(createPaymentDto);
  }
}

