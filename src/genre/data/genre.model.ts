import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/base/model';

export class GenreModel extends BaseModel {
  @ApiProperty({ example: 'Fantasy' })
  public name: string;
}
