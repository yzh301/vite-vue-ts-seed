// 声明在window上自定义属性

declare interface Window {
  eventBus: any;
}

//声明.vue文件
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}
