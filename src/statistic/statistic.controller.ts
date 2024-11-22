import { Get, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { GetTopLoanedBookDto } from './dto/get-top-loaned-book.dto';

@ApiController('/api/statistic')
export class StatisticController {
  constructor(private readonly statisticsService: StatisticService) {}

  @Get('top-borrowed-books')
  @Public()
  @Note({
    title: 'Trả về danh sách sách được mượn nhiều nhất',
    isInput: true,
    isPublic: true,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          book_id: {
            type: 'string',
            description: 'The ID of the book.',
            example: '647abf9d8f1c4b2d8f5e9f10',
          },
          title: {
            type: 'string',
            description: 'The title of the book.',
            example: 'Book Title 1',
          },
          count: {
            type: 'number',
            description: 'The number of times the book was borrowed.',
            example: 15,
          },
        },
      },
    },
  })
  async getTopBorrowedBooks(@Query() query: GetTopLoanedBookDto) {
    return this.statisticsService.getTopBorrowedBooks(
      query.period,
      query.limit,
    );
  }
}
