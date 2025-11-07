import { IsString, IsEmail, IsOptional, IsArray, IsEnum } from 'class-validator';
import { UserRole } from '../../../common/constants/roles.constant';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  shopId?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];

  @IsOptional()
  @IsString()
  avatar?: string;
}

