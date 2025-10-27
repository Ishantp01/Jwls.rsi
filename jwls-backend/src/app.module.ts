import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/logger.middleware.js';
import {MiddlewareConsumer, NestModule} from '@nestjs/common';
import { UserModule } from './modules/user/user.module.js';
import { AuthModule } from './modules/auth/auth.module';

import databaseConfig from './config/database.config.js';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: './.env'
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoURI'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
} 
