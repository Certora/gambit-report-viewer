import { style, styleVariants } from '@vanilla-extract/css';

import { headerHeight, sprinkles } from '@styles/sprinkles.css';

export const _root = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'md',
    justifyContent: 'center',
    height: 'fullWithoutHeader',
  }),
  { marginTop: headerHeight, marginInline: 'auto', width: `min(90%, 350px)` },
]);

const base = sprinkles({ width: 'full' });
const errBase = style([
  base,
  sprinkles({ color: 'textError', marginTop: 'lg' }),
]);
export const _par = styleVariants({
  usual: [base],
  bold: [base, sprinkles({ fontWeight: 'bold' })],
  err: [errBase],
  errHidden: [errBase, style({ visibility: 'hidden' })],
});
