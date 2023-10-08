import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ContactModule } from 'src/contact/contact.module';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'iss_db',
      synchronize: true,
      host: 'localhost',
      username: 'root',
      type: 'mysql',
      password: '',
      port: 3306
    }),
    UserModule,
    ContactModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
