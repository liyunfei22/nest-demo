import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { FooModule } from './foo/foo.module';

@Module({
  imports: [CatsModule, FooModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
