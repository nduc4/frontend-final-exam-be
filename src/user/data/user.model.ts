import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/role.enum';
import { BaseModel } from 'src/common/base/model';

export class UserModel extends BaseModel {
  @ApiProperty({ example: 'test@example.com' })
  public email: string;

  @ApiProperty({ example: 'gIq7dCYtfOeXpKCw...' })
  public password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.READER,
  })
  public role: UserRole;

  @ApiProperty({ example: 'thisisafullname' })
  public fullName: string;

  @ApiProperty({
    example: 'Số 10, Huỳnh Văn Nghệ, P. Bửu Long, Tp. Biên Hòa - Tỉnh Đồng Nai',
  })
  public address: string;
}
