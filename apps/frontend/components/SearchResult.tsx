import React from 'react';

import { useRepositories } from '@/utils';

interface Props {
  query: string | null;
}

export const SearchResult: React.FC<Props> = ({ query }) => {
  const repositories = useRepositories(query);

  if (repositories.isLoading) return <div>Loading...</div>;
  if (repositories.isError) return <div>Error! </div>;

  console.log(repositories.data);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Owner
            </th>
            <th scope="col" className="px-6 py-3">
              Stars
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
          </tr>
        </thead>
        <tbody>
          {repositories.data?.items.map((v) => (
            <tr key={v.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {v.name}
              </th>
              <td className="px-6 py-4">{v.owner}</td>
              <td className="px-6 py-4">{v.stars}</td>
              <td className="px-6 py-4">{v.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
