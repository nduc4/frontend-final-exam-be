import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/base/schema';

@Schema({
  timestamps: true,
})
export class Author extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
