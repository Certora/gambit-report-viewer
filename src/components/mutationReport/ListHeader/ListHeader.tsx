import { FC } from 'react';

import { _header, _tabTitle } from './ListHeader.css';

type Props = {
  tabTitle: string | undefined;
};

export const ListHeader: FC<Props> = ({ tabTitle }) => {
  return (
    <p className={_header}>
      <span className={_tabTitle}>{tabTitle}</span>
    </p>
  );
};
