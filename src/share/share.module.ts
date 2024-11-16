import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from 'src/author/data/author.schema';
import {
  BookInstance,
  BookInstanceSchema,
} from 'src/book-instance/data/book-instance.schema';
import { Book, BookSchema } from 'src/book/data/book.schema';
import { Genre, GenreSchema } from 'src/genre/data/genre.schema';
import { Loan, LoanSchema } from 'src/loan/data/loan.schema';
import { User, UserSchema } from 'src/user/data/user.schema';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: BookInstance.name, schema: BookInstanceSchema },
    ]),
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
  ],
  exports: [MongooseModule, JwtModule],
})
export class ShareModule {}
