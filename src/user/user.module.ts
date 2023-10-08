import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { LocalStrategy } from 'src/_strategies/local.strategy';
import { JwtStrategy } from 'src/_strategies/jwt.strategy';
import { jwtConstants } from 'src/_utils/jwt/constants';

import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
