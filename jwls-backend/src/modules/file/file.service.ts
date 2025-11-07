import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async create(fileData: any): Promise<File> {
    const file = new this.fileModel(fileData);
    return file.save();
  }

  async findAll(shopId: string): Promise<File[]> {
    return this.fileModel.find({ shopId }).exec();
  }
}

