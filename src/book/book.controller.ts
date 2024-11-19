import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { BookService } from './book.service';
import { Note } from 'src/common/decorators/note.decorator';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { BookModel } from './data/book.model';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiController('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/:bookId')
  @Note({
    title: 'Lấy thông tin sách bằng ID',
    isInput: true,
    isPublic: true,
  })
  @Public()
  @ApiOkResponse({
    description: 'OK',
    type: BookModel,
  })
  async getBookById(@Param('bookId') id: string) {
    return await this.bookService.getBookById(id)
  }

  @Post()
  @Note({
    title: 'Tạo sách mới (ADMIN, LIBRARIAN)',
    isInput: true,
  })
  @ApiOkResponse({
    description: 'OK',
    type: BookModel,
  })
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async createBook(@Body() dto: CreateBookDto) {
    return await this.bookService.createBook(dto);
  }

  @Get()
  @Note({
    title: 'Lấy tất cả sách',
    isInput: true,
    isPublic: true,
  })
  @Public()
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
  async getAll(@Query() dto: FilterBookDto) {
    return await this.bookService.getAllBook(dto);
  }

  @Put('/:bookId')
  @Note({
    title: 'Cập nhật thông tin sách (ADMIN, LIBRARIAN)',
    isInput: true,
    isForbidden: true,
  })
  @ApiOkResponse({
    description: 'OK',
    type: BookModel,
  })
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async updateBook(@Param('bookId') id: string, @Body() dto: UpdateBookDto) {
    return await this.bookService.updateBook(id, dto);
  }

  @Delete('/:bookId')
  @Note({
    title: 'Xoá sách (ADMIN, LIBRARIAN)',
    isInput: true,
    isForbidden: true,
  })
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @ApiOkResponse({
    description: 'OK',
    type: BookModel,
  })
  async deleteBook(@Param('bookId') id: string) {
    return await this.bookService.deleteBook(id);
  }
}
