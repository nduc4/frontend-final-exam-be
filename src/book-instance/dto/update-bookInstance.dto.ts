import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { BookStatus } from 'src/common/enums/status.enum';

export class UpdateBookInstanceDto {
  @IsEnum(BookStatus)
  @ApiProperty({
    enum: BookStatus,
    required: true,
    description:
      'Trạng thái của sách copy. Các giá trị có thể là: AVAILABLE, LOANED, DAMAGED',
    example: 'LOANED',
  })
  status: BookStatus;
}
