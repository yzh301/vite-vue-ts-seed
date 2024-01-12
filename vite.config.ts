/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-12 09:12:50
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-12 14:57:27
 * @FilePath: \vite-vue-ts-seed\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
const pathSrc = path.resolve(__dirname, 'src');
import UnoCSS from 'unocss/vite';
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  console.log('🚀 ~ comments, module-env:', mode, env, command);
  console.log('object', env.VITE_APP_PORT);

  return defineConfig({
    envDir: path.resolve(__dirname, './src/env'),
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
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
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
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'), // 自动导入组件类型声明文件位置，默认根目录
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'], // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
        // 要搜索组件的目录的相对路径
        dirs: ['src/components', 'src/**/components'],
        // 组件的有效文件扩展名。
        extensions: ['vue', '.ts', '.js', '.mjs'],
        // 搜索子目录
        deep: true,
        // 生成 `components.d.ts` 全局声明，
        // 也接受自定义文件名的路径
        dts: path.resolve(pathSrc, 'types', 'components.d.ts'), //  自动导入组件类型声明文件位置，默认根目录
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
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      UnoCSS({
        /* options */
      }),
      {
        ...viteCompression(),
        apply: 'build',
      },
    ],
    server: {
      host: 'localhost',
      port: Number(env.VITE_APP_PORT),
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://www.youlai.tech:9999', // 有来商城线上接口地址
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },

    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
        format: {
          comments: false, // 删除注释
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            elementIcons: ['@element-plus/icons-vue'],
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split('.');
            let extType = info[info.length - 1];
            // console.log('文件信息', assetInfo.name)
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'media';
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img';
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts';
            }
            return `${extType}/[name].[hash].[ext]`;
          },
        },
      },
    },
  });
};
