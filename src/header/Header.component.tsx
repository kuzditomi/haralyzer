import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { filtersState } from './filters.state';
import './header.scss';
import { parseHar } from '../har-management/har-import';
import { harState } from '../har-management/har.state';

export const HeaderComponent: FC = () => {
  const [filters, setFilters] = useRecoilState(filtersState);
  const [, setHar] = useRecoilState(harState);
  const [hasError, setHasError] = useState(false);

  const loadFile = async (files: FileList) => {
    if (files.length != 1) {
      return;
    }

    try {
      setHasError(false);
      const harFile = await parseHar(files[0]);
      setHar(harFile);
    } catch {
      setHasError(true);
    }
  };

  return (
    <header>
      <div>
        <input
          type="file"
          onChange={(e) => e.target.files && loadFile(e.target.files)}
        />
        <input
          type="text"
          value={filters.query}
          onChange={(e) => {
            setFilters({ ...filters, query: e.target.value });
          }}
        />
      </div>
      {hasError && (
        <div>
          <p className="error">Error loading .har file</p>
        </div>
      )}
    </header>
  );
};
