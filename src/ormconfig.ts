import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from 'path';

export const typeOrmConfig = async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: config.get<'postgres'>('TYPEORM_CONNECTION'),
    username: config.get<string>('TYPEORM_USERNAME'),
    password: config.get<string>('TYPEORM_PASSWORD'),
    database: config.get<string>('TYPEORM_DATABASE'),
    port: config.get<number>('TYPEORM_PORT'),
    entities: [join(__dirname, '..', 'dist/**/*.entity{.ts,.js}')], // Use the correct path separator for your OS
    synchronize: true, // use migration instead
    autoLoadEntities: true,
    logging: true,
    host: 'db', // Use 'localhost' if running outside of Docker
    url: `postgres://${config.get<string>('TYPEORM_USERNAME')}:${config.get<string>('TYPEORM_PASSWORD')}@db:5432/${config.get<string>('TYPEORM_DATABASE')}`
  };
};