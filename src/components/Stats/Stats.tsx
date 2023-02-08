import { FC, ReactNode } from 'react';

import { SkeletonPlaceholder, Tile } from 'carbon-components-react';

import {
  _mainMetric,
  _root,
  _secondaryMetric,
  _skeletonPlaceholder,
  _tile,
} from './Stats.css';

type Props = {
  loading?: boolean;
  tiles: { text: string; main: ReactNode; secondary?: ReactNode }[];
};

export const Stats: FC<Props> = ({ loading, tiles }) => {
  return (
    <div className={_root}>
      {tiles.map(({ text, main, secondary }) => (
        <Tile key={text} className={_tile}>
          {loading ? (
            <SkeletonPlaceholder className={_skeletonPlaceholder}>
              <p>
                <span className={_mainMetric}>hidden</span>
              </p>
            </SkeletonPlaceholder>
          ) : (
            <p>
              <span className={_mainMetric}>{main}</span>
              {secondary && (
                <span className={_secondaryMetric}>{secondary}</span>
              )}
            </p>
          )}
          <p>{text}</p>
        </Tile>
      ))}
    </div>
  );
};
