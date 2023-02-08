import { FC } from 'react';

import { useStore } from '@nanostores/react';

import { GenericList } from '@cmp/mutationReport/GenericList';
import {
  mutantListStore,
  mutantSearchInputStore,
  openedDiffStore,
} from '@state/mutants';
import { truthy } from '@utils/ts';

import { _bold, _underlined } from './MutantList.css';

import clsx from 'clsx';

export const MutantList: FC<unknown> = () => {
  const mutants = useStore(mutantListStore);
  const diff = useStore(openedDiffStore);
  const SuccessTitle = (
    <span>
      <span className={_bold}>{mutants.success.length}</span> Caught
    </span>
  );
  const FailTitle = (
    <span>
      <span className={_bold}>{mutants.fail.length}</span> Uncaught
    </span>
  );
  return (
    <GenericList
      searchInputStore={mutantSearchInputStore}
      tabTitle={`${mutants.count} Mutants`}
      data={mutants}
      successTitle={SuccessTitle}
      getSuccessItemInfo={(item) => (
        <span className={clsx(_bold, diff?.trait === item.name && _underlined)}>
          Patch {item.short}
        </span>
      )}
      failTitle={FailTitle}
      getFailItemInfo={(item) => (
        <span
          className={clsx(_bold, diff?.trait === item.name ? _underlined : '')}
        >
          Patch {item.short}
        </span>
      )}
      itemClickFn={(item) => {
        openedDiffStore.set({
          shortName: item.short,
          description: item.description,
          link: item.link,
          diff: truthy(item.diff),
          trait: item.name,
          show: true,
        });
      }}
      failAsButton
    />
  );
};
