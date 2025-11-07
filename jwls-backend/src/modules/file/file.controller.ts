import { Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  findAll(@Query('shopId') shopId: string) {
    return this.fileService.findAll(shopId);
  }
}

