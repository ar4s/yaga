import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useRootStore } from '@/stores';

export const useQuery = (): [string, Dispatch<SetStateAction<string>>] => {
  const { githubStore } = useRootStore();
  const { query, setQuery } = githubStore;
  const [value, setValue] = useState(query);

  useEffect(() => {
    if (query === value) return;
    setQuery(value);
  }, [query, value, setQuery]);

  return [value, setValue];
};
