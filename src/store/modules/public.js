

/**
 * 
 * @property {string}    tabBar                底部栏当前路由
 * @property {Boolean}   phone_show            账号申请弹窗
**/
const PUBLIC = {
    state: () => ({
        tabBar: 'home',
        phone_show: false,
    }),
    mutations: {
        tabBarFun(state, data) {
            state.tabBar = data;
        },
        phoneShowFun(state, data) {
            state.phone_show = data;
        },
    },
    actions: {

    },
    modules: {

    }
}

export default PUBLIC

