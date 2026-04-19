import js from '@eslint/js';
import globals from 'globals';
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
    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked],
    rules: {
      camelcase: ['warn', { properties: 'always' }],
      ...tsRules,
    },
    languageOptions: {
      globals: globals.node,
    },
  },
  prettierConfig,
]);
