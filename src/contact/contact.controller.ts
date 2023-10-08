import {
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from 'src/_guards/jwt-auth.guard';

import { CreateContactDto } from './dtos/create-contact.dto';
import { ContactService } from './contact.service';

@ApiTags('contact')
@Controller('contact')
@UseGuards(JWTAuthGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('create-contact')
  createContact(@Request() req: any, @Body() body: CreateContactDto) {
    return this.contactService.createContact(req.user.sub.id, body);
  }

  @Get('read-contacts')
  @UseInterceptors(ClassSerializerInterceptor)
  readContacts(@Request() req: any) {
    return this.contactService.readContacts(req.user.sub.id);
  }
}
