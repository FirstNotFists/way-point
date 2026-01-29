import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/.granite/**',
			'*.{cjs,js}',
		],
	},
	{ files: ['pages/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'] },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			'react-native': pluginReactNative,
			prettier: pluginPrettier,
		},
		rules: {
			...pluginReactNative.configs.all.rules,
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					semi: true,
					useTabs: true,
					tabWidth: 2,
					trailingComma: 'all',
					printWidth: 80,
					bracketSpacing: true,
					arrowParens: 'avoid',
					endOfLine: 'auto',
				},
			],
			'@typescript-eslint/no-require-imports': 'off',
			'react-native/no-inline-styles': 'warn',
			'react-native/no-color-literals': 'off',
			'react-native/no-raw-text': 'off',
		},
	},
	configPrettier,
];
