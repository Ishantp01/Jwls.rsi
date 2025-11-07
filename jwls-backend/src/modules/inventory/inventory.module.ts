import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryTransaction, InventoryTransactionSchema } from './schemas/inventory-transaction.schema';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { StockAdjustment, StockAdjustmentSchema } from './schemas/stock-adjustment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InventoryTransaction.name, schema: InventoryTransactionSchema },
      { name: Warehouse.name, schema: WarehouseSchema },
      { name: StockAdjustment.name, schema: StockAdjustmentSchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}

