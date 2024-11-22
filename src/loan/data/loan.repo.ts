import { BaseRepo } from 'src/common/base/repo';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Loan } from './loan.schema';
import { UserRole } from 'src/common/enums/role.enum';

export class LoanRepo extends BaseRepo<Loan> {
  constructor(
    @InjectModel(Loan.name)
    private readonly loanModel: Model<Loan>,
  ) {
    super(loanModel);
  }

  // async getLoansByRole(userId: string, role: string): Promise<Loan[]> {
  //   if (role === UserRole.ADMIN) {
  //     return this.loanModel.find().populate('user_id').populate('book_instance_id').exec();
  //   } else {
  //     return this.loanModel
  //       .find({ user_id: userId })
  //       .populate('user_id')
  //       .populate('book_instance_id')
  //       .exec();
  //   }
  // }

  async getLoansByRole(userId: string, role: string): Promise<Loan[]> {
    const query = role === UserRole.ADMIN ? {} : { user_id: new mongoose.Types.ObjectId(userId) };
    const loans = await this.loanModel
      .find(query)
      .populate({
        path: 'user_id'
      })
      .populate({
        path: 'book_instance_id',
        populate: {
          path: 'book_id',
          populate: [
            { path: 'author_id', select: 'name' },
            { path: 'genre_id', select: 'name' }
          ]
        },
      })
      .exec();
    return loans;
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
