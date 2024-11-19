import { ApiController } from 'src/common/decorators/apiController.decorator';
import { BookInstanceService } from './book-instance.service';
import { Note } from 'src/common/decorators/note.decorator';
import { Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BookInstanceModel } from './data/book-instance.model';
import { Public } from 'src/common/decorators/public.decorator';
import { BookInstance } from './data/book-instance.schema';

@ApiController('/api/book-instance')
export class BookInstanceController {
  constructor(private readonly bookInstanceService: BookInstanceService) {}

  @Get('detail/:bookInstanceId')
  @Public()
  @Note({
    title: 'Trả về thông tin sách dựa vào ID bản sao sách',
    isInput: true,
    isPublic: true
  })
  async getDetail(@Param('bookInstanceId') bookInstanceId: string): Promise<BookInstance> {
    return this.bookInstanceService.getDetail(bookInstanceId);
  }

  @Get('/:bookId')
  @Public()
  @Note({
    title: 'Liệt kê bản sao của sách theo ID sách',
    isInput: true,
    isPublic: true,
  })
  @ApiParam({ name: 'bookId', type: 'string', required: true })
  @ApiOkResponse({
    description: 'OK',
    type: [BookInstanceModel],
  })
  async getInstancesByBookId(@Param('bookId') bookId: string) {
    return this.bookInstanceService.findAllByBookId(bookId);
  }

  @Delete('/:bookInstanceId')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @Note({
    title: 'Xoá bản sao của sách theo ID bản sao sách (ADMIN, LIBRARIAN)',
    isInput: true,
    isForbidden: true,
  })
  @ApiParam({
    name: 'bookInstanceId',
    type: 'string',
    required: true,
  })
  @ApiOkResponse({
    description: 'OK',
    type: BookInstanceModel,
  })
  async deleteBookInstanceById(
    @Param('bookInstanceId') bookInstanceId: string,
  ) {
    return await this.bookInstanceService.deleteBookInstance(bookInstanceId);
  }
}
