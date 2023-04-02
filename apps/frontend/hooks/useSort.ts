import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useRootStore } from '@/stores';
import { GithubSorting } from '@/types';

export const useSort = (): [GithubSorting | null, (sort: GithubSorting | null) => void] => {
  const { githubStore } = useRootStore();
  const { sorting, setSorting } = githubStore;

  return [sorting, setSorting];
};
