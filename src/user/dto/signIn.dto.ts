import { IsPhoneNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @IsString()
  @Length(6, 50)
  @ApiProperty({ example: 'thisisapassword' })
  password: string;
}
