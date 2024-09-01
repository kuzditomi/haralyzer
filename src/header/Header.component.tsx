import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { filtersState } from './filters.state';
import './header.scss';

export const HeaderComponent: FC = () => {
  const [filters, setFilters] = useRecoilState(filtersState);

  return (
    <header>
      <input
        type="text"
        value={filters.query}
        onChange={(e) => {
          setFilters({ ...filters, query: e.target.value });
        }}
      />
    </header>
  );
};
