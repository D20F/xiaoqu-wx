import btnGreen from './btnGreen/index.vue'
import tabBar from './tabBar/index.vue'


function plugins(Vue) {
  Vue.component("btnGreen", btnGreen);
  Vue.component("tabBar", tabBar);

}

// 全局注册的组件在微信小程序里面不兼容

export default plugins;