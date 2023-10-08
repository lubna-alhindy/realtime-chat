import { IsNumberString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @IsNumberString()
  @Length(10, 10)
  @ApiProperty()
  phoneNumber: string;
}
