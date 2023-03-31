import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [HttpModule, CacheModule.register({ ttl: 600, max: 1000 })],
  controllers: [SearchController],
  providers: [SearchService],
})
export class GithubModule {}
