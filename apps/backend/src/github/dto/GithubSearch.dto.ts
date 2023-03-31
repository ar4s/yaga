import { GithubRepositoryDTO } from './GithubRepository.dto';

export interface GithubSearchDTO {
  total_count: number;
  items: GithubRepositoryDTO[];
}
