import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobOrder, JobOrderSchema } from './schemas/job-order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: JobOrder.name, schema: JobOrderSchema }]),
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}

