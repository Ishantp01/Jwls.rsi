import { IsString, IsNumber, IsArray, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  shopId: string;

  @IsString()
  invoiceNumber: string;

  @IsString()
  customerId: string;

  @IsDateString()
  saleDate: Date;

  @IsArray()
  items: { itemId: string; quantity: number; price: number }[];

  @IsNumber()
  subtotal: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  tax?: number;

  @IsNumber()
  total: number;

  @IsOptional()
  @IsNumber()
  amountPaid?: number;

  @IsEnum(['cash', 'card', 'upi', 'bank_transfer', 'partial'])
  paymentMethod: string;
}

