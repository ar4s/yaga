import {
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
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async search(@Query('query') query: string): Promise<Search> {
    const response = await this.searchService.searchRepository(query);
    return new Search({
      items: response.items.map((item) => new Repository(item)),
      total_count: response.total_count,
    });
  }
}
