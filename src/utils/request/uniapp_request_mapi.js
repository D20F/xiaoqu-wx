
const baseURL = 'https://mapi.sporeblockchain.cn';

export const getData = (url, params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url:  baseURL + url, 
            data: params,
            header: {},
            method: 'GET',
            timeout: 30000,
            success: (res) => {resolve(res.data)},
            fail: (err) => {reject(err)}
        });
    })
}
export const postData = (url, params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url:  baseURL + url, 
            data: params,
            header: {},
            method: 'POST',
            timeout: 30000,
            success: (res) => {resolve(res.data)},
            fail: (err) => {reject(err)}
        });
    })
}























