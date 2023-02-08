// Disable eslint import-sort rule because we need to import Prism before any prismjs plugins
// eslint-disable-next-line simple-import-sort/imports
import Prism from 'prismjs';
import { FC, useEffect, useRef } from 'react';

import { Button, CodeSnippet } from 'carbon-components-react';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStore } from '@nanostores/react';

import { ListHeader } from '@cmp/mutationReport/ListHeader';
import { useMutationReportStores } from '@state/context';
import { useRandomId } from '@utils/string';

import 'prismjs/components/prism-diff';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight';
import 'prismjs/components/prism-solidity';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

import styles from './Patch-diff-theme.module.scss';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import {
  _closePatch,
  _fakeHeader,
  _header,
  _icon,
  _link,
  _panel,
  _root,
} from './Patch.css';

import clsx from 'clsx';
import { AnimationSettings, Presence } from '@cmp/Presence';
import { truthy } from '@utils/ts';

export const Patch: FC<unknown> = () => {
  const { openedDiffStore } = useMutationReportStores();
  const diff = useStore(openedDiffStore);
  const uniqueClass = useRandomId();

  const patchEnter: AnimationSettings = [
    { opacity: 1, transform: 'translateX(0)' },
    { duration: 0.3, easing: 'ease-in-out' },
  ];
  const patchExit: AnimationSettings = [
    { opacity: 0, transform: 'translateX(50%)' },
    { duration: 0.3, easing: 'ease-in-out' },
  ];

  return (
    <Presence
      show={diff?.show}
      enter={patchEnter}
      exit={patchExit}
      onExit={() => openedDiffStore.set(void 0)}
    >
      <div className={clsx(_root, uniqueClass)}>
        <div className={_fakeHeader}>
          <ListHeader tabTitle="-" />
        </div>
        <div className={clsx(_panel, styles.panel)}>
          <div className={_header}>
            <h4>Patch {diff?.shortName}</h4>
            <Button
              aria-label="Close Patch"
              className={_closePatch}
              tooltipPosition="left"
              iconDescription="Close Patch"
              kind="ghost"
              hasIconOnly
              onClick={() => {
                openedDiffStore.set({ ...truthy(diff), show: false });
              }}
            >
              <FontAwesomeIcon className={_icon} icon={faChevronRight} />
            </Button>
          </div>
          {diff?.description && <p>{diff.description}</p>}
          {diff?.link && (
            <p>
              <a
                className={_link}
                target="_blank"
                href={diff.link}
                rel="noreferrer"
              >
                Full report
              </a>
            </p>
          )}
          {diff?.diff ? (
            <WrappedCodeSnippet diff={diff.diff} />
          ) : (
            <span>No changes for this patch.</span>
          )}
        </div>
      </div>
    </Presence>
  );
};

export const WrappedCodeSnippet: FC<{ diff: string }> = ({ diff }) => {
  const wrapperElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = truthy(wrapperElement.current),
      pre = truthy(root.querySelector('pre')),
      code = truthy(pre.querySelector('code'));
    pre.classList.add('diff-highlight');
    Prism.highlightElement(code);

    /**
     * Reason: Safari has an odd bug with position: absolute not working
     * correctly if this line-numbers element is the last, but it works fine
     * if it's the first.
     * I'm really sorry for this code, but it's what it is ¯\_(ツ)_/¯
     */
    const lineNumbers = truthy(code.querySelector('.line-numbers-rows'));
    code.insertBefore(lineNumbers, code.firstChild);
  }, [diff]);

  return (
    <div ref={wrapperElement}>
      <CodeSnippet
        className={clsx(
          styles.codeBlock,
          'language-diff-solidity',
          'line-numbers',
        )}
        type="multi"
        light
      >
        {diff}
      </CodeSnippet>
    </div>
  );
};
