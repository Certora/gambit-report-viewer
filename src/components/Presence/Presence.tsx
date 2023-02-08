import { cloneElement, FC, useEffect, useRef, useState } from 'react';

import {
  AnimationOptionsWithOverrides,
  MotionKeyframesDefinition,
} from '@motionone/dom';

import { useRandomId } from '@utils/string';

import { _transparent } from './Presence.css';

import clsx from 'clsx';
import { animate, AnimationControls } from 'motion';

export type AnimationSettings = [
  MotionKeyframesDefinition,
  AnimationOptionsWithOverrides?,
];
type Props = {
  children: JSX.Element;
  show?: boolean | null;
  enter?: AnimationSettings;
  exit?: AnimationSettings;
  onExit?: () => void;
};

const baseEnter: AnimationSettings = [{ opacity: 1 }, { duration: 0.5 }],
  baseExit: AnimationSettings = [{ opacity: 0 }, { duration: 0.5 }];

export const Presence: FC<Props> = ({
  children,
  show,
  enter = baseEnter,
  exit = baseExit,
  onExit,
}) => {
  const uniqueClass = useRandomId();

  const [inDom, setInDom] = useState(show);
  const animationRef = useRef<AnimationControls | undefined>();
  const showRef = useRef(show);

  const noEnterProvided = enter === baseEnter;

  // Adding to DOM and syncing prop with ref
  useEffect(() => {
    showRef.current = show;
    if (show && !inDom) setInDom(true);
  }, [inDom, show]);

  useEffect(() => {
    if (!inDom) return;

    // stopping previous animation
    animationRef.current?.stop();

    const newAnimation = animate(`.${uniqueClass}`, ...(show ? enter : exit));

    animationRef.current = newAnimation;
    animationRef.current.finished.then(() => {
      // do not hide from DOM — animation has been changed
      if (animationRef.current !== newAnimation) return;
      // do not hide from DOM — current show is true
      if (showRef.current) return;

      animationRef.current = undefined;
      setInDom(false);
      onExit?.();
    });
  }, [enter, inDom, exit, show, uniqueClass, onExit]);

  return inDom
    ? cloneElement(children, {
        ...children.props,
        className: clsx(
          uniqueClass,
          noEnterProvided && _transparent,
          children.props?.className,
        ),
      })
    : null;
};
