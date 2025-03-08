import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  pluginImport.flatConfigs.recommended,
  {
    ignores: ['dist']
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      quotes: ['error', 'single'],
      camelcase: 'error',
      'no-console': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default']
            }
          ]
        }
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before'
            }
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          pathGroupsExcludedImportTypes: [],
          'newlines-between': 'always-and-inside-groups'
        }
      ],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true
        }
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-empty-object-type': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        typescript: {}
      }
    }
  }
];
