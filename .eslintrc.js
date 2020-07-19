// const ALL_TAGS_PATTERN = '(<.*>|)[^\x00-\xff].*'
// eslint-disable-next-line import/no-extraneous-dependencies
const INLINE_ELEMENTS = require('eslint-plugin-vue/lib/utils/inline-non-void-elements.json')

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/recommended', 'plugin:vue/essential', '@vue/airbnb'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'generator-star-spacing': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'import/extensions': ['error', 'never'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'func-names': ['error', 'never'],
        'no-param-reassign': ['error', { props: false }],
        allowAllPropertiesOnSameLine: 0,
        'object-curly-newline': [
            'error',
            {
                // ObjectExpression: 'always',
                ObjectPattern: { multiline: true },
                ImportDeclaration: 'never',
                ExportDeclaration: { multiline: true, minProperties: 4 },
            },
        ],
        'space-before-function-paren': ['error', 'always'],
        camelcase: [
            'error',
            {
                ignoreDestructuring: true,
                properties: 'never',
                allow: ['.*'],
            },
        ],
        'standard/no-callback-literal': 0,
        'max-len': [
            'error',
            {
                code: 200,
                tabWidth: 4,
                // ignorePattern: INLINE_ELEMENTS,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, { switchCase: 1 }],
        'vue/mustache-interpolation-spacing': [2, 'always'],
        'vue/no-unused-components': 0,
        'vue/max-len': [
            'error',
            {
                code: 200,
                template: 200,
                tabWidth: 4,
                comments: 500,
                // ignorePattern: INLINE_ELEMENTS,
                ignoreHTMLAttributeValues: false,
                ignoreHTMLTextContents: true,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'vue/singleline-html-element-content-newline': ['error', {
            ignoreWhenNoAttributes: true,
            ignoreWhenEmpty: true,
            ignores: [...INLINE_ELEMENTS, 'div'],
        }],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 3,
                // multiline: {
                //     max: 3,
                //     allowFirstLine: true,
                // },
            },
        ],
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'always',
        }],
        'vue/no-v-html': 0,
        'vue/no-template-shadow': 0,
    },
    globals: {
        CircleProgress: 'readonly',
    },
}
