import { isQueryInArr, simplifyString } from '@utils/string';

import { selectedNodesStore } from './chartSelection';
import { IMutant, mutantsStore } from './report';

import { atom, computed, onSet } from 'nanostores';

export const mutantNameToLabelStore = computed(
  mutantsStore,
  (rules) => new Map(rules.map((r) => [r.name, r.short])),
);

export const mutantSearchInputStore = atom('');
const sanitizedSearchStore = computed(mutantSearchInputStore, simplifyString);

export const mutantListStore = computed(
  [mutantsStore, sanitizedSearchStore],
  (mutants, search) => {
    const success: IMutant[] = [],
      fail: IMutant[] = [];

    for (const mutant of mutants) {
      if (isQueryInArr([`patch ${mutant.short}`, mutant.name], search)) {
        if (mutant.caughtByRules.length) success.push(mutant);
        else fail.push(mutant);
      }
    }

    success.sort((a, b) => a.short.localeCompare(b.short));
    fail.sort((a, b) => a.short.localeCompare(b.short));

    return { success, fail, count: mutants.length };
  },
);

export const openedDiffStore = atom<{
  show: boolean;
  trait: string;
  shortName: string;
  diff?: string;
  description?: string;
  link?: string;
} | void>();

onSet(selectedNodesStore, ({ newValue: { trait } }) => {
  const curr = openedDiffStore.get();
  if (curr?.show && curr.trait !== trait) {
    openedDiffStore.set({ ...curr, show: false });
  }
});
