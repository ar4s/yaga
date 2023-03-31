import { Exclude, Expose } from 'class-transformer';
import { RepositoryDTO } from 'contract';

import { GithubRepositoryDTO } from '../dto/GithubRepository.dto';

@Exclude()
export class Repository implements RepositoryDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  full_name: string;

  @Expose()
  owner: string;

  @Expose()
  stars: number;

  @Expose()
  created_at: string;

  constructor(data: GithubRepositoryDTO) {
    this.id = data.id;
    this.name = data.name;
    this.full_name = data.full_name;
    this.owner = data.owner.login;
    this.stars = data.stargazers_count;
    this.created_at = data.created_at;
  }
}
