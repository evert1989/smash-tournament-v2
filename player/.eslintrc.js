const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		es6: true,
		node: true,
		'jest/globals': true,
 	},
	plugins: ['babel', 'jest', 'flowtype'],
	parserOptions: {
		ecmaVersion: 9,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['airbnb', 'plugin:flowtype/recommended'],
	rules: {
		'babel/semi': ERROR,
		'brace-style': [ERROR, '1tbs'],
		curly: [ERROR, 'all'],
		'import/no-extraneous-dependencies': [ERROR, {
			devDependencies: true,
			optionalDependencies: false,
			peerDependencies: false
		}],
		'import/order': OFF,
		indent: [ERROR, 'tab', {
			SwitchCase: 1,
		}],
		'jsx-a11y/alt-text': OFF,
		'jsx-a11y/iframe-has-title': OFF,
		'jsx-a11y/media-has-caption': OFF,
		'jsx-a11y/no-noninteractive-tabindex': OFF,
		'max-len': [ERROR, {
			code: 120,
			ignoreTemplateLiterals: true,
			tabWidth: 4,
		}],
		'no-console': OFF,
		'no-tabs': OFF,
		'object-property-newline': [ERROR, {
			allowAllPropertiesOnSameLine: false,
		}],
		'padding-line-between-statements': [ERROR,
			{
				blankLine: 'always',
				prev: ['case', 'multiline-block-like', 'multiline-const', 'multiline-expression', 'multiline-let', 'multiline-var'],
				next: '*',
			},
			{
				blankLine: 'always',
				prev: '*',
				next: ['multiline-block-like', 'multiline-const', 'multiline-expression', 'multiline-let', 'multiline-var', 'return'],
			},
		],
		'react/forbid-dom-props': [WARN, { 'forbid': ['style'] }],
		'react/jsx-filename-extension': OFF,
		'react/jsx-indent': [ERROR, 0, 'tab'],
		'react/jsx-indent-props': [ERROR, 0, 'tab'],
		'react/jsx-max-props-per-line': [ERROR, {
			maximum: 3,
		}],
		'react/jsx-no-literals': [ERROR, {
			noStrings: false,
		}],
		'react/jsx-sort-default-props': [ERROR, {
			ignoreCase: false,
		}],
		'react/jsx-sort-props': [ERROR, {
			callbacksLast: false,
			ignoreCase: false,
			noSortAlphabetically: false,
			reservedFirst: false,
			shorthandFirst: false,
			shorthandLast: false,
		}],
		'react/no-danger': OFF,
		'react/sort-prop-types': [ERROR, {
			callbacksLast: false,
			ignoreCase: false,
			requiredFirst: false,
			sortShapeProp: false,
		}],
		'sort-imports': [WARN, {
			ignoreCase: true,
			ignoreMemberSort: false,
			memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
		}],
		'sort-keys': [WARN, 'asc', {
			caseSensitive: true,
			natural: false,
		}],
	},
	settings: {
		react: {
			pragma: "React",
			version: "16.3"
		},
        flowtype: {
            onlyFilesWithFlowAnnotation: true
        }
	},
};
