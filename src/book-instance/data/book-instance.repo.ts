import { BaseRepo } from 'src/common/base/repo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookInstance } from './book-instance.schema';

export class BookInstanceRepo extends BaseRepo<BookInstance> {
  constructor(
    @InjectModel(BookInstance.name)
    private readonly bookModel: Model<BookInstance>,
  ) {
    super(bookModel);
  }

  async getDetailById(bookInstanceId: string): Promise<BookInstance> {
    return this.bookModel
      .findById(bookInstanceId)
      .populate('book_id', 'title author genre')
      .exec();
  }

}
