import { githubOrderChoices, githubSortChoices } from './constants';

export type FetchingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export type GithubSearchSort = typeof githubSortChoices[number];
export type GithubSearchOrder = typeof githubOrderChoices[number];

export interface GithubSorting {
  sort: GithubSearchSort;
  order: GithubSearchOrder;
}
