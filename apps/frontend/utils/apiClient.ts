import axios from 'axios';
import { SearchResultDTO } from 'contract';

import { GithubSorting } from '@/types';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export const apiClient = {
  search: async (
    query: string | null,
    field?: GithubSorting['sort'],
    order?: GithubSorting['order'],
  ) => {
    if (query === null) return Promise.resolve(null);
    const response = http.get('/search', { params: { query, field, order } });
    return (await response).data as unknown as SearchResultDTO;
  },
};
