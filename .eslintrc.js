module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:prettier/recommended'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
  },
};
