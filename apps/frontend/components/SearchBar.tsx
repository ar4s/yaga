import React, { useState } from 'react';

interface Props {
  query: string | null;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<Props> = ({ query, onSearch }) => {
  const [value, setValue] = useState(query || '');
  return (
    <div className="rounded-lg bg-white p-10 shadow-md">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          className="w-full rounded-lg border border-gray-400 p-2"
          placeholder="tonik/theme"
        />
        <button
          className="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          onClick={() => onSearch(value)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
