import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ecc from 'eosjs-ecc/lib'
import {PrivateKey} from 'eosjs-ecc'
import { Api, JsonRpc } from 'eosjs';
// import fetch from 'node-fetch';
const fetch = require("node-fetch")
import { TextDecoder, TextEncoder } from 'util';
const rpc = new JsonRpc('https://node.sporeblockchain.com/', { fetch });
import Decimal from "decimal.js"
import {eosConfigure} from './eosConfig'

const eosConfig = new eosConfigure();

const creator_account = eosConfig.creator_account     //创建者
const creator_private_key = eosConfig.creator_private_key; //创建者私钥

const signatureProvider = new JsSignatureProvider([creator_private_key]);
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

/**
 * 创建帐号
 * @param {string} name 账户名
 * @param {string} publicKey 公钥
 */
async function createAcc(name: string, publicKey: string) {
    const transaction = {
        actions: [{
            account: 'baz',
            name: 'newaccount',
            authorization: [{
                actor: creator_account,
                permission: 'active',
            }],
            data: {
                creator: creator_account,
                name: name,
                owner: {
                    threshold: 1,
                    keys: [
                        {
                            key: publicKey,
                            weight: 1
                        }
                    ],
                    accounts: [{
                        permission: {
                            actor: creator_account,
                            permission: "reset"
                        },
                        weight: 1
                    }],
                    waits: []
                },
                active: {
                    threshold: 1,
                    keys: [{
                        key: publicKey,
                        weight: 1
                    }],
                    accounts: [{
                        permission: {
                            actor: creator_account,
                            permission: "active"
                        },
                        weight: 1
                    }],
                    waits: []
                },
            }
        }]
    }
    
    return api.transact(transaction, {
        blocksBehind: 3,
        expireSeconds: 30,
    })

}



async function setApiAction(accountName:string,data:any){
    try{
        await api.transact({
            actions:[{
                account:eosConfig.CONTRACT_ALLOCATION,
                name:"transfer",
                authorization:[{
                    actor:accountName,
                    permission: 'active',
                }],
                data:data
            }]
        },{
            blocksBehind: 3,
            expireSeconds: 30,
        })
        return true
    }catch(e){
      console.info("setApiAction err:",e)
        return false
    }
}





//以下代码为测试
//创建账号
// createAcc("m1511e55ce5d","POG66ZtTSqZ7qRjc2Edwq3DVvunuQedTiWDHq7BB7hvQuWVXakszr")

// let data = {
//     from :"m1511e55ce5d",
//     to:"hudeling",
//     quantity:`${ new Decimal(0.01).toFixed(4) } UE`,
//     memo:"a:b"
// }

// setApiAction("m1511e55ce5d",data)
// generatePubPiv()
export {
    createAcc,
    updatePublicKey,
    get_account,
    setApiAction,
    generatePubPiv,
    getCurrencyBalance
};