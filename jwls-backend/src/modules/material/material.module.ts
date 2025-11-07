import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { MaterialLot, MaterialLotSchema } from './schemas/material-lot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MaterialLot.name, schema: MaterialLotSchema },
    ]),
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}

