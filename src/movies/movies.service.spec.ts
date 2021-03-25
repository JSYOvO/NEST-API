import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  // test 전 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('Should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['test'],
        year: 2020,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`MovieId 1 not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['test'],
        year: 2020,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('Shoule return 404', () => {
      try {
        service.deleteOne(1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`MovieId 1 not found`);
      }
    });
  });

  describe('create', () => {
    it('Should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'testMovie',
        genres: ['test'],
        year: 2020,
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('Should update a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['test'],
        year: 2020,
      });
      service.update(1, { title: 'Update test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update test');
    });

    it('should throw 404 error', () => {
      try {
        service.update(1, { title: 'Update test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`MovieId 1 not found`);
      }
    });
  });
});
