import { createApp } from 'vue';
import app from './App.vue';
import router from './router/index';
import store from './store';
import '@/assets/styles/index.scss';
const App = createApp(app);
App.use(store).use(router);
App.mount('#app');
