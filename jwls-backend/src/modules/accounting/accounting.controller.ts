import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('accounting')
@UseGuards(JwtAuthGuard)
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get('expenses')
  findAllExpenses(@Query('shopId') shopId: string) {
    return this.accountingService.findAllExpenses(shopId);
  }
}

