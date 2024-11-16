import { ApiController } from 'src/common/decorators/apiController.decorator';
import { BookInstanceService } from './book-instance.service';
import { Note } from 'src/common/decorators/note.decorator';
import { Body, Delete, Get, Param, Put } from '@nestjs/common';
import { UpdateBookInstanceDto } from './dto/update-bookInstance.dto';
import { ApiBody, ApiOkResponse, ApiParam, ApiProperty } from '@nestjs/swagger';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { BookModel } from 'src/book/data/book.model';
import { UserRole } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BookInstanceModel } from './data/book-instance.model';
import { Public } from 'src/common/decorators/public.decorator';

@ApiController('/api/book-instance')
export class BookInstanceController {
  constructor(private readonly bookInstanceService: BookInstanceService) {}

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
