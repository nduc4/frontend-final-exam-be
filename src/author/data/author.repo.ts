import { BaseRepo } from 'src/common/base/repo';
import { Author } from './author.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class AuthorRepo extends BaseRepo<Author> {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<Author>,
  ) {
    super(authorModel);
  }
}
