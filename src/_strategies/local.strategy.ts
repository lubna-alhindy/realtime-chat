import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userService: UserService) {
    super({
      usernameField: 'phoneNumber',
      passReqToCallback: false
    });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.userService.validateUserCredentials(phoneNumber, password);
    if (!user) {
      throw new BadRequestException('phoneNumber or password incorrect!');
    }
    return user;
  }
}
