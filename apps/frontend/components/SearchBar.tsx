import { observer } from 'mobx-react';
import React from 'react';

import { useQuery } from '@/hooks';

export const SearchBar: React.FC = observer(() => {
  // const [value, setValue] = useQuery();
  return (
    <div className="rounded-lg bg-white p-10 shadow-md">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          // value={value}
          // onChange={(e) => setValue(e.currentTarget.value)}
          className="w-full rounded-lg border border-gray-400 p-2"
          placeholder="tonik/theme"
        />
      </div>
    </div>
  );
});
