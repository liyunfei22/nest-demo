import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { FooModule } from './foo/foo.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    CatsModule,
    FooModule,
    ConfigModule.register({ folder: './config' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
