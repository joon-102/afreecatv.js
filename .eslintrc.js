module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    // 원하는 규칙을 설정합니다.
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        // src 폴더 안의 TypeScript 파일에 대한 추가 규칙을 설정합니다.
      },
    },
  ],
};
