import { Module } from '@nestjs/common';
import { FooService } from './foo.service';
import { FooController } from './foo.controller';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [CatsModule, ConfigModule.register({ folder: './' })],
  controllers: [FooController],
  providers: [FooService],
})
export class FooModule {}
