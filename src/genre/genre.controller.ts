import { Get, Query } from '@nestjs/common';
import { Note } from 'src/common/decorators/note.decorator';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { GenreService } from './genre.service';
import { GenreModel } from './data/genre.model';
import { Public } from 'src/common/decorators/public.decorator';
import { GetGenresByIds } from './dto/get-genres.dto';

@ApiController('/api/genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('/list')
  @Public()
  @Note({
    title: 'Lấy thông tin thể loại theo danh sách ID',
    isInput: true,
    isPublic: true,
  })
  @ApiQuery({
    name: 'ids',
    type: [String],
    description: 'Danh sách các ID của thể loại (chuỗi hoặc mảng)',
    required: true,
    example: ['606c7f77b4f5c80b2412a4e4', '606c7f77b4f5c80b2412a4e5'],
  })
  @ApiOkResponse({
    description: 'OK',
    type: [GenreModel],
  })
  async getAuthorsByIds(@Query() dto: GetGenresByIds) {
    return await this.genreService.getGenresByIds(dto);
  }
}
