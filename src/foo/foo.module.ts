import { Module } from '@nestjs/common';
import { FooService } from './foo.service';
import { FooController } from './foo.controller';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [FooController],
  providers: [FooService],
})
export class FooModule {}
