import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { AppModule as AppV1Module } from './v1/app.module';
import { UtilsModule } from './utils/utils.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import databaseConfig from '../config/database.config';
import mailConfig from '../config/mail.config';
import webConfig from '../config/web.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { DbExceptionFilter } from './exceptions/db-exception.filter';
import { configValidationSchema } from '../config/validation/config-validation';
import awsConfig from 'config/aws.config';

@Module({
  imports: [
    AppV1Module,
    UtilsModule,
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
      cache: true,
      load: [jwtConfig, databaseConfig, mailConfig, webConfig, awsConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: DbExceptionFilter },
  ],
})
export class AppModule {
  // empty
}
