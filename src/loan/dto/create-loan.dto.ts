import { IsNotEmpty, IsDateString, IsMongoId } from 'class-validator';

export class CreateLoanDto {
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsMongoId()
  @IsNotEmpty()
  book_instance_id: string;

  @IsDateString()
  @IsNotEmpty()
  loan_date: string;

  @IsDateString()
  @IsNotEmpty()
  due_date: string;
}
