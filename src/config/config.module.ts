// import { DynamicModule, Module } from '@nestjs/common';
// import { ConfigService } from './config.service';
// import { CONFIG_OPTIONS } from './constant';
// export interface ConfigModuleOptions {
//   folder: string;
// }
// @Module({})
// export class ConfigModule {
//   static register(options: ConfigModuleOptions): DynamicModule {
//     return {
//       module: ConfigModule,
//       providers: [
//         {
//           provide: CONFIG_OPTIONS,
//           useValue: options,
//         },
//         ConfigService,
//       ],
//       exports: [ConfigService],
//     };
//   }
// }

import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigurableModuleClass } from './config.module-definition';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {}
