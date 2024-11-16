import { Injectable } from '@nestjs/common';
import { AuthorRepo } from './data/author.repo';
import { Author } from './data/author.schema';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { GetAuthorsByIds } from './dto/get-authors.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(
    private readonly _authorRepo: AuthorRepo,
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async getAuthorById(dto: ObjectIdDto) {
    return await this._authorRepo.getById(dto.id);
  }

  async getAuthorsByIds(dto: GetAuthorsByIds) {
    const ids = dto.getIdArray();
    return await this.authorModel.find({
      _id: { $in: ids },
    });
  }

  async getAuthorByName(name: string) {
    return await this._authorRepo.getOne({ name: name });
  }

  async createAuthor(name: string) {
    const data: Author = {
      name,
    };
    return await this._authorRepo.create(data);
  }

  async updateAuthorById(dto: ObjectIdDto, name: string) {
    const data: Author = {
      name,
    };
    return await this._authorRepo.updateById(dto.id, data);
  }

  async deleteAuthorById(dto: ObjectIdDto) {
    return await this._authorRepo.deleteById(dto.id);
  }
}
