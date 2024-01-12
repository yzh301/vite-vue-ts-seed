import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});
// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('🚀 ~ request.interceptors.request.use ~ config:', config);
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message } = response.data;
    // 登录成功
    if (code == '200') {
      return response.data.data;
    }

    ElMessage.error(message || '系统出错');
    return Promise.reject(new Error(message || 'Error'));
  },
  (error: any) => {
    if (error.response.data) {
      const { code, message } = error.response.data;
      // token 过期，跳转登录页
      if (code === 'A0230') {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
          localStorage.clear(); // @vueuse/core 自动导入
          window.location.href = '/';
        });
      } else {
        ElMessage.error(message || '系统出错');
      }
    }
    return Promise.reject(error.message);
  }
);

export default request;
