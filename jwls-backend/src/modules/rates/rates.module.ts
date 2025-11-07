import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { MetalRate, MetalRateSchema } from './schemas/metal-rate.schema';
import { StoneRate, StoneRateSchema } from './schemas/stone-rate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MetalRate.name, schema: MetalRateSchema },
      { name: StoneRate.name, schema: StoneRateSchema },
    ]),
  ],
  controllers: [RatesController],
  providers: [RatesService],
  exports: [RatesService],
})
export class RatesModule {}

