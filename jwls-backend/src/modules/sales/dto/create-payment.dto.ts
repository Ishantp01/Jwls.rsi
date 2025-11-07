import { IsString, IsNumber, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  shopId: string;

  @IsString()
  saleId: string;

  @IsString()
  customerId: string;

  @IsNumber()
  amount: number;

  @IsEnum(['cash', 'card', 'upi', 'bank_transfer', 'cheque'])
  paymentMethod: string;

  @IsDateString()
  paymentDate: Date;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}

