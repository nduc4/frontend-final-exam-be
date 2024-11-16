import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/base/model';

export class AuthorModel extends BaseModel {
  @ApiProperty({ example: 'Nguyễn Nhật Ánh' })
  public name: string;
}
