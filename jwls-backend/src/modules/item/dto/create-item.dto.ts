import { IsString, IsNumber, IsOptional, IsEnum, IsArray } from 'class-validator';

export class CreateItemDto {
  @IsString()
  shopId: string;

  @IsString()
  itemCode: string;

  @IsString()
  name: string;

  @IsEnum(['ring', 'necklace', 'bracelet', 'earring', 'pendant', 'other'])
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsNumber()
  grossWeight: number;

  @IsOptional()
  @IsNumber()
  netWeight?: number;

  @IsOptional()
  @IsNumber()
  stoneWeight?: number;

  @IsString()
  purity: string;

  @IsNumber()
  makingCharges: number;

  @IsOptional()
  @IsNumber()
  stoneCharges?: number;

  @IsOptional()
  @IsString()
  hsnCode?: string;

  @IsNumber()
  sellingPrice: number;

  @IsOptional()
  @IsString()
  materialLotId?: string;
}

