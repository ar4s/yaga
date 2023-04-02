import { action, makeObservable } from 'mobx';

import { RootStore } from './root';

const URL_PARAM_QUERY_KEY = 'query';
const URL_PARAM_SORT_KEY = 'sort';
const URL_PARAM_ORDER_KEY = 'order';

const getParam = (key: string): string => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key) || '';
};

const setParam = (param: string, value: string | null | undefined) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (value !== null && value !== undefined) {
    searchParams.set(param, value);
  } else {
    searchParams.delete(param);
  }
  history.pushState(null, '', window.location.pathname + '?' + searchParams.toString());
};

export class BrowserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      setQueryParam: action,
    });
  }

  get queryParam(): string {
    return getParam(URL_PARAM_QUERY_KEY);
  }

  get sortParam(): string {
    return getParam(URL_PARAM_SORT_KEY);
  }

  get orderParam() {
    return getParam(URL_PARAM_ORDER_KEY);
  }

  setQueryParam(query: string) {
    setParam(URL_PARAM_QUERY_KEY, query);
  }

  setSortParam(sort: string | null | undefined) {
    setParam(URL_PARAM_SORT_KEY, sort);
  }
  setOrderParam(order: string | null | undefined) {
    setParam(URL_PARAM_ORDER_KEY, order);
  }
}
