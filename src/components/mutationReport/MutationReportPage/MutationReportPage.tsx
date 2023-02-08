import { FC } from 'react';

import { useStore } from '@nanostores/react';

import { MutantList } from '@cmp/mutationReport/MutantList';
import { MutationChart } from '@cmp/mutationReport/MutationChart';
import { Patch } from '@cmp/mutationReport/Patch';
import { RuleList } from '@cmp/mutationReport/RuleList';
import { Stats } from '@cmp/Stats';
import { useMutationReportStores } from '@state/context';
import { truthy } from '@utils/ts';

import {
  _center,
  _left,
  _mutantList,
  _patch,
  _root,
  _top,
} from './MutationReportPage.css';

type Props = unknown;

export const MutationReportPage: FC<Props> = () => {
  return (
    <div className={_root}>
      <div className={_top}>
        <ReportStats />
      </div>
      <div className={_left}>
        <RuleList />
      </div>
      <div className={_center}>
        <MutationChart />
      </div>
      <div className={_patch}>
        <Patch />
      </div>
      <div className={_mutantList}>
        <MutantList />
      </div>
    </div>
  );
};

function caughtToTile({ all, caught }: { all: number; caught: number }) {
  return { main: caught, secondary: `/ ${all}` };
}
const ReportStats: FC = () => {
  const { rules, solo, mutations, caught } = truthy(
    useStore(useMutationReportStores().statsStore),
  );

  return (
    <Stats
      tiles={[
        { text: 'Coverage', main: caught.toFixed(0), secondary: ' %' },
        { text: 'Caught Mutations', ...caughtToTile(mutations) },
        { text: 'Rules', ...caughtToTile(rules) },
        { text: 'Solo Rules', ...caughtToTile(solo) },
      ]}
    />
  );
};
