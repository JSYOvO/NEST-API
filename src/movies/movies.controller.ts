import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// 기본 라우터는 movies
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return `return all movies`;
  }

  @Get('search')
  Search(@Query('year') searchingYear: string) {
    return `We are searching a movie made after : ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `return one Movie ${id}`;
  }

  @Post()
  create(@Body() MovieData) {
    // console.log(MovieData);
    return MovieData;
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return `return delete a movie ${id}`;
  }

  @Patch('/:id') //put 전체, patch는 일부
  patch(@Param('id') id: string, @Body() updateData) {
    return {
      updateMovie: id,
      ...updateData,
    };
  }
}
