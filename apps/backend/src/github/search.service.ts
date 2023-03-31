import { catchError, firstValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private get requestHeaders() {
    return {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${this.configService.get('github.pat')}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  async searchRepository(query: string) {
    return {
      total_count: 2,
      incomplete_results: false,
      items: [
        {
          id: 418327088,
          node_id: 'MDU6TGFiZWw0MTgzMjcwODg=',
          url: 'https://api.github.com/repos/octocat/linguist/labels/enhancement',
          name: 'enhancement',
          color: '84b6eb',
          default: true,
          description: 'New feature or request.',
          score: 1,
        },
        {
          id: 418327086,
          node_id: 'MDU6TGFiZWw0MTgzMjcwODY=',
          url: 'https://api.github.com/repos/octocat/linguist/labels/bug',
          name: 'bug',
          color: 'ee0701',
          default: true,
          description: "Something isn't working.",
          score: 1,
        },
      ],
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/search/repositories?q=${query}`, {
          headers: this.requestHeaders,
        })
        .pipe(
          catchError((error: any) => {
            this.logger.error(error.response.data);
            throw new Error('Error');
          }),
        ),
    );

    return data;
  }
}
