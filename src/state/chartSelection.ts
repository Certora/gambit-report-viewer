import type { TreeNode } from './transformReport';

import { atom, computed } from 'nanostores';

export const selectedNodesStore = atom<{ nodes: TreeNode[]; trait?: string }>({
  nodes: [],
});

export const selectionSetupStore = computed(
  selectedNodesStore,
  ({ nodes, trait }) => {
    if (nodes.some((n) => n.root)) {
      return { selected: [] as TreeNode[], active: [] as TreeNode[] };
    }

    const active: TreeNode[] = [];

    for (const node of nodes) {
      if (node.leaf) {
        // Mutant is selected, we activate all rules above
        let ruleNode = node.parent;
        while (ruleNode) {
          active.push(ruleNode);
          ruleNode = ruleNode.parent;
        }
      } else {
        // Rule is selected, we activate all mutants below
        const handleNode = (node: TreeNode) => {
          if (node.leaf) {
            active.push(node);
          } else {
            for (const child of node.children) {
              handleNode(child);
            }
          }
        };
        handleNode(node);
      }
    }

    return { selected: nodes, active, trait };
  },
);
