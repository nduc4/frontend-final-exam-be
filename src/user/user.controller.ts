import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import {
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UserModel } from 'src/user/data/user.model';
import { Note } from 'src/common/decorators/note.decorator';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { UserUpdateInfoDto } from './dto/user-update-info.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@ApiController('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signin')
  @Public()
  @Note({
    title: 'Đăng nhập',
    isPublic: true,
    isInput: true,
  })
  @ApiOkResponse({
    description: 'OK',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiOperation({
    summary: 'API Đăng nhập',
    description: `Sử dụng thông tin đăng nhập sau để thử nghiệm:
    
    Admin:
    - Email: admin@example.com
    - Mật khẩu: thisisapassword

    Librarian:
    - Email: librarian@example.com
    - Mật khẩu: thisisapassword

    User:
    - Email: user@example.com
    - Mật khẩu: thisisapassword
    `,
  })
  async signIn(@Body() dto: SignInDto) {
    return await this.userService.signIn(dto);
  }

  @Post('signup')
  @Public()
  @Note({
    title: 'Đăng ký',
    isPublic: true,
    isInput: true,
  })
  @ApiOkResponse({
    description: 'OK',
    type: UserModel,
  })
  @ApiConflictResponse({ description: 'Email đã tồn tại' })
  async signUp(@Body() dto: SignUpDto) {
    return await this.userService.signUp(dto);
  }

  @Get('/')
  @Roles(UserRole.ADMIN)
  @Note({
    title: 'Lấy tất cả user (ADMIN)',
    isInput: true,
    isForbidden: true,
  })
  @ApiOkResponse({
    description: 'OK',
    schema: {
      example: {
        totalPages: 1,
        totalDocuments: 10,
        data: [],
      },
    },
  })
  async getAll(@Query() dto: FilterUserDto) {
    return await this.userService.getAllUser(dto);
  }

  @Get('profile')
  @Note({ title: 'Lấy thông tin cá nhân' })
  @ApiOkResponse({
    description: 'OK',
    type: UserModel,
  })
  async getProfile(@Req() req) {
    return await this.userService.getOneUser(req);
  }

  @Put('/')
  @Note({
    title: 'Cập nhật thông tin user',
    isInput: true,
  })
  @ApiOkResponse({
    description: 'OK',
    type: UserModel,
  })
  async updateInfo(@Body() dto: UserUpdateInfoDto, @Req() req) {
    return await this.userService.updateUserInfo(dto, req);
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  @Note({
    title: 'Xóa user (ADMIN)',
    isInput: true,
    isForbidden: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID của user cần xóa',
    type: String,
  })
  @ApiOkResponse({
    description: 'OK',
    type: UserModel,
  })
  async deleteUser(@Param() dto: ObjectIdDto) {
    return await this.userService.deleteOneUser(dto);
  }
}
