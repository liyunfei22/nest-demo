import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

console.log(CatsService, typeof CatsService);

const mockCatsService: any = {
  findAll() {
    return [{ name: 'mock', color: 'mock' }];
  },
};

@Module({
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
    {
      provide: 'CONNECTION',
      useValue: 'sss',
    },
  ],
  controllers: [CatsController],
  exports: [CatsService],
})
export class CatsModule {}
