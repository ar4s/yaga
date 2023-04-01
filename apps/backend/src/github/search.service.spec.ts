import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

import { HttpModule } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        SearchService,
        { provide: CACHE_MANAGER, useValue: {} },
        makeCounterProvider({
          name: 'github_search_requests',
          help: 'Number of requests to the GitHub search API',
          labelNames: ['status', 'query'],
        }),
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
