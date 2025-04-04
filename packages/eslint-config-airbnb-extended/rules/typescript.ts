import { parser, plugin } from 'typescript-eslint';

import bestPractices from '@/rules/best-practices';
import errors from '@/rules/errors';
import es6 from '@/rules/es6';
import { importConfig } from '@/rules/imports';
import style from '@/rules/style';
import variables from '@/rules/variables';

import type { Linter } from 'eslint';

export const importResolverExtensions = [
  ...importConfig.settings['import/resolver'].node.extensions,
  '.ts',
  '.cts',
  '.mts',
  '.d.ts',
];

export default [
  {
    name: 'airbnb/config/typescript',
    plugins: {
      '@typescript-eslint': plugin,
    },
    languageOptions: {
      parser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      // Append 'ts' extensions to Airbnb 'import/resolver' setting
      'import/resolver': {
        node: {
          extensions: importResolverExtensions,
        },
      },
      // Append 'ts' extensions to Airbnb 'import/extensions' setting
      'import/extensions': [...importConfig.settings['import/extensions'], '.ts', '.tsx', '.d.ts'],
      // Resolve type definition packages
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    },
    rules: {
      // Replace Airbnb 'brace-style' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
      'brace-style': 'off',
      '@typescript-eslint/brace-style': style.rules['brace-style'],

      // Replace Airbnb 'camelcase' rule with '@typescript-eslint/naming-convention'
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
      camelcase: 'off',
      // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
      '@typescript-eslint/naming-convention': [
        'error',
        // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // Allow camelCase functions (23.2), and PascalCase functions (23.8)
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
      // The TypeScript version also adds 3 new options, all of which should be set to the same value as the base config
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': [
        style.rules['comma-dangle'][0],
        {
          ...style.rules['comma-dangle'][1],
          enums: style.rules['comma-dangle'][1].arrays,
          generics: style.rules['comma-dangle'][1].arrays,
          tuples: style.rules['comma-dangle'][1].arrays,
        },
      ],

      // Replace Airbnb 'comma-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
      'comma-spacing': 'off',
      '@typescript-eslint/comma-spacing': style.rules['comma-spacing'],

      // Replace Airbnb 'default-param-last' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': bestPractices.rules['default-param-last'],

      // Replace Airbnb 'dot-notation' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': bestPractices.rules['dot-notation'],

      // Replace Airbnb 'func-call-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
      'func-call-spacing': 'off',
      '@typescript-eslint/func-call-spacing': style.rules['func-call-spacing'],

      // Replace Airbnb 'indent' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
      indent: 'off',
      '@typescript-eslint/indent': style.rules.indent,

      // Replace Airbnb 'keyword-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
      'keyword-spacing': 'off',
      '@typescript-eslint/keyword-spacing': style.rules['keyword-spacing'],

      // Replace Airbnb 'lines-between-class-members' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
      'lines-between-class-members': 'off',
      '@typescript-eslint/lines-between-class-members': style.rules['lines-between-class-members'],

      // Replace Airbnb 'no-array-constructor' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': style.rules['no-array-constructor'],

      // Replace Airbnb 'no-dupe-class-members' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': es6.rules['no-dupe-class-members'],

      // Replace Airbnb 'no-empty-function' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': bestPractices.rules['no-empty-function'],

      // Replace Airbnb 'no-extra-parens' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
      'no-extra-parens': 'off',
      '@typescript-eslint/no-extra-parens': errors.rules['no-extra-parens'],

      // Replace Airbnb 'no-extra-semi' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
      'no-extra-semi': 'off',
      '@typescript-eslint/no-extra-semi': errors.rules['no-extra-semi'],

      // Replace Airbnb 'no-implied-eval' and 'no-new-func' rules with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
      'no-implied-eval': 'off',
      'no-new-func': 'off',
      '@typescript-eslint/no-implied-eval': bestPractices.rules['no-implied-eval'],

      // Replace Airbnb 'no-loss-of-precision' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
      'no-loss-of-precision': 'off',
      '@typescript-eslint/no-loss-of-precision': errors.rules['no-loss-of-precision'],

      // Replace Airbnb 'no-loop-func' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': bestPractices.rules['no-loop-func'],

      // Replace Airbnb 'no-magic-numbers' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': bestPractices.rules['no-magic-numbers'],

      // Replace Airbnb 'no-redeclare' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': bestPractices.rules['no-redeclare'],

      // Replace Airbnb 'no-shadow' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': variables.rules['no-shadow'],

      // Replace Airbnb 'space-before-blocks' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-blocks.md
      'space-before-blocks': 'off',
      '@typescript-eslint/space-before-blocks': style.rules['space-before-blocks'],

      // Replace Airbnb 'no-throw-literal' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
      'no-throw-literal': 'off',
      '@typescript-eslint/no-throw-literal': bestPractices.rules['no-throw-literal'],

      // Replace Airbnb 'no-unused-expressions' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': bestPractices.rules['no-unused-expressions'],

      // Replace Airbnb 'no-unused-vars' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': variables.rules['no-unused-vars'],

      // Replace Airbnb 'no-use-before-define' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': variables.rules['no-use-before-define'],

      // Replace Airbnb 'no-useless-constructor' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': es6.rules['no-useless-constructor'],

      // Replace Airbnb 'quotes' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
      quotes: 'off',
      '@typescript-eslint/quotes': style.rules.quotes,

      // Replace Airbnb 'semi' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
      semi: 'off',
      '@typescript-eslint/semi': style.rules.semi,

      // Replace Airbnb 'space-before-function-paren' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
      'space-before-function-paren': 'off',
      '@typescript-eslint/space-before-function-paren': style.rules['space-before-function-paren'],

      // Replace Airbnb 'require-await' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
      'require-await': 'off',
      '@typescript-eslint/require-await': bestPractices.rules['require-await'],

      // Replace Airbnb 'no-return-await' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
      'no-return-await': 'off',
      '@typescript-eslint/return-await': [bestPractices.rules['no-return-await'], 'in-try-catch'],

      // Replace Airbnb 'space-infix-ops' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
      'space-infix-ops': 'off',
      '@typescript-eslint/space-infix-ops': style.rules['space-infix-ops'],

      // Replace Airbnb 'object-curly-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
      'object-curly-spacing': 'off',
      '@typescript-eslint/object-curly-spacing': style.rules['object-curly-spacing'],

      // Append 'ts' and 'tsx' to Airbnb 'import/extensions' rule
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
      'import/extensions': [
        importConfig.rules['import/extensions'][0],
        importConfig.rules['import/extensions'][1],
        {
          ...importConfig.rules['import/extensions'][2],
          ts: 'never',
          tsx: 'never',
        },
      ],

      // Append 'ts' and 'tsx' extensions to Airbnb 'import/no-extraneous-dependencies' rule
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
      'import/no-extraneous-dependencies': [
        importConfig.rules['import/no-extraneous-dependencies'][0],
        {
          ...importConfig.rules['import/no-extraneous-dependencies'][1],
          devDependencies: importConfig.rules[
            'import/no-extraneous-dependencies'
          ][1].devDependencies.reduce<string[]>((result, devDep) => {
            const toAppend = [devDep];
            const devDepWithTs = devDep.replaceAll(/\bjs(x?)\b/g, 'ts$1');
            if (devDepWithTs !== devDep) {
              toAppend.push(devDepWithTs);
            }
            return [...result, ...toAppend];
          }, []),
        },
      ],
    },
  },
  {
    name: 'airbnb/config/typescript-overrides',
    files: ['*.ts', '*.tsx'],
    rules: {
      // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
      // Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts
      'constructor-super': 'off', // ts(2335) & ts(2377)
      'getter-return': 'off', // ts(2378)
      'no-class-assign': 'off', // ts(2629)
      'no-const-assign': 'off', // ts(2588)
      'no-dupe-args': 'off', // ts(2300)
      'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
      'no-dupe-keys': 'off', // ts(1117)
      'no-func-assign': 'off', // ts(2630)
      'no-import-assign': 'off', // ts(2632) & ts(2540)
      'no-new-native-nonconstructor': 'off', // ts(7009)
      'no-obj-calls': 'off', // ts(2349)
      'no-redeclare': 'off', // ts(2451)
      'no-setter-return': 'off', // ts(2408)
      'no-this-before-super': 'off', // ts(2376) & ts(17009)
      'no-undef': 'off', // ts(2304) & ts(2552)
      'no-unreachable': 'off', // ts(7027)
      'no-unsafe-negation': 'off', // ts(2365) & ts(2322) & ts(2358)
      'no-with': 'off', // ts(1101) & ts(2410)
      'valid-typeof': 'off',
    },
  },
  {
    name: 'airbnb/config/typescript-import-overrides',
    files: ['*.ts', '*.tsx'],
    rules: {
      // The following rules are enabled in Airbnb config, but are recommended to be disabled within TypeScript projects
      // See: https://github.com/typescript-eslint/typescript-eslint/blob/13583e65f5973da2a7ae8384493c5e00014db51b/docs/linting/TROUBLESHOOTING.md#eslint-plugin-import
      'import/named': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
] as Linter.Config[];
