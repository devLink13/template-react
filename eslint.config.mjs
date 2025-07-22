import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser } },
  {
    rules: {
      'no-console': 'warn', // Avisa sobre console.log
      'no-unused-vars': 'error', // Erro para variáveis não usadas
    },
  },
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
]);
