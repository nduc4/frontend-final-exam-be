import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepo } from './data/author.repo';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [AuthorService, AuthorRepo],
  controllers: [AuthorController],
  exports: [AuthorService],
})
export class AuthorModule {}
