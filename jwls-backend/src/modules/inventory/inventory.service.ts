import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryTransaction, InventoryTransactionDocument } from './schemas/inventory-transaction.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryTransaction.name)
    private inventoryTransactionModel: Model<InventoryTransactionDocument>,
  ) {}

  async findAll(shopId: string): Promise<InventoryTransaction[]> {
    return this.inventoryTransactionModel.find({ shopId }).exec();
  }
}

