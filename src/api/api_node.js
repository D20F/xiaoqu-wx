import { getData, postData } from '@/utils/request/uniapp_request_node.js'

/*
    获取账号余额
    params:{
        account: "hudeling1111",    帐号
        code: "baz.token",          合约名
        symbol: "HBB"               币种，环保金：HBB, 积分：JF
    }
*/
export const getCurrencyBalance = (reqData) => {
    const url = '/v1/chain/get_currency_balance';
    const data = reqData;
    return postData(url, data);
}
/*
    获取链上账号信息
    params:{
        account: "hudeling1111",    帐号
    }
*/
export const getAccount = (reqData) => {
    const url = '/v1/chain/get_account';
    const data = reqData;
    return postData(url, data);
}
