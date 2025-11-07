import { IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  shopId: string;

  @IsString()
  lotNumber: string;

  @IsEnum(['gold', 'silver', 'platinum', 'diamond', 'gemstone'])
  materialType: string;

  @IsString()
  purity: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsString()
  supplierId?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: Date;

  @IsOptional()
  @IsString()
  description?: string;
}

