import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './config/app.config';
import { getDatabaseConfig } from './config/database.config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TenantMiddleware } from './common/middleware/tenant.middleware';

// Module imports
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ShopModule } from './modules/shop/shop.module';
import { ItemModule } from './modules/item/item.module';
import { MaterialModule } from './modules/material/material.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SalesModule } from './modules/sales/sales.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { JobModule } from './modules/job/job.module';
import { RatesModule } from './modules/rates/rates.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { AuditModule } from './modules/audit/audit.module';
import { IntegrationModule } from './modules/integration/integration.module';
import { ReportsModule } from './modules/reports/reports.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ShopModule,
    ItemModule,
    MaterialModule,
    CustomerModule,
    SalesModule,
    PurchaseModule,
    InventoryModule,
    JobModule,
    RatesModule,
    AccountingModule,
    AuditModule,
    IntegrationModule,
    ReportsModule,
    FileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, TenantMiddleware).forRoutes('*');
  }
}
