import { IsString, IsNumberString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNumberString()
  @Length(10, 10)
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  @Length(8, 32)
  password: string;
}
