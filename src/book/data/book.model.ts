import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/base/model';
import { BookStatus } from 'src/common/enums/status.enum';

export class BookModel extends BaseModel {
  @ApiProperty({ example: 'test@example.com' })
  public title: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  public published_year: Date;

  @ApiProperty({
    enum: BookStatus,
    example: BookStatus.AVAILABLE,
  })
  public status: BookStatus.AVAILABLE;

  @ApiProperty({
    type: [String],
    example: ['gIq7dCYtfOeXpKCw...', 'hJq7dAytfOeXpKCb...'],
  })
  public author_id: string[];

  @ApiProperty({
    type: [String],
    example: ['aJx9dCYtfEeQkKCx...', 'zWq2dAytfPeZmXMb...'],
  })
  public genre_id: string[];
}
