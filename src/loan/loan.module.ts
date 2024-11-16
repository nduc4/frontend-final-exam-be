import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { LoanRepo } from './data/loan.repo';
import { ShareModule } from 'src/share/share.module';
import { UserRepo } from 'src/user/data/user.repo';
import { BookInstanceRepo } from 'src/book-instance/data/book-instance.repo';

@Module({
  imports: [ShareModule],
  providers: [LoanService, LoanRepo, UserRepo, BookInstanceRepo],
  controllers: [LoanController],
})
export class LoanModule {}
