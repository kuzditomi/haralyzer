import { FC } from 'react';
import './leftbar.scss';
import { useRecoilValue } from 'recoil';
import { filteredHarEntries } from '../har-management/har.state';
import { EntryComponent } from './Entry.component';

export const LeftBarComponent: FC = () => {
  const entries = useRecoilValue(filteredHarEntries);

  return (
    <aside>
      {(entries || []).map((entry) => (
        <EntryComponent entry={entry} key={entry.id} />
      ))}
    </aside>
  );
};
