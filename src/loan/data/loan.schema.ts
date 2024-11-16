import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BookInstance } from 'src/book-instance/data/book-instance.schema';
import { Book } from 'src/book/data/book.schema';
import { BaseSchema } from 'src/common/base/schema';
import { BookStatus } from 'src/common/enums/status.enum';
import { User } from 'src/user/data/user.schema';

@Schema({
  timestamps: true,
})
export class Loan extends BaseSchema {
  @Prop()
  loan_date: Date;

  @Prop()
  due_date: Date;

  @Prop({
    required: false,
  })
  return_date?: Date;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
    required: true,
    autopopulate: true,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: BookInstance.name,
    required: true,
    autopopulate: true,
  })
  book_instance_id: mongoose.Types.ObjectId;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
LoanSchema.plugin(require('mongoose-autopopulate'));
