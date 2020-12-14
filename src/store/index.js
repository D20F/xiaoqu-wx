import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


/**
 * 
 * @property {object}    PUBLIC                公共信息    
 * @property {object}    ACCOUNT               账号信息    
 * @property {object}    GARBAGE_DELIVERY      垃圾投递    
**/
import PUBLIC from './modules/public'
import ACCOUNT from './modules/account'
import GARBAGE_DELIVERY from './modules/garbage_delivery'


const store = new Vuex.Store({
    modules: {
        account: ACCOUNT,
        public: PUBLIC,
        garbageDelivery: GARBAGE_DELIVERY,
    }
})

export default store