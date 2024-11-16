import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthorModule } from 'src/author/author.module';
import { GenreModule } from 'src/genre/genre.module';
import { ShareModule } from 'src/share/share.module';
import { BookRepo } from './data/book.repo';
import { AuthorRepo } from 'src/author/data/author.repo';
import { GenreRepo } from 'src/genre/data/genre.repo';
import { BookInstanceRepo } from 'src/book-instance/data/book-instance.repo';

@Module({
  imports: [AuthorModule, GenreModule, ShareModule],
  controllers: [BookController],
  providers: [BookService, BookRepo, AuthorRepo, GenreRepo, BookInstanceRepo],
})
export class BookModule {}
