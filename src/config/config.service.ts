import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
// import { CONFIG_OPTIONS } from './constant';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
import { ConfigModuleOptions } from './interfaces/config-module-options.interface';
type EnvConfig = {
  [index: string]: string;
};

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: ConfigModuleOptions,
  ) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
