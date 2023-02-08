import { createContext, useContext } from 'react';

import { selectedNodesStore, selectionSetupStore } from './chartSelection';
import {
  mutantListStore,
  mutantNameToLabelStore,
  mutantSearchInputStore,
  openedDiffStore,
} from './mutants';
import { reportStore } from './rawReport';
import {
  mutantsStore,
  namesToNodesStore,
  rulesStore,
  statsStore,
  treeStore,
} from './report';
import {
  ruleListStore,
  ruleNameToLabelStore,
  rulesSearchInputStore,
} from './rules';

const storesContextDefault = {
  reportStore,

  treeStore,
  statsStore,
  mutantsStore,
  rulesStore,
  namesToNodesStore,

  ruleNameToLabelStore,
  rulesSearchInputStore,
  ruleListStore,

  mutantNameToLabelStore,
  mutantSearchInputStore,
  mutantListStore,
  openedDiffStore,

  selectedNodesStore,
  selectionSetupStore,
};
export const MutationReportContext = createContext(storesContextDefault);
export const useMutationReportStores = () => useContext(MutationReportContext);
export type IMutationReportProvider = Partial<
  IContextValue<typeof MutationReportContext>
>;
