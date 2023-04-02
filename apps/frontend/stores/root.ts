import { BrowserStore } from './browser';
import { GithubStore } from './github';
import { GithubSearchSort } from '@/types';

export class RootStore {
  githubStore: GithubStore;
  browserStore: BrowserStore;

  constructor(query: string | null, sort: GithubSearchSort | null) {
    this.githubStore = new GithubStore(this, query || '', sort);
    this.browserStore = new BrowserStore(this);
  }
}
