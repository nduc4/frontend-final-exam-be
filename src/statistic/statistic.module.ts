import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { LoanRepo } from 'src/loan/data/loan.repo';
import { BookRepo } from 'src/book/data/book.repo';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [StatisticService, LoanRepo, BookRepo],
  controllers: [StatisticController],
})
export class StatisticModule {}
