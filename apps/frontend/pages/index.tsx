import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { SearchBar, SearchResult } from '@/components';
import { githubOrderChoices, githubSortChoices } from '@/constants';
import { GithubProvider } from '@/stores';
import { GithubSearchOrder, GithubSearchSort, GithubSorting } from '@/types';
import { isArray, isGithubOrderChoices, isGithubSortChoices } from '@/utils';

export const config = {
  runtime: 'experimental-edge',
};

interface Props {
  query: string | null;
  sort: GithubSearchSort | null;
  order: GithubSearchOrder | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // TODO: fetch repositories
  const { query, sort, order } = context.query;

  if (isArray(query)) {
    throw new Error('Multiple query is not allowed!');
  }

  if (isArray(sort)) {
    throw new Error('Multiple sort is not allowed!');
  }

  if (sort && !isGithubSortChoices(sort)) {
    throw new Error(`Invalid sort field! Hint: use ${githubSortChoices.join(', ')}`);
  }

  if (order && !isGithubOrderChoices(order)) {
    throw new Error(`Invalid order field! Hint: use ${githubOrderChoices.join(', ')}`);
  }

  return {
    props: {
      query: query || null,
      sort: (sort as GithubSearchSort) || null,
      order: (order as GithubSearchOrder) || null,
    },
  };
};

const Page: NextPage<Props> = ({ query, sort }) => {
  return (
    <GithubProvider initialQuery={query} initialSort={sort}>
      <Head>
        <title>YAGA - Yet Another Github App</title>
      </Head>
      <header className="py-10">
        <div className="container mx-auto">
          <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            YAGA - Yet Another Github App
          </h1>
        </div>
      </header>
      <main className="py-10">
        <div className="container mx-auto">
          <SearchBar />
          <div className="mt-10">
            <SearchResult />
          </div>
        </div>
      </main>
    </GithubProvider>
  );
};
export default Page;
