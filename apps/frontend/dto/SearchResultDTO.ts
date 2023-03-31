import { RepositoryDTO } from './RepositoryDTO';

export interface SearchResultDTO {
  total_count: number;
  items: RepositoryDTO[];
}
