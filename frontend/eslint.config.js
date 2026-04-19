import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

const tsRules = {
  '@typescript-eslint/no-misused-promises': [
    'warn',
    {
      checksVoidReturn: false,
    },
  ],
  '@typescript-eslint/no-unused-vars': 'off',
};

export default defineConfig([
  globalIgnores(['dist']),
  {
    // Apply this to all TS files in the project
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: tsRules,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  prettierConfig,
]);
