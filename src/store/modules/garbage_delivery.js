

/**
 * 
 * @property {Array}    delivery              投递订单  
 * @property {Array}    garbageList     垃圾类型数组    
 * @property {bool}     weightTip        获取重量动画显示
**/
const GARBAGE_DELIVERY = {
    state: () => ({
        delivery: [],
        basket_state: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        is_unboxing: false,
        is_packing: false,
        garbageList: [],
        weightTip: false,
    }),
    mutations: {
        updateBasketState(state, data) {
            state.basket_state = data;
        },
        setUnboxing(state, data) {
            state.is_unboxing = data;
        },
        setPacking(state, data) {
            state.is_packing = data;
        },
        garbageListFun(state, data) {
            state.garbageList = data;
        },
        weightTipFun(state, data) {
            state.weightTip = data;
        },
        deliveryFun(state, data) {

        },

    },
    actions: {

    },
    modules: {

    }
}

export default GARBAGE_DELIVERY

