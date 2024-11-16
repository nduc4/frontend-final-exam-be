import { BaseRepo } from 'src/common/base/repo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './genre.schema';

export class GenreRepo extends BaseRepo<Genre> {
  constructor(
    @InjectModel(Genre.name)
    private readonly genreModel: Model<Genre>,
  ) {
    super(genreModel);
  }
}
