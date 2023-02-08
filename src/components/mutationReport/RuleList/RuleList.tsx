import { FC } from 'react';

import { useStore } from '@nanostores/react';

import { GenericList } from '@cmp/mutationReport/GenericList';
import { ruleListStore, rulesSearchInputStore } from '@state/rules';

import { _bold } from './RuleList.css';

export const RuleList: FC<unknown> = () => {
  const rules = useStore(ruleListStore);
  const SuccessTitle = (
    <span>
      <span className={_bold}>{rules.success.length}</span> Successful
    </span>
  );
  const FailTitle = (
    <span>
      <span className={_bold}>{rules.fail.length}</span> Unsuccessful
    </span>
  );
  return (
    <GenericList
      searchInputStore={rulesSearchInputStore}
      tabTitle={`${rules.count} Rules`}
      data={rules}
      successTitle={SuccessTitle}
      getSuccessItemInfo={(item) => (
        <span className={_bold}>
          {item.short} ({item.caughtMutants.length}) — {item.name}
        </span>
      )}
      failTitle={FailTitle}
      getFailItemInfo={(item) => (
        <span>
          {item.short} — {item.name}
        </span>
      )}
    />
  );
};
