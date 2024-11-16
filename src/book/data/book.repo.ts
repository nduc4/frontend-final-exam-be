import { BaseRepo } from 'src/common/base/repo';
import { Book } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class BookRepo extends BaseRepo<Book> {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {
    super(bookModel);
  }
}
