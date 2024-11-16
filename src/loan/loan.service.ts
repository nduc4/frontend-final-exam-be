import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoanRepo } from './data/loan.repo';
import { CreateLoanDto } from './dto/create-loan.dto';
import { BookStatus } from 'src/common/enums/status.enum';
import { ReturnLoanDto } from './dto/return-loan.dto';
import { BookInstanceRepo } from 'src/book-instance/data/book-instance.repo';
import { Loan } from './data/loan.schema';
import { UserRepo } from 'src/user/data/user.repo';

@Injectable()
export class LoanService {
  constructor(
    private readonly _loanRepo: LoanRepo,
    private readonly _bookInstanceRepo: BookInstanceRepo,
    private readonly _userRepo: UserRepo,
  ) {}

  async getAllLoan() {
    return await this._loanRepo.getAll()
  }

  async loanBook(req, bookInstanceId: string): Promise<Loan> {
    const user = await this._userRepo.getById(req.user.sub);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const bookInstance = await this._bookInstanceRepo.getById(bookInstanceId);

    if (!bookInstance) {
      throw new NotFoundException('Book instance not found');
    }

    if (bookInstance.status !== BookStatus.AVAILABLE) {
      throw new BadRequestException('Book instance is not available');
    }

    const loan = await this._loanRepo.create({
      user_id: user._id,
      book_instance_id: bookInstance._id,
      loan_date: new Date(),
      due_date: this.calculateDueDate(),
    });

    await this._bookInstanceRepo.updateById(bookInstanceId, {
      status: BookStatus.LOANED,
    });

    return loan;
  }

  async returnBook(loanId: string): Promise<Loan> {
    const loan = await this._loanRepo.getById(loanId);

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    if (loan.return_date) {
      throw new BadRequestException('Book has already been returned');
    }

    const updatedLoan = await this._loanRepo.updateById(loanId, {
      return_date: new Date(),
    });

    await this._bookInstanceRepo.updateById(loan.book_instance_id._id.toString(), {
      status: BookStatus.AVAILABLE,
    });

    return updatedLoan;
  }

  private calculateDueDate(): Date {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    return dueDate;
  }
}
