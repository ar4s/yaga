import debounce from 'lodash/debounce';
import { action, makeObservable, observable, reaction } from 'mobx';

import { RootStore } from './root';
import { RepositoryDTO } from '@/dto/RepositoryDTO';
import { FetchingState, GithubSearchSort, GithubSorting } from '@/types';
import { apiClient } from '@/utils';

export class GithubStore {
  rootStore: RootStore;

  query: string = '';
  state: FetchingState = 'idle';
  sorting: GithubSorting | null = null;
  repositories: RepositoryDTO[] = [];

  constructor(rootStore: RootStore, query: string, sort: GithubSearchSort | null) {
    this.query = query;
    this.sorting = sort ? { sort, order: 'desc' } : null;
    this.fetchRepositories();

    this.rootStore = rootStore;
    makeObservable(this, {
      query: observable,
      state: observable,
      sorting: observable,
      setState: action.bound,
      setQuery: action.bound,
      setSorting: action.bound,
      fetchRepositories: action.bound,
    });
    reaction(
      () => this.query,
      debounce((value, previousValue) => {
        if (value === previousValue) return;
        if (value === '') return;
        this.rootStore.browserStore.setQueryParam(value);
        if (this.state !== 'loading') {
          this.fetchRepositories();
        }
      }, 750),
    );
    reaction(
      () => this.sorting,
      (value) => {
        console.log(value?.sort);

        this.rootStore.browserStore.setSortParam(value?.sort);
        this.rootStore.browserStore.setOrderParam(value?.order);
        this.fetchRepositories();
      },
    );
  }

  setState(state: FetchingState) {
    this.state = state;
  }

  setQuery(query: string) {
    this.query = query;
  }

  setSorting(sorting: GithubSorting | null) {
    this.sorting = sorting;
  }

  fetchRepositories() {
    if (this.query === '') return;

    this.setState('loading');
    apiClient.search(this.query, this.sorting?.sort, this.sorting?.order).then(
      action((response) => {
        response && (this.repositories = response.items);
        this.setState('succeeded');
      }),
      action((error) => {
        console.error(error);
        this.setState('failed');
      }),
    );
  }
}
