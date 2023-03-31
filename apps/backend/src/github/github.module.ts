import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    HttpModule,
    // TODO: change to redis but after resolve this issue:
    // https://github.com/dabroek/node-cache-manager-redis-store/issues/40
    CacheModule.register({ ttl: 600, max: 1000 }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class GithubModule {}
