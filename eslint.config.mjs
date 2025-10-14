// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import standard from 'eslint-config-standard';
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {},

    extends: [js.configs.recommended, standard, prettier],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: 'error',
      'no-magic-numbers': ['warn', { ignore: [-1, 0, 1] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];
