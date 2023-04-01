import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';

describe('SearchController', () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule, CacheModule.register()],
      controllers: [SearchController],
      providers: [
        SearchService,
        makeCounterProvider({
          name: 'github_search_requests',
          help: 'Number of requests to the GitHub search API',
          labelNames: ['status', 'query'],
        }),
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
