import { useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { SearchBar, SearchResult } from '@/components';
import { isArray, useRepositories } from '@/utils';

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

const Page: NextPage<Props> = ({ query: initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);

  return (
    <>
      <header className="py-10">
        <div className="container mx-auto">
          <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            YAGA - Yet Another Github App
          </h1>
        </div>
      </header>
      <main className="py-10">
        <div className="container mx-auto">
          <SearchBar query={query} onSearch={setQuery} />
          <div className="mt-10">
            <SearchResult query={query} />
          </div>
        </div>
      </main>
    </>
  );
};
export default Page;
