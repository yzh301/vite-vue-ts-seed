/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-12 09:12:50
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-12 10:57:38
 * @FilePath: \vite-vue-ts-seed\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default ({ comments, module }) => {
  console.log('🚀 ~ comments, module:', comments, module);
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        include: [
          /\.tsx?$/, // 添加对 tsx 文件的支持
          /\.jsx?$/,
          /\.vue$/,
          /\.vue\?vue/,
          /\.md$/,
        ],

        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router',
          // custom
        ],
        dts: 'src/assets/type/auto-import.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        // 要搜索组件的目录的相对路径
        dirs: ['src/components'],
        // 组件的有效文件扩展名。
        extensions: ['vue', '.ts', '.js', '.mjs'],
        // 搜索子目录
        deep: true,
        // 生成 `components.d.ts` 全局声明，
        // 也接受自定义文件名的路径
        dts: 'src/assets/type/components.d.ts',
        // 允许子目录作为组件的命名空间前缀。
        directoryAsNamespace: false,
        // 忽略命名空间前缀的子目录路径
        // 当`directoryAsNamespace: true` 时有效
        globalNamespaces: [],
        // 自动导入指令
        // 默认值：Vue 3 的`true`，Vue 2 的`false`
        // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
        directives: true,
        include: [/.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx?$/, /\.jsx?$/], // 添加对 tsx 和 jsx 文件的支持
        exclude: [/[/]node_modules[/]/, /[/].git[/]/, /[/].nuxt[/]/],
      }),
    ],
    // 设置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // @代替src
        '#': path.resolve(__dirname, './types'), // #代替types
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
  });
};
