module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'array-bracket-spacing': ['error', 'always', {
      'singleValue': true,
      'objectsInArrays': true,
      'arraysInArrays': true
    }],
    'object-curly-spacing': ['error', 'always', {
      'arraysInObjects': true,
      'objectsInObjects': true,
    }],
    'quotes': ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true
    }],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }]
  },
};
