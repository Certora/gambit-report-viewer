import { style } from '@vanilla-extract/css';

export const _ellipsis = style({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordBreak: 'break-all',
});
