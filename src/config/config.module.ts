import { Module, DynamicModule } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      controllers: [ConfigController],
      providers: [{
        provide: 'CONFIG_OPTIONS',
        useValue: options
      },ConfigService],
      exports: [ConfigService],
    }
  }
}
