import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class CreateJobDto {
  @IsString()
  shopId: string;

  @IsString()
  jobNumber: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsString()
  description: string;

  @IsEnum(['pending', 'in_progress', 'completed', 'delivered'])
  status: string;

  @IsOptional()
  @IsDateString()
  estimatedDeliveryDate?: Date;

  @IsOptional()
  @IsNumber()
  estimatedCost?: number;
}

