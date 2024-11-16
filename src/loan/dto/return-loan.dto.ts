import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class ReturnLoanDto {
  @IsMongoId()
  @IsNotEmpty()
  loan_id: string;

  @IsDateString()
  @IsNotEmpty()
  return_date: string;
}
