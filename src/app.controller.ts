import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  Headers,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from './login.guard';

@Controller()
export class AppController {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor(private readonly appService: AppService) {}

  @Get('sss')
  getHello(@Session() session): string {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }
  @Get('ttt')
  ttt(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) response: Response,
  ): string {
    console.log('authorization', authorization);
    if (authorization) {
      console.log('authorization', authorization);
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify(token);
        console.log(data);
        const newToken = this.jwtService.sign({
          count: data.count + 1,
        });
        response.setHeader('token', newToken);
        return data.count + 1;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    }
    const newToken = this.jwtService.sign({
      count: 1,
    });

    response.setHeader('token', newToken);
    return 'hello1';
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  aaa() {
    return 'aaa';
  }
  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
