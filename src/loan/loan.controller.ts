import { ApiController } from 'src/common/decorators/apiController.decorator';
import { LoanService } from './loan.service';
import { Body, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Loan } from './data/loan.schema';
import { Note } from 'src/common/decorators/note.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoanModel } from './data/loan.model';
import { PageAbleDto } from 'src/common/dto/pageable.dto';

@ApiController('/api/loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  @Note({
    title: 'Trả về tất cả phiếu mượn của User đó',
  })
  @ApiOkResponse({
    description: 'OK',
    schema: {
      example: {
        totalPages: 1,
        totalDocuments: 10,
        data: [],
      },
    },
  })
  async getAllLoan(@Req() req, @Query() dto: PageAbleDto) {
    return await this.loanService.getAllLoan(req, dto);
  }

  @Post('/:bookInstanceId')
  @Note({
    title: 'Mượn sách, nhập vào mã bản sao sách',
    isInput: true,
  })
  @ApiOkResponse({
    description: 'OK',
    type: LoanModel,
  })
  async loanBook(
    @Param('bookInstanceId') bookInstanceId: string,
    @Req() req,
  ): Promise<Loan> {
    return this.loanService.loanBook(req, bookInstanceId);
  }

  @Post('return/:loanId')
  @Note({
    title: 'Trả sách, nhập vào mã phiếu mượn',
    isInput: true,
  })
  @ApiOkResponse({
    description: 'OK',
    type: LoanModel,
  })
  async returnBook(@Param('loanId') loanId: string): Promise<Loan> {
    return this.loanService.returnBook(loanId);
  }
}
