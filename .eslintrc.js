module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript',
  ],
  rules: {
    'no-unused-vars': ['off'],
    'no-undef': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    semi: 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
