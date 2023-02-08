import { Search } from 'carbon-components-react';

import { useStore } from '@nanostores/react';

import { ListHeader } from '@cmp/mutationReport/ListHeader';
import { selectedNodesStore } from '@state/chartSelection';
import { useMutationReportStores } from '@state/context';
import { TreeNode } from '@state/transformReport';

import {
  _button,
  _buttonText,
  _hr,
  _item,
  _list,
  _listsWrapper,
  _root,
  _ruleToggle,
  _searchRoot,
  _tileTitle,
} from './GenericList.css';

import clsx from 'clsx';
import { WritableAtom } from 'nanostores';

type StateType = 'active' | 'usual' | 'selected';

type Props<T> = {
  tabTitle: string;
  searchInputStore: WritableAtom<string>;
  data: {
    success: T[] | T[];
    fail: T[] | T[];
    count: number;
  };
  itemClickFn?: (item: T) => void;
  successTitle: JSX.Element;
  getSuccessItemInfo: (item: T) => JSX.Element;
  failTitle: JSX.Element;
  getFailItemInfo: (item: T) => JSX.Element;
  failAsButton?: boolean;
};

export function GenericList<T extends { name: string; nodes: TreeNode[] }>({
  tabTitle,
  searchInputStore,
  data,
  itemClickFn,
  successTitle,
  getSuccessItemInfo,
  failTitle,
  getFailItemInfo,
  failAsButton,
}: Props<T>) {
  const { selectionSetupStore } = useMutationReportStores();
  const selection = useStore(selectionSetupStore);
  const getStateFromBools = (selected: boolean, active: boolean): StateType =>
    selected ? 'selected' : active ? 'active' : 'usual';

  const isSelected = (item: T) =>
    selection.selected.some((node) => item.nodes.includes(node));
  const isActive = (item: T) =>
    selection.active.some((node) => item.nodes.includes(node)) ||
    isSelected(item);
  const onItemClick = (item: T) => {
    selectedNodesStore.set({ nodes: item.nodes, trait: item.name });
    itemClickFn?.(item);
  };

  return (
    <div className={_root}>
      <ListHeader tabTitle={tabTitle} />
      <div className={_listsWrapper}>
        <div className={_searchRoot}>
          <Search
            size="sm"
            labelText="Search input text"
            placeholder="Search input text"
            defaultValue={useStore(searchInputStore)}
            onChange={(event) => searchInputStore.set(event.target.value)}
          />
        </div>

        <p className={_tileTitle}>{successTitle}</p>

        <div className={_list}>
          {data.success.map((item, i) => {
            const selected = item.name === selection.trait && isSelected(item);
            const active = isActive(item);
            const state: StateType = getStateFromBools(selected, active);
            return (
              <button
                key={i}
                className={_button[state]}
                onClick={() => onItemClick(item)}
              >
                <span className={clsx(_item, _buttonText[state])}>
                  {getSuccessItemInfo(item)}
                </span>
              </button>
            );
          })}
        </div>

        <hr className={_hr} />

        <p className={_tileTitle}>{failTitle}</p>

        <div className={_list}>
          {data.fail.map((item, i) => {
            const selected = item.name === selection.trait;
            const active = isActive(item);
            const state: StateType = getStateFromBools(selected, active);
            if (failAsButton) {
              return (
                <button
                  key={i}
                  className={_button[state]}
                  onClick={() => onItemClick(item)}
                >
                  <span className={clsx(_item, _buttonText[state])}>
                    {getFailItemInfo(item)}
                  </span>
                </button>
              );
            } else {
              return (
                <p key={i} className={_ruleToggle}>
                  <span className={_item}>{getFailItemInfo(item)}</span>
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
