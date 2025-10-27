import { IsString, IsNotEmpty, IsEmail, IsOptional, isString } from 'class-validator';

export class CreateShopDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    subDomain: string;

    @IsOptional()
    @IsString()
    customDomain?: string;

    @IsOptional()
    @IsString()
    contactEmail?: string;

    @IsOptional()
    @IsString()
    contactPhon?: string;

}