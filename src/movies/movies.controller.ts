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
import { CreateMovieDTO } from './dto/movies.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

// 기본 라우터는 movies
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  public getAll(): Movie[] {
    return this.movieService.getAll();
  }

  //   @Get('search')
  //   Search(@Query('year') searchingYear: string) {
  //     return `We are searching a movie made after : ${searchingYear}`;
  //   }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() MovieData: CreateMovieDTO) {
    return this.movieService.create(MovieData);
  }

  @Delete('/:id')
  delete(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch('/:id') //put 전체, patch는 일부
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    return this.movieService.update(movieId, updateData);
  }
}
