import { Injectable, NotFoundException } from '@nestjs/common';
import { BookInstanceRepo } from './data/book-instance.repo';
import { BookInstance } from './data/book-instance.schema';
import { BookStatus } from 'src/common/enums/status.enum';
import { Book } from 'src/book/data/book.schema';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { UpdateBookInstanceDto } from './dto/update-bookInstance.dto';
import mongoose from 'mongoose';

@Injectable()
export class BookInstanceService {
  constructor(private readonly _bookInstanceRepo: BookInstanceRepo) {}

  async getDetail(bookInstanceId: string): Promise<BookInstance> {
    const bookInstance = await this._bookInstanceRepo.getDetailById(bookInstanceId);
    if (!bookInstance) {
      throw new NotFoundException('Book instance not found');
    }
    return bookInstance;
  }

  async findAllByBookId(bookId: string) {
    return this._bookInstanceRepo.getAll({
      book_id: new mongoose.Types.ObjectId(bookId),
    });
  }

  async getBookInstanceById(dto: ObjectIdDto) {
    return await this._bookInstanceRepo.getById(dto.id);
  }

  async createBookInstance(book: Book) {
    const data: BookInstance = {
      status: BookStatus.AVAILABLE,
      book_id: book._id,
    };
    return await this._bookInstanceRepo.create(data);
  }

  async updateBookInstanceById(
    objectIdDto: ObjectIdDto,
    dto: UpdateBookInstanceDto,
  ) {
    await this._bookInstanceRepo.updateById(objectIdDto.id, {
      status: dto.status,
    });
    return await this.getBookInstanceById(objectIdDto);
  }

  async deleteBookInstance(id: string) {
    return await this._bookInstanceRepo.deleteById(id);
  }
}
