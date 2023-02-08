import { truthy } from '@utils/ts';

import { reportStore } from './rawReport';
import { toHierarchy, TreeNode } from './transformReport';

import { atom, onSet } from 'nanostores';

export const statsStore = atom<{
  caught: number;
  mutations: { all: number; caught: number };
  rules: { all: number; caught: number };
  solo: { all: number; caught: number };
} | void>();
export type TreeStoreValue = TreeNode;
export const treeStore = atom<TreeNode | void>();

type LabeledName = {
  short: string;
  name: string;
  nodes: TreeNode[];
};

export type IMutant = LabeledName & {
  diff?: string;
  link?: string;
  description?: string;
  caughtByRules: string[];
};
export const mutantsStore = atom<IMutant[]>([]);

export type IRule = LabeledName & { num: number; caughtMutants: string[] };
export const rulesStore = atom<IRule[]>([]);

export const namesToNodesStore = atom<{
  rules: Map<string, TreeNode[]>;
  mutants: Map<string, TreeNode[]>;
} | void>();

onSet(reportStore, ({ newValue: report }) => {
  if (!report) return;

  const tree = toHierarchy(report);
  treeStore.set(tree);

  const ruleNameToNodeMap = new Map<string, TreeNode[]>(),
    mutantNameToNodeMap = new Map<string, TreeNode[]>();

  const recordNodeIntoMaps = (node: TreeNode) => {
    if (node.leaf) {
      node.name.forEach((name) =>
        addKeyToMapArr(mutantNameToNodeMap, name, node),
      );
    } else {
      node.name.forEach((name) =>
        addKeyToMapArr(ruleNameToNodeMap, name, node),
      );
    }
    for (const child of node.children) {
      recordNodeIntoMaps(child);
    }
  };
  recordNodeIntoMaps(tree);
  namesToNodesStore.set({
    rules: ruleNameToNodeMap,
    mutants: mutantNameToNodeMap,
  });

  const mutants: IMutant[] = [];
  const ruleMap = new Map<string, IRule>();

  for (let patchI = 0; patchI < report.length; patchI++) {
    const {
      id,
      name: mutant,
      diff,
      description,
      link,
      rules,
    } = truthy(report[patchI]);

    const caughtByRules: string[] = [];

    for (let ruleI = 0; ruleI < rules.length; ruleI++) {
      const { name: rule, status } = truthy(rules[ruleI]);

      // Initializing the array only once
      if (patchI === 0) {
        ruleMap.set(rule, {
          num: ruleI + 1,
          short: `R${ruleI + 1}`,
          name: rule,
          caughtMutants: [],
          nodes: ruleNameToNodeMap.get(rule) ?? [],
        });
      }
      if (!status) {
        caughtByRules.push(rule);
        ruleMap.get(rule)?.caughtMutants.push(mutant);
      }
    }

    mutants.push({
      short: id,
      name: mutant,
      diff,
      description,
      link,
      caughtByRules,
      nodes: mutantNameToNodeMap.get(mutant) ?? [],
    });
  }

  mutantsStore.set(mutants);
  const rules = [...ruleMap.values()];
  rulesStore.set(rules);

  const mutantsCaughtCount = mutants.filter(
    (m) => m.caughtByRules.length,
  ).length;
  const caught = (mutantsCaughtCount / mutants.length) * 100;
  statsStore.set({
    caught,
    mutations: {
      all: mutants.length,
      caught: mutantsCaughtCount,
    },
    rules: {
      all: rules.length,
      caught: rules.filter((r) => r.caughtMutants.length).length,
    },
    solo: {
      all: mutantsCaughtCount,
      caught: mutants.filter((m) => m.caughtByRules.length === 1).length,
    },
  });
});

const addKeyToMapArr = <T>(m: Map<string, T[]>, key: string, addVal: T) => {
  let v = m.get(key);
  if (!v) {
    v = [addVal];
    m.set(key, v);
  } else v.push(addVal);
};
