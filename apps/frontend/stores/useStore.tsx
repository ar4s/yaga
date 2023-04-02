import { useLocalObservable } from 'mobx-react';
import { createContext, useContext } from 'react';

import { RootStore } from './root';
import { GithubSearchSort } from '@/types';

const RootStoreContext = createContext<RootStore | null>(null);

type Props = {
  initialQuery: string | null;
  initialSort: GithubSearchSort | null;
  children?: React.ReactNode;
};

export const GithubProvider: React.FC<Props> = ({ children, initialQuery, initialSort }) => {
  const store = useLocalObservable(() => new RootStore(initialQuery, initialSort));

  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = () => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error('RootStore is not provided!');
  }

  return store;
};
