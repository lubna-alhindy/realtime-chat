import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { RegisterDto } from './dtos/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(body: RegisterDto) {
    let user = await this.userRepository.findOneBy([
      { phoneNumber: body.phoneNumber },
      { username: body.username }
    ]);

    if (user) {
      throw new ConflictException('phoneNumber or username is used before!');
    }
    user = await this.userRepository.save(this.userRepository.create(body));

    const payload = {
      sub: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        username: user.username
      }
    };

    return {
      user,
      access_token: this.jwtService.sign(payload)
    };
  }

  async validateUserCredentials(phoneNumber: string, password: string) {
    const user = await this.userRepository.findOneBy({
      phoneNumber: phoneNumber
    });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      sub: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        username: user.username
      }
    };

    return {
      user,
      access_token: this.jwtService.sign(payload)
    };
  }

  getMe(id: number) {
    return this.userRepository.findOneBy({
      id: id
    });
  }

  getByPhoneNumber(phoneNumber: string) {
    return this.userRepository.findOneBy({
      phoneNumber: phoneNumber
    });
  }

  getUsers() {
    return this.userRepository.find();
  }
}
