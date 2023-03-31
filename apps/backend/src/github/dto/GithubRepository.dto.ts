export interface GithubRepositoryDTO {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
  created_at: string;
}
