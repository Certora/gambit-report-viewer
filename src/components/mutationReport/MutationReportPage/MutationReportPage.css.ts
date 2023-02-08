import { style } from '@vanilla-extract/css';

import { headerHeight, sprinkles } from '@styles/sprinkles.css';

export const _root = style([
  sprinkles({ height: 'fullWithoutHeader' }),
  {
    display: 'grid',
    gridTemplateColumns: 'minmax(1px, 1fr) minmax(1px, 3fr) minmax(1px, 1fr)',
    gridTemplateRows: 'min-content minmax(1px, 1fr)',
    gridTemplateAreas: "'left top right' 'left center right'",

    marginTop: headerHeight,
  },
]);

const allowOverflow = style([
  sprinkles({ backgroundColor: 'layer01', height: 'full', overflow: 'auto' }),
]);

export const _left = style([allowOverflow, { gridArea: 'left' }]);
const right = style({ gridArea: 'right' });
export const _mutantList = style([
  allowOverflow,
  right,
  sprinkles({ zIndex: 'patchDisplay' }),
]);
export const _patch = style([right, sprinkles({ position: 'relative' })]);

export const _center = style([
  sprinkles({ padding: 'md' }),
  { gridArea: 'center' },
]);
export const _top = style([
  sprinkles({
    paddingX: 'md',
    paddingTop: 'lg',
  }),
  {
    gridArea: 'top',
  },
]);
