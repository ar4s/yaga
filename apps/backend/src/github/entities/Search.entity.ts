import { SearchResultDTO } from 'contract';

import { Repository } from './Repository.entity';

export class Search implements SearchResultDTO {
  total_count: number;
  items: Repository[];

  constructor(data: Search) {
    Object.assign(this, data);
  }
}
