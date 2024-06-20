import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() user: LoginDto) {
    console.log(user);
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = this.jwtService.sign({
        id: foundUser.id,
        username: foundUser.username,
      });
      return {
        token,
      };
      return 'login success';
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }
    return 'login fail';
  }

  @Post('register')
  register(@Body() user: RegisterDto) {
    console.log(user);
    return this.userService.register(user);
  }
}
