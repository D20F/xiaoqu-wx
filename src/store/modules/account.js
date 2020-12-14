

/**
 * 
 * @property {object}  socketTask      socket对象                
 * @property {number}  phoneNumber     手机号码                
 * @property {string}  deviceNumber    设备号                
 * @property {string}  publicKey       公钥                
 * @property {string}  privateKey      私钥                
 * @property {string}  account         账号名
 * @property {string}  nickName        昵称
 * @property {string}  avatar          头像              
 * @property {string}  randomKey       随机key 保证唯一                         
**/
const GARBAGE_DELIVERY = {
    state: () => ({
        socketTask: {},
        deviceNumber: '',
        phoneNumber: '',
        publicKey: '',
        privateKey: '',
        randomKey: '',
        account: '',//hudeling1112
        nickName: '',
        avatar: '',
    }),
    mutations: {
        socketTaskFun(state, data) {
            state.socketTask = data;
        },
        deviceNumberFun(state, data) {
            state.deviceNumber = data;
        },
        phoneNumberFun(state, data) {
            state.phoneNumber = data;
        },
        publicKeyFun(state, data) {
            state.publicKey = data;
        },
        privateKeyFun(state, data) {
            state.privateKey = data;
        },
        randomKeyFun(state, data) {
            state.randomKey = data;
        },
        accountFun(state, data) {
            state.account = data;
        },
        nickNameFun(state, data) {
            state.nickName = data;
        },
        avatarFun(state, data) {
            state.avatar = data;
        },
        
    },
    actions: {

    },
    modules: {

    }
}

export default GARBAGE_DELIVERY

