module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 0,
    'space-before-function-paren': 0
  },
}
