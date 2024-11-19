import { BaseRepo } from 'src/common/base/repo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan } from './loan.schema';

export class LoanRepo extends BaseRepo<Loan> {
  constructor(
    @InjectModel(Loan.name)
    private readonly loanModel: Model<Loan>,
  ) {
    super(loanModel);
  }
  async getTopBorrowedBooks(
    startDate: Date,
    endDate: Date,
    limit: number,
  ): Promise<{ book_id: string; count: number }[]> {
    return this.loanModel
      .aggregate([
        {
          $match: {
            loan_date: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $lookup: {
            from: 'bookinstances',
            localField: 'book_instance_id',
            foreignField: '_id',
            as: 'bookInstance',
          },
        },
        {
          $unwind: '$bookInstance',
        },
        {
          $group: {
            _id: '$bookInstance.book_id',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 0,
            book_id: '$_id',
            count: 1,
          },
        },
      ])
      .exec();
  }
}
