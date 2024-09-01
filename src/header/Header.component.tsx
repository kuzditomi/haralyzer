import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { filtersState } from './filters.state';
import './header.scss';
import { parseHar } from '../har-management/har-import';
import { harState } from '../har-management/har.state';

export const HeaderComponent: FC = () => {
  const [queryValue, setQueryValue] = useState('');

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

  // debouncing query
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setFilters({
        ...filters,
        query: queryValue,
      });
    }, 300);

    return () => clearTimeout(delayInputTimeoutId);
  }, [filters, queryValue, setFilters]);

  return (
    <header>
      <div>
        <input
          type="file"
          onChange={(e) => e.target.files && loadFile(e.target.files)}
        />
        <input
          type="text"
          value={queryValue}
          onChange={(e) => {
            setQueryValue(e.target.value);
          }}
        />
        <label>
          Errors only:{' '}
          <input
            type="checkbox"
            checked={filters.errorsOnly}
            onChange={(e) => {
              setFilters({
                ...filters,
                errorsOnly: e.target.checked,
              });
            }}
          />
        </label>
        <label>
          Relevant only:{' '}
          <input
            type="checkbox"
            checked={filters.relevantOnly}
            onChange={(e) => {
              setFilters({
                ...filters,
                relevantOnly: e.target.checked,
              });
            }}
          />
        </label>
        <label>
          XHR only:{' '}
          <input
            type="checkbox"
            checked={filters.xhrOnly}
            onChange={(e) => {
              setFilters({
                ...filters,
                xhrOnly: e.target.checked,
              });
            }}
          />
        </label>
      </div>
      {hasError && (
        <div>
          <p className="error">Error loading .har file</p>
        </div>
      )}
    </header>
  );
};
