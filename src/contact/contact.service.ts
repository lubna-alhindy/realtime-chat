import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { CreateContactDto } from './dtos/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private userService: UserService
  ) {}

  async createContact(id: number, body: CreateContactDto) {
    const user2 = await this.userService.getByPhoneNumber(body.phoneNumber);

    if (!user2) {
      throw new BadRequestException("this phoneNumber doesn't exits in system!");
    }

    await this.contactRepository.save({
      user1: {
        id: id
      },
      user2: {
        id: user2.id
      }
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'created successfully.'
    };
  }

  async readContacts(id: number) {
    const contacts = await this.contactRepository.find({
      where: {
        user1: {
          id: id
        }
      },
      relations: ['user2']
    });

    const response: User[] = [];
    contacts.forEach((contact) => {
      response.push(contact.user2);
    });

    return response;
  }
}
