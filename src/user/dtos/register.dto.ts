import { IsString, Length, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNumberString()
  @Length(10, 10)
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  @Length(8, 32)
  password: string;

  @IsString()
  @ApiProperty()
  username: string;
}
