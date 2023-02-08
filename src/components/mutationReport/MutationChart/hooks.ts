import { useLayoutEffect, useMemo, useState } from 'react';

import { useStore } from '@nanostores/react';

import { useMutationReportStores } from '@state/context';
import { TreeNode } from '@state/transformReport';
import { truthy } from '@utils/ts';

import * as d3 from 'd3';
import { flattenDeep } from 'lodash-es';

export type MutationSingleValue = d3.HierarchyCircularNode<TreeNode>;

export const useMutationChartData = (width: number, height: number) => {
  const tree = truthy(useStore(useMutationReportStores().treeStore));

  const hierarchy = useMemo(() => d3.hierarchy(tree).sum(() => 1), [tree]);

  const root = useMemo(() => {
    return d3
      .pack<TreeNode>()
      .size([width, height])
      .padding((node) => {
        // Top level padding between top-level rules
        if (!node.parent) return 90;

        // Making padding lower for rules that have nested rules
        // Making padding higher for rules that only have mutants
        return node.children?.every((n) => n.data.leaf) ? 100 : 30;
      })(hierarchy);
  }, [height, hierarchy, width]);

  const [view, setView] = useState<[number, number, number] | null>(null);
  useLayoutEffect(() => {
    if (!Number.isNaN(root.x)) setView([root.x, root.y, root.r * 2]);
  }, [root.r, root.x, root.y]);

  const k = width / (view?.[2] ?? 1) / 1.6;

  const flatRoot = useMemo(
    () =>
      flattenDeep(
        root
          .descendants()
          .slice(1)
          .map((v) => [v, v.children]),
      ).filter(Boolean) as MutationSingleValue[],
    [root],
  );

  return { flatRoot, root, k, view };
};

export const useHandleNodeClick = () => {
  const { selectedNodesStore, namesToNodesStore } = useMutationReportStores();

  const namesToNodes = useStore(namesToNodesStore);

  return useMemo(() => {
    let prevTrait: string | void, prevNode: MutationSingleValue | void;

    return (node: MutationSingleValue, exactName?: string) => {
      let trait: string;
      const firstName = exactName ?? truthy(node.data.name[0]);

      // Resetting previous choice
      if (node.data.leaf) {
        prevTrait = void 0;
        prevNode = void 0;

        trait = firstName;
      } else {
        // Setting initial value for selection
        if (prevNode !== node) {
          prevNode = node;
          prevTrait = trait = firstName;
        } else {
          const {
            data: { name },
          } = prevNode;
          const prevIndex = name.indexOf(prevTrait ?? '');

          let nextVal = name[prevIndex + 1];
          if (!nextVal) nextVal = firstName;

          prevTrait = trait = nextVal;
        }
      }
      selectedNodesStore.set({
        trait,
        nodes: node.data.name.flatMap((name) => {
          const cached = node.data.leaf
            ? namesToNodes?.mutants.get(name)
            : namesToNodes?.rules.get(name);
          return cached ?? [];
        }),
      });
    };
  }, [namesToNodes, selectedNodesStore]);
};
