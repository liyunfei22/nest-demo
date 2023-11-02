import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CatsModule {}
