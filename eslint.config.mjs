import next from 'eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      next,
    },
    rules: {
      
      ...next.configs.recommended.rules,

      
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
