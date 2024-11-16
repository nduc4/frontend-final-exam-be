import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsDateString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Sách mẫu',
    required: false,
    description: 'Tên sách',
  })
  title?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    required: false,
    description: '2024-01-01T00:00:00Z',
  })
  published_year?: string;

  @IsOptional()
  @ApiProperty({
    example: ['J.K. Rowling', 'George R.R. Martin'],
    description: 'Danh sách các tác giả',
  })
  authors?: string[];

  @IsOptional()
  @ApiProperty({
    example: ['Fantasy', 'Adventure'],
    description: 'Danh sách các thể loại',
  })
  genres?: string[];
}
