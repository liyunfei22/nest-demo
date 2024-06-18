import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;
  constructor(@Injectable('CONFIG_OPTIONS') private options: Record<string, any>) {
    // const options = {folder: './config'}
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
