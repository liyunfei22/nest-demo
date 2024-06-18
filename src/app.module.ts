import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AuthModule, ConfigModule.register({folder: './config'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
