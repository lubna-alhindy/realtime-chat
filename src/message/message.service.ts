import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private userService: UserService
  ) {}

  async createMessage(body: Partial<Message>) {
    let message = await this.messageRepository.save(body);

    message = await this.messageRepository.findOne({
      where: {
        id: message.id
      },
      relations: ['senderUser', 'receiverUser']
    });

    delete message.senderUser.password;
    delete message.receiverUser.password;

    return message;
  }

  readChat(id: number, otherUserId: number) {
    return this.messageRepository.find({
      where: [
        {
          senderUser: {
            id: id
          },
          receiverUser: {
            id: otherUserId
          }
        },
        {
          senderUser: {
            id: otherUserId
          },
          receiverUser: {
            id: id
          }
        }
      ],
      order: {
        createdAt: 'ASC'
      },
      relations: ['senderUser', 'receiverUser']
    });
  }

  async readChats(id: number) {
    const users = await this.userService.getUsers();

    const response: User[] = [];
    for (let user of users) {
      const message = await this.messageRepository.findOne({
        where: [
          {
            senderUser: {
              id: id
            },
            receiverUser: {
              id: user.id
            }
          },
          {
            senderUser: {
              id: user.id
            },
            receiverUser: {
              id: id
            }
          }
        ]
      });

      if (message) {
        response.push(user);
      }
    }

    return response;
  }
}
