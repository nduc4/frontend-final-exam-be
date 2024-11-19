import { Injectable } from '@nestjs/common';
import { BookRepo } from 'src/book/data/book.repo';
import { LoanRepo } from 'src/loan/data/loan.repo';

@Injectable()
export class StatisticService {
  constructor(
    private readonly loanRepo: LoanRepo,
    private readonly bookRepo: BookRepo
  ) {}
  async getTopBorrowedBooks(
    period: 'month' | 'quarter' | 'year',
    limit: number,
  ): Promise<any[]> {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'quarter') {
      const currentQuarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
    } else if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else {
      throw new Error('Invalid period');
    }

    const topBooks = await this.loanRepo.getTopBorrowedBooks(
      startDate,
      endDate,
      limit,
    );

    const detailedBooks = await Promise.all(
      topBooks.map(async (book) => {
        const bookDetails = await this.bookRepo.getById(book.book_id);
        return {
          book_id: book.book_id,
          title: bookDetails.title,
          count: book.count,
        };
      }),
    );

    return detailedBooks;
  }
}
