import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedHarEntry } from '../har-management/har.state';

export const DetailsComponent: FC = () => {
  const selectedEntry = useRecoilValue(selectedHarEntry);

  if (!selectedEntry) {
    return <div />;
  }

  return <div>{selectedEntry.request.url}</div>;
};
