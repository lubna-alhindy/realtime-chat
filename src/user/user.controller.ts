import {
  Get,
  Body,
  Post,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from 'src/_guards/local-auth.guard';
import { JWTAuthGuard } from 'src/_guards/jwt-auth.guard';

import { RegisterDto } from './dtos/register.dto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/login.dto';

@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() request: any, @Body() body: LoginDto) {
    return this.userService.login(request.user);
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  getMe(@Request() request: any) {
    return this.userService.getMe(request.user.sub.id);
  }
}
