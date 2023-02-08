import { style } from '@vanilla-extract/css';

import { colors, sprinkles } from '@styles/sprinkles.css';

export const _header = style([
  sprinkles({
    display: 'flex',
    position: 'sticky',
    fontWeight: 'bold',
    zIndex: 'listStickyHeader',
    backgroundColor: 'background',
  }),
  { top: '0', borderBottom: `2px solid ${colors.borderSubtle01}` },
]);

export const _tabTitle = style([
  sprinkles({
    paddingY: 'md',
    paddingX: 'lg',
  }),
  {
    transform: 'translateY(2px)',
    minWidth: '50%',
    borderBottom: `2px solid ${colors.accentBlue}`,
  },
]);
