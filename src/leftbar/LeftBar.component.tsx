import { FC } from 'react';
import './leftbar.scss';
import { useRecoilValue } from 'recoil';
import { harEntries } from '../har-management/har.state';
import { EntryComponent } from './Entry.component';

export const LeftBarComponent: FC = () => {
  const entries = useRecoilValue(harEntries);

  return (
    <aside>
      {(entries || []).map((entry) => (
        <EntryComponent entry={entry} />
      ))}
    </aside>
  );
};
