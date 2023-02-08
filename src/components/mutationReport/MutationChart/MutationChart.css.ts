import { style, styleVariants } from '@vanilla-extract/css';

import { colors, sprinkles } from '@styles/sprinkles.css';

export const _root = sprinkles({
  display: 'flex',
  flexDirection: 'column',
  height: 'full',
  gap: 'sm',
});

export const _chartRoot = style([
  sprinkles({
    position: 'relative',
    flex: 1,
    borderColor: 'borderSubtle01',
    borderWidth: 1,
    borderStyle: 'solid',
  }),
  {
    height: `calc(100% - 3rem)`,
    borderRadius: 8,

    '::before': {
      content: "''",
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      backgroundImage: `radial-gradient(${colors.borderSubtle01} 10%, ${colors.background} 10%)`,
      backgroundPosition: '0 0',
      backgroundSize: '20px 20px',
      opacity: 0.3,
      borderRadius: 8,
    },
  },
]);

export const _svg = sprinkles({ display: 'block' });

const _svgTransition = style({
  transitionProperty: 'fill, stroke, stroke-width',
  transitionDuration: '0.3s',
  transitionTimingFunction: 'ease-in-out',
});
const _baseText = style([
  sprinkles({ fontFamily: 'usual', pointerEvents: 'none' }),
  _svgTransition,
  {
    fontSize: 12,
    textAnchor: 'middle',
  },
]);
export const _text = styleVariants({
  usual: [_baseText],
  selected: [_baseText, { fill: colors.background }],
  active: [_baseText, { fill: colors.borderInteractive }],
});

export const _textBg = styleVariants({
  usual: [sprinkles({ fill: 'blueTextBg' })],
  selected: [sprinkles({ fill: 'borderInteractive' })],
  active: [
    sprinkles({ fill: 'background' }),
    { stroke: colors.borderInteractive, strokeWidth: 2 },
  ],
});

const _baseRuleCircle = style([
  _svgTransition,
  {
    fill: 'transparent',
    stroke: colors.supportSuccess,
    strokeWidth: 1.5,
  },
]);
export const _ruleCircle = styleVariants({
  usual: [_baseRuleCircle],
  selected: [
    _baseRuleCircle,
    {
      stroke: colors.borderInteractive,
      strokeWidth: 3,
    },
  ],
});

export const _mutantCircle = styleVariants({
  usual: [_svgTransition, { fill: colors.backgroundActive }],
  selected: [_svgTransition, { fill: colors.borderInteractive }],
  active: [
    _svgTransition,
    {
      fill: colors.background,
      stroke: colors.borderInteractive,
      strokeWidth: 2,
    },
  ],
});
