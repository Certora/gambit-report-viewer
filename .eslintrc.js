module.exports = {
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['**/dist/*', '**/node_modules/*', '**/public/*'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'prettier/prettier': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `react` related packages come first.
          ['^react'],
          ['^@?react'],
          ['^carbon-components-react'],
          // All other packages starting with @
          ['^@'],
          // Aliases.
          ['^(^@cmp|@ui|@state|@logic|@services|@utils|shared)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Relative imports.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.css$'],
        ],
      },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': true,
        minimumDescriptionLength: 10,
      },
    ],
  },
  overrides: [
    {
      // Turning off exessive checks for tests, stories, codegen
      files: [
        '**/*.stories.tsx',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/__tests__/*',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: '18',
    },
  },
};
