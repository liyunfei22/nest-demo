import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { FooController } from './foo/foo.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, FooController],
  providers: [AppService, CatsService],
})
export class AppModule {}
