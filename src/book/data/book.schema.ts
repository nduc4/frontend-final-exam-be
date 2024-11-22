import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Author } from 'src/author/data/author.schema';
import { BaseSchema } from 'src/common/base/schema';
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: Author.name,
    required: true,
    autopopulate: true
  })
  author_id: Types.ObjectId[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Genre.name,
    required: true,
    autopopulate: true
  })
  genre_id: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.plugin(require('mongoose-autopopulate'));
