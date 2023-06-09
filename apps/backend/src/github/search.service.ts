import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { AxiosError } from 'axios';
import { Counter } from 'prom-client';
import { catchError, firstValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GithubSearchDTO } from './dto/GithubSearch.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectMetric('github_search_requests')
    private readonly metric: Counter<string>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectSentry() private readonly sentry: SentryService,
  ) {}

  private get requestHeaders() {
    return {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${this.configService.get('github.pat')}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  async searchRepository(
    query: string,
    sort?: string,
    order?: 'desc' | 'asc',
  ): Promise<GithubSearchDTO> {
    const params = new URLSearchParams();
    params.append('q', query);
    if (sort) params.append('sort', sort);
    if (order) params.append('order', order);

    this.sentry.log(`Searching for ${params.toString()}`);

    const { data, status } = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/search/repositories`, {
          headers: this.requestHeaders,
          params,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.sentry.error(`${error.response.data}`);
            this.metric.inc({ query, staus: error.response.status });
            throw new Error('Error searching for repository in GitHub');
          }),
        ),
    );
    this.metric.inc({ query, status });
    return data;
  }
}
