// eslint.config.mjs
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin-js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  files: ['**/*.{js,mjs,cjs}'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  plugins: {
    '@stylistic': stylistic,
  },
  extends: [js.configs.recommended, prettier],
  rules: {
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/quotes': ['error', 'single'],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    eqeqeq: 'error',
    'no-magic-numbers': ['warn', { ignore: [-1, 0, 1] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
});
