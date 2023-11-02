import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { LoggerService } from './logger.service';
console.log(CatsService, typeof CatsService);

const mockCatsService: any = {
  findAll() {
    return [{ name: 'mock', color: 'mock' }];
  },
};

// const connectionProvider = {
//   provide: 'CNNECTION',
//   useFactory: (optionsProvider, optionalProvider?: string) => {
//     const options = optionsProvider.get();
//     return new DatabaseConnection(options)
//   },
//   inject: [OptionsProvider, { token: 'SomeOptionalProvider', optional: true }]
// }
const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? 'devConfig' : 'prodConfig';
  },
};
// 异步

@Module({
  providers: [
    // connectionProvider,
    // OptionsProvider,
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
    {
      provide: 'CONNECTION',
      useValue: 'sss',
    },
    {
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        // const connection = await createConnection(options);
        // return connection;
      },
    },
    LoggerService,
    loggerAliasProvider,
    configFactory,
  ],
  controllers: [CatsController],
  exports: [CatsService, 'CONNECTION'],
})
export class CatsModule {}
