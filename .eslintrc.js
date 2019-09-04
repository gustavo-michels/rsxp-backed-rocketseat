module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['airbnb-base'],
  globals: {
    use: false,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    strict: 'off',
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'always' }],
    'class-methods-use-this': 'off',
    'object-curly-newline': ['error', { multiline: true }],
    'global-require': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }]
  }
}
