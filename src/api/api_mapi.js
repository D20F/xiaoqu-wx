import { getData, postData } from '@/utils/request/uniapp_request_mapi.js'




/*
    获取短信验证
    params:{   
        phone: 211414141,       手机号
    }
 */
export const getVerificationCode = (reqData) => {
    const url = '/v1/send_information';
    const data = reqData;
    return postData(url, data);
}

/*
    创建账号
    params:{   
        phone: 211414141,       手机号
        code: 12345,            验证码 
    }
 */
export const createAccount = (reqData) => {
    const url = '/v1/create_account';
    const data = reqData;
    return postData(url, data);
}

/*
    更新头像  --直接在页面使用uploadFile
    params:{
        applets: "hudeling1111",    帐号
    }
*/
// export const Uploadhead = (reqData) => {
//     const url = '/v1/uploadhead';
//     const data = reqData;
//     return postData(url, data);
// }

/*
    查询个人分类垃圾
    params:{
        applets: "hudeling1111",    帐号
    }
*/
export const getPersonalDelivery = (reqData) => {
    const url = '/v1/personal_delivery';
    const data = reqData;
    return getData(url, data);
}

/*
    查询积分详情
    params:{
        applets: "hudeling1111",    帐号
    }
*/
export const getPointsDetails = (reqData) => {
    const url = '/v1/integral_details';
    const data = reqData;
    return getData(url, data);
}

/*
    获取周边设备
    params:{   
        applets: "hudeling1111",    帐号
        latitude: 22,
        longitude: 22,
    }
*/
export const getPeripheral = (reqData) => {
    const url = '/v1/get_peripheral';
    const data = reqData;
    return getData(url, data);
}

/*
    更改昵称
    params:{
        applets: "hudeling1111",     帐号
        nick_name: "王某",             昵称
    }
*/
export const changeNickName = (reqData) => {
    const url = '/v1/improve_information';
    const data = reqData;
    return postData(url, data);
}

/*
    消息通知
    params:{
        applets: "hudeling1111",     帐号
        type: 0,             消息类型, 默认全部，0：公共，1：违规，2：消息
    }
*/
export const getNotification = (reqData) => {
    const url = '/v1/get_notification';
    const data = reqData;
    return getData(url, data);
}

/*
    我的信息
    params:{
        applets: "hudeling1111",     帐号
    }
*/
export const getMyInformation = (reqData) => {
    const url = '/v1/get_my_information';
    const data = reqData;
    return getData(url, data);
}

/*
    我的订单
    params:{
        applets: "hudeling1111",     帐号
        type: 0,             订单类型, 0：机柜投递，1：上门回收，2：积分兑换
    }
*/
export const getMyOrder = (reqData) => {
    const url = '/v1/get_my_order';
    const data = reqData;
    return getData(url, data);
}

/*
    机柜投递详情
    params:{
        applets: "hudeling1111",     帐号
        id: '',                      订单id
    }
*/
export const getDeliveryDetails = (reqData) => {
    const url = '/v1/get_delivery_details';
    const data = reqData;
    return getData(url, data);
}

/*
    积分兑换商品订单详情
    params:{
        applets: "hudeling1111",     帐号
        id: '',                      订单id
    }
*/
export const getOrderDetails = (reqData) => {
    const url = '/v1/get_order_details';
    const data = reqData;
    return getData(url, data);
}



/*
    门户管理 - 更新
    params:{
        applets: "hudeling1111",    帐号
        id: "",                     地址唯一编号
        nickName: "",               昵称
        phone: "",                  手机号
        area: "",                   区
        regin: "",                  详细地址
    }
*/
export const portalAddressUpdate = (reqData) => {
    const url = '/v1/portal_address/update';
    const data = reqData;
    return getData(url, data);
}

/*
    门户管理 - 获取
    params:{
        applets: "hudeling1111",    帐号
    }
*/
export const portalAddressCheck = (reqData) => {
    const url = '/v1/portal_address/check';
    const data = reqData;
    return getData(url, data);
}

/*
    门户管理 - 新增
    params:{
        applets: "hudeling1111",    帐号
        nickName: "",               昵称
        phone: "",                  手机号
        area: "",                   区
        regin: "",                  详细地址
    }
*/
export const portalAddressAdd = (reqData) => {
    const url = '/v1/portal_address/add';
    const data = reqData;
    return getData(url, data);
}

/*
    门户管理 - 删除
    params:{
        applets: "hudeling1111",    帐号
        id: "",               地址唯一id
    }
*/
export const portalAddressDelete = (reqData) => {
    const url = '/v1/portal_address/delete';
    const data = reqData;
    return getData(url, data);
}

/*
    ao平台设备商品详情  售货机详情
    params:{
        dev_id: "",    设备id
    }
*/
export const productDetails = (reqData) => {
    const url = '/v1/ao/product_details';
    const data = reqData;
    return getData(url, data);
}

/*
    ao积分扣除  购买扣除积分
    params:{
        applets:"",             小程序账号
        dev_id:"",              设备id
        price:"",               价格
        pro_id:"",              商品id
        lane_no:"",             货道编号
    }
*/
export const deductionIntegral = (reqData) => {
    const url = '/v1/ao/deduction_integral';
    const data = reqData;
    return postData(url, data);
}

/*
    亲属申请投递卡  
    params:{
        applets: "sdad"         小程序账号
        nickname:""             昵称
        phone:   ""             手机号
        area:    ""             详细到区
        region:   ""            详细地址
        binding: ""             绑定运营商
    }
*/
export const applicationDelivery = (reqData) => {
    const url = '/v1/application_delivery';
    const data = reqData;
    return postData(url, data);
}

/*
    新增亲属账号
    params:{
        applets: "sdad"         小程序账号
        nickname:""             昵称
        phone:   ""             手机号
        area:    ""             详细到区
        region:   ""            详细地址
        binding:   ""           运营商
    }
*/
export const relativesAdd = (reqData) => {
    const url = '/v1/relatives_add';
    const data = reqData;
    return getData(url, data);
}

/*
    查询亲属账号
    params:{
        applets: "sdad"         小程序账号
    }
*/
export const relativesCheck = (reqData) => {
    const url = '/v1/relatives_check';
    const data = reqData;
    return getData(url, data);
}

/*
    删除亲属账号
    params:{
        relativesid: ""         投递卡id
    }
*/
export const relativesDel = (reqData) => {
    const url = '/v1/relatives_del';
    const data = reqData;
    return postData(url, data);
}

/*
    获取微信 session
    params:{
        code: ""         小程序登录code
    }
*/
export const getSession = (reqData) => {
    const url = '/v1/get_session';
    const data = reqData;
    return postData(url, data);
}

/*
    微信快捷创建账号
    params:{
        unionid: ""       唯一的unionid
        phone: ""         手机号
    }
*/
export const wechatLogin = (reqData) => {
    const url = '/v1/wechat_login';
    const data = reqData;
    return postData(url, data);
}

/*
    获取排行榜
    params:{
        applets: ""       账号名
    }
*/
export const getActivityRanking = (reqData) => {
    const url = '/v1/activity/ranking';
    const data = reqData;
    return getData(url, data);
}

/*
    提交成绩
    params:{
        applets: ""         账号名
        time: ""            时间(秒数)
        score: ""           分数
    }
*/
export const ActivitySetRanking = (reqData) => {
    const url = '/v1/activity/set_ranking';
    const data = reqData;
    return postData(url, data);
}
