import { Module } from '@nestjs/common';
import { BookInstanceService } from './book-instance.service';
import { BookInstanceController } from './book-instance.controller';
import { BookInstanceRepo } from './data/book-instance.repo';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [BookInstanceService, BookInstanceRepo],
  controllers: [BookInstanceController],
})
export class BookInstanceModule {}
