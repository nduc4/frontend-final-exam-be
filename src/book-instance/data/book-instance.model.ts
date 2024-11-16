import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/base/model';
import { BookStatus } from 'src/common/enums/status.enum';

export class BookInstanceModel extends BaseModel {
  @ApiProperty({
    enum: BookStatus,
    example: BookStatus.AVAILABLE,
  })
  public status: BookStatus.AVAILABLE;

  @ApiProperty({
    type: String,
    example: 'gIq7dCYtfOeXpKCw...',
  })
  public book_id: string;
}
