import { FC } from 'react';

import './entry.scss';
import { selectedEntryIdState } from '../har-management/har.state';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { EntryWithId } from '../har-management/har-import';

export const EntryComponent: FC<{ entry: EntryWithId }> = ({ entry }) => {
  const [selectedEntryId, setSelectedEntryId] =
    useRecoilState(selectedEntryIdState);

  return (
    <div
      className={classNames('entry', { selected: selectedEntryId == entry.id })}
      title={entry.request.url}
      onClick={() => {
        setSelectedEntryId(entry.id);
      }}
    >
      {entry.request.url}
    </div>
  );
};
