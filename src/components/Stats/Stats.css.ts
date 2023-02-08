import { globalStyle, style } from '@vanilla-extract/css';

import { sprinkles } from '@styles/sprinkles.css';

export const _root = style([sprinkles({ display: 'flex', gap: 'md' }), {}]);

export const _tile = sprinkles({ flex: 1 });
export const _skeletonPlaceholder = style([
  sprinkles({ width: 'full' }),
  { height: 'unset' },
]);
globalStyle(`${_skeletonPlaceholder} > *`, {
  visibility: 'hidden',
});

export const _mainMetric = style({ fontSize: 42, fontWeight: '300' });
export const _secondaryMetric = style({ fontSize: 20 });
