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
}
