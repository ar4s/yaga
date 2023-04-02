import { RepositoryDTO } from '@/dto/RepositoryDTO';
import { useRootStore } from '@/stores';
import { FetchingState } from '@/types';

export const useRepositories = (): [RepositoryDTO[], FetchingState] => {
  const { githubStore } = useRootStore();
  const { repositories, state } = githubStore;

  return [repositories, state];
};
