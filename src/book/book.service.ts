import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepo } from './data/book.repo';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './data/book.schema';
import { AuthorService } from 'src/author/author.service';
import { GenreService } from 'src/genre/genre.service';
import { FilterBookDto } from './dto/filter-book.dto';
import { StringUtil } from 'src/common/utils/string.utils';
import { AuthorRepo } from 'src/author/data/author.repo';
import { GenreRepo } from 'src/genre/data/genre.repo';
import mongoose from 'mongoose';
import { BookStatus } from 'src/common/enums/status.enum';
import { BookInstance } from 'src/book-instance/data/book-instance.schema';
import { BookInstanceRepo } from 'src/book-instance/data/book-instance.repo';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly _bookRepo: BookRepo,
    private readonly _authorRepo: AuthorRepo,
    private readonly _genreRepo: GenreRepo,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService,
    private readonly _bookInstanceRepo: BookInstanceRepo,
  ) {}

  async getAllBook(dto: FilterBookDto) {
    const query: any = {};

    if (dto.title) {
      query['title'] = StringUtil.queryLike(dto.title);
    }

    if (dto.author) {
      const authors = await this._authorRepo.getAll({
        name: StringUtil.queryLike(dto.author) as string,
      });
      const authorIds = authors.map((author) => author._id);
      query['author_id'] = { $in: authorIds };
    }

    if (dto.genre) {
      const genres = await this._genreRepo.getAll({
        name: StringUtil.queryLike(dto.genre) as string,
      });
      const genreIds = genres.map((genre) => genre._id);
      query['genre_id'] = { $in: genreIds };
    }

    const totalDocuments = await this._bookRepo.count(query);
    const totalPages = Math.ceil(totalDocuments / dto.limit);
    const data = await this._bookRepo.getPage(dto, query);
    return {
      totalPages,
      totalDocuments,
      data,
    };
  }

  async createBook(dto: CreateBookDto) {
    const authorIds = [];
    for (const authorName of dto.authors) {
      let author = await this.authorService.getAuthorByName(authorName);
      if (!author) {
        author = await this.authorService.createAuthor(authorName);
      }
      authorIds.push(author._id);
    }

    const genreIds = [];
    for (const genreName of dto.genres) {
      let genre = await this.genreService.getGenreByName(genreName);
      if (!genre) {
        genre = await this.genreService.createGenre(genreName);
      }
      genreIds.push(genre._id);
    }

    const existingBook = await this._bookRepo.getOne({
      title: dto.title,
      published_year: new Date(dto.published_year),
      author_id: { $all: authorIds },
      genre_id: { $all: genreIds },
    });

    let book: Book;
    if (!existingBook) {
      const data: Book = {
        title: dto.title,
        published_year: new Date(dto.published_year),
        genre_id: genreIds,
        author_id: authorIds,
      };

      book = await this._bookRepo.create(data);
    } else {
      book = existingBook;
    }

    const bookInstanceData: BookInstance = {
      status: BookStatus.AVAILABLE,
      book_id: book._id,
    };

    const bookInstance = await this._bookInstanceRepo.create(bookInstanceData);

    return { book, bookInstance };
  }

  async updateBook(id: string, dto: UpdateBookDto) {
    const authorIds = [];
    if (dto.authors && dto.authors.length > 0) {
      for (const authorName of dto.authors) {
        let author = await this.authorService.getAuthorByName(authorName);
        if (!author) {
          author = await this.authorService.createAuthor(authorName);
        }
        authorIds.push(author._id);
      }
    }

    const genreIds = [];
    if (dto.genres && dto.genres.length > 0) {
      for (const genreName of dto.genres) {
        let genre = await this.genreService.getGenreByName(genreName);
        if (!genre) {
          genre = await this.genreService.createGenre(genreName);
        }
        genreIds.push(genre._id);
      }
    }

    const updatedData: Partial<Book> = {
      title: dto.title,
    };

    if (dto.published_year) {
      updatedData.published_year = new Date(dto.published_year);
    }
    if (authorIds.length > 0) {
      updatedData.author_id = authorIds;
    }
    if (genreIds.length > 0) {
      updatedData.genre_id = genreIds;
    }

    await this._bookRepo.updateById(id, updatedData);
    return await this._bookRepo.getById(id);
  }

  async deleteBook(id: string) {
    const existingBook = await this._bookRepo.getById(id);
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }
    this._bookInstanceRepo.deleteMany({
      book_id: new mongoose.Types.ObjectId(id),
    });
    return await this._bookRepo.deleteById(id);
  }

  async getBookById(id: string) {
    return await this._bookRepo.getById(id)
  }
}
