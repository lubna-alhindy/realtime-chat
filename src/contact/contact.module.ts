import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';

import { ContactController } from './contact.controller';
import { Contact } from './entities/contact.entity';
import { ContactService } from './contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), UserModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
