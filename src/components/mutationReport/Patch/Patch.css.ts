import { style } from '@vanilla-extract/css';

import { colors, sprinkles } from '@styles/sprinkles.css';

export const _root = style([
  sprinkles({ display: 'flex', flexDirection: 'column', position: 'absolute' }),
  {
    top: '0',
    bottom: '0',
    right: '100%',
    width: '50vw',
    opacity: '0',
    transform: 'translateX(50%)',
  },
]);

export const _closePatch = style([sprinkles({ color: 'textPrimary' })]);

export const _fakeHeader = style({ visibility: 'hidden' });

export const _panel = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    padding: 'lg',
    overflow: 'auto',
    backgroundColor: 'layer01',
    gap: 'lg',
    flex: 1,
  }),
  {
    borderRight: `1px solid ${colors.borderSubtle01}`,
    filter: 'drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.3))',
    /**
     * Reason: Safari has a bug with processing filter CSS property,
     * but it works properly if there is an any transform property
     */
    transform: 'translateZ(0)',
  },
]);

export const _header = sprinkles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const _icon = sprinkles({ color: 'textPrimary' });

export const _link = style([
  sprinkles({ color: 'textPrimary' }),
  { ':focus': { outlineColor: `${colors.accentBlue}` } },
]);
