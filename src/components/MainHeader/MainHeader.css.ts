import { style } from '@vanilla-extract/css';

import { colors, sprinkles } from '@styles/sprinkles.css';

export const _header = sprinkles({
  backgroundColor: 'background',
  borderColor: 'borderSubtle01',
});

export const _headerName = sprinkles({ gap: 'lg' });

export const _headerNameText = sprinkles({
  paddingBottom: 'sm',
  color: 'textPrimary',
});

export const _icon = sprinkles({ color: 'textPrimary' });

export const _mediaLinkHover = style({
  // For some reason those links get a minimum of 3rem height, which results in
  // them overflowing the container by a teeeeeeeny margin of 2 pixels. Which
  // looks gross.
  minHeight: 'unset',
  height: 'unset',
  // Overriding dark theme
  ':hover': { backgroundColor: colors.layer01 },
});
