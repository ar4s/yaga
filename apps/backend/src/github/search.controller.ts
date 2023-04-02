import {
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { Repository } from './entities/Repository.entity';
import { Search } from './entities/Search.entity';
import { SearchService } from './search.service';

@Controller('search')
@UseInterceptors(CacheInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async search(
    @Query('query') query: string,
    @Query('field') field?: string,
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<Search> {
    const response = await this.searchService.searchRepository(
      query,
      field,
      order,
    );
    return new Search({
      items: response.items.map((item) => new Repository(item)),
      total_count: response.total_count,
    });
  }
}
