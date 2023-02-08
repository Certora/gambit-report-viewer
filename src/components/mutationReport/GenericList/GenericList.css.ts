import { style, styleVariants } from '@vanilla-extract/css';

import { _ellipsis } from '@styles/helpers.css';
import { colors, sprinkles } from '@styles/sprinkles.css';

export const _root = sprinkles({ display: 'flex', flexDirection: 'column' });

export const _hr = style([
  sprinkles({ backgroundColor: 'borderSubtle01', marginBlock: 'lg' }),
  { width: 'calc(100% - 32px)', height: '1px', border: 'none' },
]);

const _baseText = style([
  sprinkles({ color: 'textPrimary' }),
  { fontSize: 14 },
]);

export const _buttonText = styleVariants({
  usual: [_baseText],
  selected: [_baseText, sprinkles({ fontWeight: 'bold' })],
  active: [_baseText, sprinkles({ fontWeight: 'bold' })],
});

export const _listsWrapper = sprinkles({
  backgroundColor: 'layer01',
  position: 'relative',
  flex: 1,
});

export const _searchRoot = sprinkles({
  padding: 'lg',
});

export const _list = sprinkles({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md',
});

export const _item = style([
  sprinkles({
    display: 'block',
    overflow: 'hidden',
    color: 'textSecondary',
  }),
  _ellipsis,
]);

export const _ruleToggle = style([
  sprinkles({
    background: 'none',
    border: 'none',
    paddingY: 'md',
    paddingX: 'lg',
  }),
  { appearance: 'none' },
]);

export const _tileTitle = style([
  sprinkles({
    paddingY: 'none',
    paddingX: 'lg',
  }),
  {
    marginBlock: 8,
  },
]);

const _baseButton = style([
  _ruleToggle,
  {
    position: 'relative',
    cursor: 'pointer',
    textAlign: 'left',
    ':focus-visible': {
      outline: `2px solid ${colors.accentBlue}`,
      outlineOffset: '-2px',
    },
  },
]);

export const _button = styleVariants({
  usual: [_baseButton],
  selected: [
    _baseButton,
    { backgroundColor: `${colors.backgroundSelected}` },
    {
      '::before': {
        content: '',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: `${colors.accentBlue}`,
      },
    },
  ],
  active: [_baseButton, { backgroundColor: `${colors.backgroundActive}` }],
});
