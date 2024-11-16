import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsMongoId, ValidateIf } from 'class-validator';

export class GetGenresByIds {
  @ValidateIf((obj) => typeof obj.ids === 'string')
  @IsMongoId()
  @Type(() => String)
  public ids: string | string[];

  getIdArray(): string[] {
    if (typeof this.ids === 'string') {
      return [this.ids];
    }
    return this.ids;
  }
}
