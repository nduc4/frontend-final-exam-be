import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/base/schema';

@Schema({
  timestamps: true,
})
export class Genre extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
