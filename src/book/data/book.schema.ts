import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { Author } from 'src/author/data/author.schema';
import { BaseSchema } from 'src/common/base/schema';
import { BookStatus } from 'src/common/enums/status.enum';
import { Genre } from 'src/genre/data/genre.schema';

@Schema({
  timestamps: true,
})
export class Book extends BaseSchema {
  @Prop({ type: String, required: true })
  title: string;

  @Prop()
  published_year: Date;

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: Author.name }],
    required: true,
    autopopulate: true,
  })
  author_id: mongoose.Types.ObjectId[];

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: Genre.name }],
    required: true,
    autopopulate: true,
  })
  genre_id: mongoose.Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.plugin(require('mongoose-autopopulate'));
