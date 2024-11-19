import { Injectable } from '@nestjs/common';
import { GenreRepo } from './data/genre.repo';
import { Genre } from './data/genre.schema';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetGenresByIds } from './dto/get-genres.dto';

@Injectable()
export class GenreService {
  constructor(
    private readonly _genreRepo: GenreRepo,
    @InjectModel(Genre.name) private readonly genreModel: Model<Genre>,
  ) {}

  async createGenre(name: string) {
    const data: Genre = {
      name,
    };
    return await this._genreRepo.create(data);
  }

  async getGenreByName(name: string) {
    return await this._genreRepo.getOne({ name: name });
  }

  async getGenreById(dto: ObjectIdDto) {
    return await this._genreRepo.getById(dto.id);
  }

  async getGenresByIds(dto: GetGenresByIds) {
    const ids = dto.getIdArray();
    return await this.genreModel.find({
      _id: { $in: ids },
    });
  }

  async updateGenreById(dto: ObjectIdDto, name: string) {
    const data: Genre = {
      name,
    };
    return await this._genreRepo.updateById(dto.id, data);
  }

  async deleteGenreById(dto: ObjectIdDto) {
    return await this._genreRepo.deleteById(dto.id);
  }
}
