import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';

@Module({
  imports: [],
  controllers: [MoviesController], // url을 가져다가 실행
  providers: [],
})
export class AppModule {}
