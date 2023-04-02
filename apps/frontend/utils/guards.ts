import { githubOrderChoices, githubSortChoices } from '@/constants';
import { GithubSearchOrder, GithubSearchSort } from '@/types';

export const isArray = (value: any): value is any[] => {
  return typeof value === 'object' && value.length > 0;
};

export const isGithubSortChoices = (value: any): value is GithubSearchSort => {
  return githubSortChoices.includes(value);
};

export const isGithubOrderChoices = (value: any): value is GithubSearchOrder => {
  return githubOrderChoices.includes(value);
};
