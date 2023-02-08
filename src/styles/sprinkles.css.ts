import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

export const space = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
};

export const headerHeight = '3rem';

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    position: ['relative', 'absolute', 'sticky'],
    display: ['none', 'grid', 'flex', 'block', 'inline', 'contents'],
    flexDirection: ['row', 'column'],
    flexWrap: ['wrap', 'nowrap'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],

    zIndex: {
      below: -1,
      patchDisplay: 2,
      listStickyHeader: 3,
      dropdownOptions: 1,
    },

    width: {
      full: '100%',
    },
    height: {
      full: '100%',
      fullViewport: '100vh',
      fullWithoutHeader: `calc(100vh - ${headerHeight})`,
    },
    flex: [1],
    inset: { full: 0 },

    gap: space,
    gridRowGap: space,
    gridColumnGap: space,

    margin: ['auto'],
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    marginBlock: space,

    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    placeItems: ['justifyContent', 'alignItems'],
  },
});

export const colors = {
  background: '#FFFFFF',
  accentBlue: '#0f62fe',
  blueText: '#0043CE',
  blueTextBg: '#D0E2FF',
  supportSuccess: '#42BE65',
  borderInteractive: '#0F62FE',
  backgroundActive: '#8D8D8D80',
  backgroundSelected: '#8D8D8D33',
  borderSubtle01: '#E0E0E0',
  textPrimary: '#161616',
  textSecondary: '#525252',
  textError: '#da1e28',
  layer01: '#f4f4f4',
  textInputHovered: '#cacaca',
};

const colorProperties = defineProperties({
  properties: {
    borderColor: colors,
    color: colors,
    backgroundColor: colors,
    fill: colors,
  },
});

export const fontSize = {
  sm: 10,
  md: 12,
  lg: 16,
};

const textProperties = defineProperties({
  properties: {
    fontSize,
    fontFamily: {
      usual: `'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif`,
    },
    fontStyle: ['italic'],
    fontWeight: {
      usual: '400',
      accented: '500',
      bold: '600',
    },
    textTransform: ['uppercase', 'lowercase'],
    textDecoration: ['none', 'underline'],
    textAlign: ['center', 'right'],
    whiteSpace: ['nowrap'],
    textOverflow: ['ellipsis'],
  },
});

const visualProperties = defineProperties({
  properties: {
    appearance: ['none'],
    borderRadius: {
      round: '50%',
    },
    borderWidth: [1],
    borderStyle: ['solid'],
    overflow: ['hidden', 'auto'],
    opacity: [0],
    pointerEvents: ['none'],
    background: ['none'],
    border: ['none'],
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  textProperties,
  visualProperties,
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
