<template>
    <view class="popupbox">
        <view class="mask" @click="close"></view>
        <view v-if="step == 0" class="popup">
            <view class="space"></view>
            <u-steps
                :list="numList"
                mode="number"
                :current="step"
                active-color="#00b075"
            ></u-steps>
            <image src="https://img.sporeblockchain.cn/static/home/phone.png" />
            <view>
                <text>微信登录</text>
                <text>申请账号中,请授权用户信息</text>
            </view>
            <button
                type="default"
                class="btn green"
                open-type="getUserInfo"
                @getuserinfo="getuserinfo"
            >
                授权用户信息
            </button>
        </view>
        <view v-else class="popup">
            <view class="space"></view>
            <u-steps
                :list="numList"
                mode="number"
                :current="step"
                active-color="#00b075"
            ></u-steps>
            <image src="https://img.sporeblockchain.cn/static/home/phone.png" />
            <view>
                <text>微信登录</text>
                <text>申请账号中,请授权手机号码</text>
            </view>
            <button
                type="default"
                class="btn green"
                open-type="getPhoneNumber"
                @getphonenumber="decryptPhoneNumber"
            >
                授权手机号
            </button>
        </view>
        <view class="close" @click="close">
            <image
                src="https://img.sporeblockchain.cn/static/my/Popup_icon_down@3x.png"
            />
        </view>
    </view>
</template>
<script>
import { getSession, wechatLogin } from "@/api/api_mapi";
import { setStorage } from "@/utils/storage.js";
import WXBizDataCrypt from "@/utils/wx/WXBizDataCrypt";

export default {
    name: "popup",
    props: {},
    data() {
        return {
            step: 0,
            numList: [
                {
                    name: "开始申请",
                },
                {
                    name: "用户信息",
                },
                {
                    name: "手机号",
                },
            ],
            wx: {
                unionid: "",
                session_key: "",
                phoneNumber: "",
            },
            appid: "wx666a35d6e6a21443", //小程序appid
            secret: "3b8aa5499907806f7ab3e19a20925dc9", //小程序secret
        };
    },
    created() {
        this.login();
    },
    methods: {
        login() {
            let that = this;
            uni.login({
                provider: "weixin",
                success: function (res) {
                    console.log("res code", res);
                    if (res.code) {
                        //微信登录成功 已拿到code
                        let data = {
                            code: res.code,
                        };
                        getSession(data)
                            .then((res) => {
                                console.log(res);
                                if (res.status == 200) {
                                    that.wx.session_key = res.data.session_key;
                                } else {
                                    console.log("err");
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: "微信登录失败",
                        });
                    }
                },
            });
        },
        decryptPhoneNumber(e) {
            let that = this;
            console.log(e);
            if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
                console.log("拒绝授权");
                this.close();
            } else {
                //允许授权
                // e.detail.encryptedData      //加密的用户信息
                // e.detail.iv     //加密算法的初始向量  时要用到
                console.log(this.wx);
                var pc = new WXBizDataCrypt(this.appid, this.wx.session_key);
                var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);

                console.log("解密后 data: ", data);
                console.log("解密后 data: ", data.phoneNumber);
                this.wx.phoneNumber = data.phoneNumber;

                uni.showLoading({
                    title: "登录中",
                });

                let parse = {
                    unionid: this.wx.unionid,
                    phone: this.wx.phoneNumber,
                };
                wechatLogin(parse)
                    .then((res) => {
                        // console.log(res);
                        that.step = 2;
                        if (res.status == 200) {
                            console.log("sucess");
                            console.log(res);
                            console.log(parse.phone);
                            uni.hideLoading();
                            setStorage("phoneNumber", parse.phone);
                            setStorage("account", res.data.account);
                            setStorage("avatar", res.data.head_url);
                            that.$store.commit("phoneNumberFun", parse.phone);
                            that.$store.commit("accountFun", res.data.account);
                            that.$store.commit("avatarFun", res.data.head_url);
                            uni.reLaunch({
                                url: '/pages/home/home'
                            });
                            // console.log(that.$store.state.account.phoneNumber);
                        } else {
                            console.log("err");
                            uni.hideLoading();
                            uni.showToast({
                                title: "申请账号失败",
                                icon: "none",
                            });
                        }
                        that.close();
                    })
                    .catch((err) => {
                        that.close();
                        uni.hideLoading();
                        uni.showToast({
                            title: "申请账号失败",
                            icon: "none",
                        });
                        console.log(err);
                    });
            }
        },
        getuserinfo(e) {
            let that = this;

            console.log(e);
            console.log(this.wx);

            if (e.detail.errMsg == "getUserInfo:fail user deny") {
                console.log("拒绝授权");
                this.close();
            } else {
                //允许授权
                // e.detail.encryptedData      //加密的用户信息
                // e.detail.iv     //加密算法的初始向量  时要用到

                var pc = new WXBizDataCrypt(this.appid, this.wx.session_key);
                var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);

                console.log("解密后 data: ", data);
                console.log("解密后 data: ", data.unionId);
                this.wx.unionid = data.unionId;
                this.step = 1;
            }
        },
        close() {
            this.$store.commit("phoneShowFun", false);
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.popup {
    width: 80%;
    height: 820upx;
    border-radius: 25upx;
    margin: 250upx auto 0 auto;
    background-color: #ffffff;
    text-align: center;
    z-index: 10000;
    image:nth-child(3) {
        position: relative;
        width: 320upx;
        height: 320upx;
        margin: 0 auto;
    }
    view:nth-child(4) {
        width: 80%;
        text-align: center;
        margin: 0 auto;
        text:nth-child(1) {
            color: $black-1;
            font-size: $font-size-6;
            font-weight: 600;
            margin-bottom: 15upx;
        }
        text:nth-child(2) {
            color: $gray-5;
            font-size: $font-size-5;
        }
    }
    .btn {
        width: 80%;
        height: 90upx;
        border-radius: 15upx;
        margin: 80upx auto 0 auto;
        text-align: center;
        color: #ffffff;
        font-size: 32upx;
        line-height: 90upx;
    }
}
.close {
    width: 112upx;
    height: 112upx;
    border: 1upx solid #707070;
    border-radius: 50%;
    z-index: 10000;
    margin: 60upx auto 0 auto;
    background: rgba($color: #ffffff, $alpha: 0.1);
    image {
        position: relative;
        width: 48upx;
        height: 48upx;
        margin: 32upx auto 32upx auto;
    }
}
.popupbox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
}
.mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 10000;
}
.space {
    width: 100%;
    height: 50upx;
}
.green {
    background-color: #00b075;
}
button[type="default"] {
    background-color: #00b075;
}
</style>