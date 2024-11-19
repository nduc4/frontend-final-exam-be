import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { LoanModule } from './loan/loan.module';
import { BookInstanceModule } from './book-instance/book-instance.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    UserModule,
    BookModule,
    AuthorModule,
    GenreModule,
    LoanModule,
    BookInstanceModule,
    StatisticModule,
  ],
})
export class AppModule {}
