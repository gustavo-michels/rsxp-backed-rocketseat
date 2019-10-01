module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    use: false,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    strict: 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
  },
};
