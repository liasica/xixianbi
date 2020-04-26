module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard', 'standard'],
    plugins: ['vue'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'generator-star-spacing': 'off',
        'arrow-parens': ['error', 'as-needed'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, { switchCase: 1 }],
        'func-names': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
        'vue/max-len': [
            'error',
            {
                code: 200,
                template: 800,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ],
        // 'max-len': [
        //     'error',
        //     {
        //         code: 200,
        //         ignoreComments: true,
        //         ignoreStrings: true,
        //         ignoreTrailingComments: true,
        //         ignoreUrls: true,
        //         ignoreTemplateLiterals: true,
        //         ignoreRegExpLiterals: true
        //     }
        // ],
        'space-before-function-paren': ['error', 'always'],
        'vue/mustache-interpolation-spacing': [2, 'always'],
        'vue/no-unused-components': 0,
        camelcase: [
            'error',
            {
                ignoreDestructuring: true,
                properties: 'never',
                allow: ['.*']
            }
        ],
        // 'prettier/prettier': {
        //     'arrow-parens': ['error', 'always']
        // },
        'standard/no-callback-literal': 0
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    globals: {
        CircleProgress: 'readonly'
    }
}
