import { PrometheusModule } from '@willsoto/nestjs-prometheus';

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
    PrometheusModule.register(),
  ],
  providers: [],
})
export class AppModule {}
