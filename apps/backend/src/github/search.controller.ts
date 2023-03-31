import { Controller, Get } from '@nestjs/common';

import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search() {
    console.log(await this.searchService.searchRepository('tonik'));
    return 'Hello World';
  }
}
