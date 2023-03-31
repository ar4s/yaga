import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import corsConfig from './config/cors.config';
import githubConfig from './config/github.config';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    GithubModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [githubConfig, corsConfig],
    }),
  ],
  providers: [],
})
export class AppModule {}
