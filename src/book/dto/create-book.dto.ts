import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Sách mẫu' })
  title: string;

  @IsDateString()
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  published_year: string;

  @ApiProperty({
    example: ['J.K. Rowling', 'George R.R. Martin'],
    description: 'Danh sách các tác giả',
  })
  authors: string[];

  @ApiProperty({
    example: ['Fantasy', 'Adventure'],
    description: 'Danh sách các thể loại',
  })
  genres: string[];
}
