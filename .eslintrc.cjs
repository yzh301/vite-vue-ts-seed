/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-12 14:38:06
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-12 15:22:05
 * @FilePath: \vite-vue-ts-seed\.eslintrc.cjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    './.eslintrc-auto-import.json',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // project: './tsconfig.*?.json',
    createDefaultProgram: false,
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // Vue 相关规则
    'vue/multi-word-component-names': 'off', // 禁用 Vue 文件强制多个单词命名
    'vue/no-v-model-argument': 'off', // 关闭对 v-model 中参数的限制
    'vue/script-setup-uses-vars': 'error', // 确保使用 <script setup> 中声明的变量
    'vue/no-reserved-component-names': 'off', // 关闭对保留的组件名的限制
    'vue/custom-event-name-casing': 'off', // 关闭自定义事件名的大小写规则
    'vue/attributes-order': 'off', // 关闭 HTML 属性的排序规则
    'vue/one-component-per-file': 'off', // 关闭每个文件只定义一个组件的规则
    'vue/html-closing-bracket-newline': 'off', // 关闭闭合标签换行的规则
    'vue/max-attributes-per-line': 'off', // 关闭每行最大属性数的规则
    'vue/multiline-html-element-content-newline': 'off', // 关闭多行 HTML 元素内容的规则
    'vue/singleline-html-element-content-newline': 'off', // 关闭单行 HTML 元素内容的规则
    'vue/attribute-hyphenation': 'off', // 关闭属性使用连字符的规则
    'vue/require-default-prop': 'off', // 关闭要求有默认值的 prop 的规则
    'vue/require-explicit-emits': 'off', // 关闭要求明确指定 emits 的规则
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ], // 确保自闭合标签的规则

    // TypeScript 相关规则
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['that'], // 允许使用指定的局部变量名称来表示 this
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off', // 允许使用 @ts-ignore
    '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言
    '@typescript-eslint/no-empty-function': 'off', // 关闭空函数的规则
    '@typescript-eslint/ban-types': 'off', // 允许使用特定的类型
    '@typescript-eslint/explicit-function-return-type': 'off', // 关闭要求函数显式返回类型的规则
    '@typescript-eslint/no-var-requires': 'off', // 允许使用 require
    '@typescript-eslint/no-use-before-define': 'off', // 允许在定义之前使用变量和函数
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭要求明确指定模块边界类型的规则
    '@typescript-eslint/no-unused-vars': 'off', // 允许声明但未使用的变量

    // Prettier 规则
    'prettier/prettier': [
      'error',
      {
        useTabs: false, // 不使用制表符
      },
    ], // 使用 Prettier 进行代码格式化的规则
  },
  // eslint不能对 HTML 文件生效
  overrides: [
    {
      files: ['*.html'],
      processor: 'vue/.vue',
    },
  ],
  // 全局变量声明
  globals: {
    OptionType: 'readonly', // 声明全局变量 OptionType 为只读
  },
};
