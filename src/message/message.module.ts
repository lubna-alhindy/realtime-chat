import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';

import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway]
})
export class MessageModule {}
