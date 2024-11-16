import { Get, Param, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Note } from 'src/common/decorators/note.decorator';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import {
  ApiOkResponse,
  ApiParam,
  ApiProperty,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthorModel } from './data/author.model';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { GetAuthorsByIds } from './dto/get-authors.dto';

@ApiController('/api/author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('/list')
  @Public()
  @Note({
    title: 'Lấy thông tin tác giả theo danh sách ID',
    isInput: true,
    isPublic: true,
  })
  @ApiQuery({
    name: 'ids',
    type: [String],
    description: 'Danh sách các ID của tác giả (chuỗi hoặc mảng)',
    required: true,
    example: ['606c7f77b4f5c80b2412a4e4', '606c7f77b4f5c80b2412a4e5'],
  })
  @ApiOkResponse({
    description: 'OK',
    type: [AuthorModel],
  })
  async getAuthorsByIds(@Query() dto: GetAuthorsByIds) {
    return await this.authorService.getAuthorsByIds(dto);
  }
}
