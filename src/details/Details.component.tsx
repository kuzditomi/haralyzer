import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedHarEntry } from '../har-management/har.state';
import './details.scss';
import classNames from 'classnames';

export const DetailsComponent: FC = () => {
  const entry = useRecoilValue(selectedHarEntry);

  if (!entry) {
    return <div />;
  }

  return (
    <div className="details">
      <div className="request">
        <h3>Request</h3>
        <p>{entry.request.url}</p>

        <h3>Headers</h3>
        <ul>
          {entry.request.headers.map((header) => (
            <li>
              <label>{header.name}:</label>
              <p>{header.value}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="response">
        <h3>Response</h3>
        <p
          className={classNames({
            success: entry.response.status < 300,
            warn: entry.response.status >= 300 && entry.response.status < 400,
            error: entry.response.status > 400,
          })}
        >
          {entry.response.status}
          {entry.response.statusText ? ' - ' + entry.response.statusText : ''}
        </p>

        <h3>Body</h3>
        <pre>{JSON.stringify(entry.response.content, null, 2)}</pre>
      </div>
    </div>
  );
};
