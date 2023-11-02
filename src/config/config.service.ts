import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

type EnvConfig = {
  [index: string]: string;
};

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    /**
     * 官网实例
     * const dotenv = require('dotenv')
     * const buf = Buffer.from('BASIC=basic')
     * const config = dotenv.parse(buf) // will return an object
     * console.log(typeof config, config) // object { BASIC : 'basic' }
     *
     */
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
