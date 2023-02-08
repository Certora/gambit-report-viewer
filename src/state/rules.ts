import { isQueryInArr, simplifyString } from '@utils/string';

import { IRule, rulesStore } from './report';

import { atom, computed } from 'nanostores';

export const ruleNameToLabelStore = computed(
  rulesStore,
  (rules) => new Map(rules.map((r) => [r.name, r.short])),
);

export const rulesSearchInputStore = atom('');
const sanitizedSearchStore = computed(rulesSearchInputStore, simplifyString);

export const ruleListStore = computed(
  [rulesStore, sanitizedSearchStore],
  (rules, search) => {
    const success: IRule[] = [],
      fail: IRule[] = [];

    for (const rule of rules) {
      if (isQueryInArr([rule.name, rule.short], search)) {
        if (rule.caughtMutants.length) success.push(rule);
        else fail.push(rule);
      }
    }

    success.sort((a, b) => b.caughtMutants.length - a.caughtMutants.length);
    fail.sort((a, b) => a.num - b.num);

    return { success, fail, count: rules.length };
  },
);
