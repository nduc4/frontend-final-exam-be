import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageAbleDto } from 'src/common/dto/pageable.dto';

export class FilterBookDto extends PageAbleDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Tên sách',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Tên tác giả',
  })
  author?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Thể loại',
  })
  genre?: string;
}
