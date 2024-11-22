import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTopLoanedBookDto {
  @ApiProperty({
    description: 'Khoảng thời gian để lọc sách. Các giá trị cho phép: month, quarter, year.',
    example: 'month',
  })
  @IsIn(['month', 'quarter', 'year'], { message: 'Invalid period. Allowed values: month, quarter, year.' })
  period: 'month' | 'quarter' | 'year';

  @ApiProperty({
    description: 'Số lượng sách được mượn nhiều nhất, mặc định là 10',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer.' })
  @Min(1, { message: 'Limit must be at least 1.' })
  limit?: number = 10;
}
