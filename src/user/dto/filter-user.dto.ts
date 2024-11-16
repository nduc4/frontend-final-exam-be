import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageAbleDto } from 'src/common/dto/pageable.dto';

export class FilterUserDto extends PageAbleDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Email',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Họ tên',
  })
  fullname?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Địa chỉ',
  })
  address?: string;
}
