import {
  Get,
  Param,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from 'src/_guards/jwt-auth.guard';

import { MessageService } from './message.service';

@ApiTags('message')
@Controller('message')
@UseGuards(JWTAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('read-chats')
  readChats(@Request() req: any) {
    return this.messageService.readChats(req.user.sub.id);
  }

  @Get('read-chat/:otherUserId')
  readChat(@Request() req: any, @Param('otherUserId') otherUserId: string) {
    return this.messageService.readChat(req.user.sub.id, +otherUserId);
  }
}
