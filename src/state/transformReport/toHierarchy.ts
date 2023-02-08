import type { MutantResults } from './types';

import { flatten, uniq } from 'lodash-es';

export const toHierarchy = (data: MutantResults) => {
  const root = new TreeNode(['']);

  const ruleNodesByName = new Map<string, TreeNode>();

  for (const { name: file, rules } of data) {
    for (const { name: rule, status } of rules) {
      if (status) continue;

      let node = ruleNodesByName.get(rule);
      if (!node) {
        node = new TreeNode([rule]);
        node.parent = root;
        root.children.push(node);
        ruleNodesByName.set(rule, node);
      }

      node.children.push(new TreeNode([file]));
    }
  }

  return simplifyTree(root);
};

export class TreeNode {
  parent: TreeNode | null = null;
  children: TreeNode[] = [];

  /**
   * @param name This parameter serves two puposes:
   * 1. for rules it's an array of rule names for this node
   * 2. for leaf nodes—mutants—it's mutant's name. Always one item
   */
  constructor(public name: string[]) {}

  get root() {
    return !this.parent;
  }
  get leaf() {
    return !this.children.length;
  }

  hasSameEndNodes(endNodes: TreeNode) {
    const children = this.flattenedEndNodes();
    return endNodes.flattenedEndNodes().every((v) => children.includes(v));
  }

  changeParent(newParent: TreeNode) {
    // Removing ourselves from children in previous parent
    if (this.parent) {
      this.parent.children = this.parent.children.filter((v) => v !== this);
    }

    this.parent = newParent;

    // Removing _shared_ children from new parent
    const currentLeafNames = this.children.map((v) =>
      v.leaf ? v.name[0] : void 0,
    );
    newParent.children = newParent.children.filter((v) =>
      v.leaf ? !currentLeafNames.includes(v.name[0]) : true,
    );
    newParent.children.push(this);
  }

  flattenedEndNodes(): string[] {
    return uniq(
      flatten(
        this.children.map((v) => (v.leaf ? v.name : v.flattenedEndNodes())),
      ),
    );
  }

  toJSON() {
    return { name: this.name, children: this.children };
  }
}

/**
 * This recieves a very scarse TreeNode with lots of repeats of patch names.
 * What this function tries to achieve is to find common parents between
 * branches. If it finds them, it combines them.
 */
function simplifyTree(parent: TreeNode): TreeNode {
  const children = parent.children;

  // Only one child that is a TreeNode itself: we can collapse those into one node
  // with two names
  if (
    !parent.root &&
    children.length === 1 &&
    children[0] &&
    !children[0].leaf
  ) {
    const collapsingChild = children[0];
    parent.name.push(...collapsingChild.name);
    parent.children = collapsingChild.children;

    return simplifyTree(parent);
  }

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    // Sanity check
    if (!child || child.leaf) continue;

    // We already moved this child somewhere during previous cycles,
    // we'll get back to it later
    if (child.parent !== parent) {
      continue;
    }

    for (let k = i + 1; k < children.length; k++) {
      const nestedChild = children[k];

      if (!nestedChild || nestedChild.leaf) continue;

      // We have the same deep children, we should move merge them
      if (child.hasSameEndNodes(nestedChild)) {
        nestedChild.changeParent(child);
      }
    }

    const firstNodeChild = child.children.find((v) => !v.leaf);
    if (firstNodeChild) {
      simplifyTree(child);
    }
  }

  // FIXME: we really shouldn't be doing it. Need to find a way
  // of setting it without additional tree traversal
  const fixParents = (node: TreeNode) => {
    for (const child of node.children) {
      if (child.parent !== node) {
        child.parent = node;
      }
      fixParents(child);
    }
  };
  fixParents(parent);

  return parent;
}
