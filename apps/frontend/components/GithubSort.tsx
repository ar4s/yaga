import { observer } from 'mobx-react';

import { useSort } from '@/hooks';
import { GithubSorting } from '@/types';

interface Props {
  field: GithubSorting['sort'];
}

const isActive = (
  field: GithubSorting['sort'],
  order: GithubSorting['order'],
  sorting: GithubSorting | null,
) => {
  if (sorting === null) {
    return false;
  }
  return sorting.sort === field && sorting.order === order;
};

export const GithubSort: React.FC<Props> = observer(({ field }) => {
  const [sorting, setSorting] = useSort();
  return (
    <span className="px-3">
      <button
        className={`ml-1 p-1 chevron ${
          isActive(field, 'desc', sorting) ? 'opacity-100' : 'opacity-30'
        } `}
        onClick={() => {
          setSorting({ sort: field, order: 'desc' });
        }}
      >
        &nbsp;
      </button>
      <button
        className={`mx-3 p-1 chevron bottom ${
          isActive(field, 'asc', sorting) ? 'opacity-100' : 'opacity-30'
        } `}
        onClick={() => setSorting({ sort: field, order: 'asc' })}
      >
        &nbsp;
      </button>
      {sorting && sorting.sort === field && sorting.order && (
        <button className="mr-1 p-1 remove" onClick={() => setSorting(null)}>
          &nbsp;
        </button>
      )}
    </span>
  );
});
