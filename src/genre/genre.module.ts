import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreRepo } from './data/genre.repo';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [GenreService, GenreRepo],
  controllers: [GenreController],
  exports: [GenreService],
})
export class GenreModule {}
