/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-12 09:12:50
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-12 14:19:40
 * @FilePath: \vite-vue-ts-seed\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import app from './App.vue';
import router from './router/index';
import store from './store';
import '@/assets/styles/index.scss';
import 'virtual:svg-icons-register';
import 'uno.css';
const App = createApp(app);

App.use(store).use(router).mount('#app');
