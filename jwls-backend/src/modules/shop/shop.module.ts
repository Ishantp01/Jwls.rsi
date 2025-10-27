import { Module } from '@nestjs/common';
import { ShopService } from './shop.service.js';
import { ShopController } from './shop.controller.js';

@Module({
  providers: [ShopService],
  controllers: [ShopController]
})
export class ShopModule {}
