import { observer } from 'mobx-react';
import React from 'react';

import { useRepositories } from '@/hooks';

export const SearchResult: React.FC = observer(() => {
  const [repositories, state] = useRepositories();

  if (state === 'loading') {
    return <div>Loading...</div>;
  }

  if (state === 'failed') {
    return <div>Error!</div>;
  }

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
          {repositories.map((v) => (
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
});
