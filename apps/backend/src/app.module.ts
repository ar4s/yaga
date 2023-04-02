import { SentryModule } from '@ntegral/nestjs-sentry';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import corsConfig from './config/cors.config';
import githubConfig from './config/github.config';
import sentryConfig from './config/sentry.config';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    GithubModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [githubConfig, corsConfig, sentryConfig],
    }),
    PrometheusModule.register({
      defaultLabels: {
        host: process.env.HOSTNAME,
      },
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        dsn: cfg.get('sentry.dsn'),
        environment: cfg.get('sentry.environment'),
        logLevels: ['warn', 'error'],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
