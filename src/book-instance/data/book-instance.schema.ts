import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from 'src/book/data/book.schema';
import { BaseSchema } from 'src/common/base/schema';
import { BookStatus } from 'src/common/enums/status.enum';

@Schema({
  timestamps: true,
})
export class BookInstance extends BaseSchema {
  @Prop({
    type: String,
    required: true,
    default: BookStatus.AVAILABLE,
  })
  status: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Book.name,
    required: true,
    autopopulate: true,
  })
  book_id: mongoose.Types.ObjectId;
}

export const BookInstanceSchema = SchemaFactory.createForClass(BookInstance);
BookInstanceSchema.plugin(require('mongoose-autopopulate'));
