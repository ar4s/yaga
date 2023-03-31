import { useQuery } from '@tanstack/react-query';

import { apiClient } from './apiClient';

export const useRepositories = (query: string | null) => {
  const repositories = useQuery({
    queryKey: ['repositories', query],
    queryFn: () => apiClient.search(query),
  });
  return repositories;
};
