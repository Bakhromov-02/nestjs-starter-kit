import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './common/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await typeOrmConfig(configService),
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
