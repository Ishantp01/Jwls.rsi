import { IsEnum, IsOptional, IsDateString } from 'class-validator';

export class UpdateJobStatusDto {
  @IsEnum(['pending', 'in_progress', 'completed', 'delivered'])
  status: string;

  @IsOptional()
  @IsDateString()
  actualDeliveryDate?: Date;
}

