import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/base/model';

export class LoanModel extends BaseModel {
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  public loan_date: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  public due_date: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', required: false })
  public return_date?: Date;

  @ApiProperty({
    type: String,
    example: 'gIq7dCYtfOeXpKCw...',
  })
  public user_id: string;

  @ApiProperty({
    type: String,
    example: 'gIq7dCYtfOeXpKCw...',
  })
  public book_instance_id: string;
}
