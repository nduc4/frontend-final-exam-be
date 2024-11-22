import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoanRepo } from './data/loan.repo';
import { BookStatus } from 'src/common/enums/status.enum';
import { BookInstanceRepo } from 'src/book-instance/data/book-instance.repo';
import { Loan } from './data/loan.schema';
import { UserRepo } from 'src/user/data/user.repo';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import mongoose from 'mongoose';
import { UserRole } from 'src/common/enums/role.enum';

@Injectable()
export class LoanService {
  constructor(
    private readonly _loanRepo: LoanRepo,
    private readonly _bookInstanceRepo: BookInstanceRepo,
    private readonly _userRepo: UserRepo,
  ) {}

  async getAllLoan(req, dto: PageAbleDto) {
    const userId: string = req.user.sub;
    const userRole: UserRole = req.user.role;
    const pageQuery = {
      page: dto.page,
      limit: dto.limit,
    };

    let totalDocuments;
    let totalPages;
    let data;

    if (userRole === UserRole.READER) {
      totalDocuments = await this._loanRepo.count({
        user_id: new mongoose.Types.ObjectId(userId),
      });
      totalPages = Math.ceil(totalDocuments / dto.limit);
      data = await this._loanRepo.getPage(pageQuery, {
        user_id: new mongoose.Types.ObjectId(userId),
      });
    } else {
      totalDocuments = await this._loanRepo.count();
      totalPages = Math.ceil(totalDocuments / dto.limit);
      data = await this._loanRepo.getPage(pageQuery);
    }

    return {
      totalPages,
      totalDocuments,
      data,
    };
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
      book_instance_status: BookStatus.LOANED,
    });

    await this._bookInstanceRepo.updateById(bookInstanceId, {
      status: BookStatus.LOANED,
    });

    return await this._loanRepo.getById(loan._id.toString());
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
      book_instance_status: BookStatus.RETURNED,
    });

    await this._bookInstanceRepo.updateById(
      loan.book_instance_id._id.toString(),
      {
        status: BookStatus.AVAILABLE,
      },
    );

    return await this._loanRepo.getById(updatedLoan._id.toString());
  }

  private calculateDueDate(): Date {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    return dueDate;
  }
}
