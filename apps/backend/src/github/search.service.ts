import { catchError, firstValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GithubSearchDTO } from './dto/GithubSearch.dto';

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

  async searchRepository(query: string): Promise<GithubSearchDTO> {
    this.logger.log(`Searching for ${query}`);
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/search/repositories?q=${query}`, {
          headers: this.requestHeaders,
        })
        .pipe(
          catchError((error: any) => {
            this.logger.error(error.response.data);
            throw new Error('Error searching for repository in GitHub');
          }),
        ),
    );

    return data;
  }
}
