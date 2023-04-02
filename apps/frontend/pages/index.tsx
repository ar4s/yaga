import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { SearchBar, SearchResult } from '@/components';
import { GithubProvider } from '@/stores';
import { isArray } from '@/utils';

export const config = {
  runtime: 'experimental-edge',
};

interface Props {
  query: string | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // TODO: consider to fetch repositories
  const { query } = context.query;

  if (isArray(query)) {
    throw new Error('Multiple query is not allowed!');
  }

  return {
    props: {
      query: query || null,
    },
  };
};

const Page: NextPage<Props> = ({ query }) => {
  return (
    <GithubProvider initialQuery={query}>
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
