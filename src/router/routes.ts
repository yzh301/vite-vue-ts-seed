import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login.vue'), // 路由懒加载
  },
  {
    path: '/home',
    component: () => import('@/pages/home.vue'),
    redirect: '/home/user', // 新增 重定向
    children: [
      {
        path: 'user', // 注意子路由的路径是相对于父路由的
        component: () => import('@/pages/user.vue'),
      },
      {
        path: 'manage', // 同样，子路由的路径也是相对于父路由的
        component: () => import('@/pages/manage.vue'),
      },
    ],
  },

  // 该项放置在最后
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/notFound.vue'),
  },
];

export default routes;
