<template>
    <view class="login">
        <view class="login_tab">
            <text :class="{font_gray_2:!state}">登录</text>
        </view>

        <!-- 登录 -->
        <view class="public_box">
            <view class="input_box">
                <text class="uniText_left">手机号码</text>
                <input v-model="phone_number" class="input" type="number" placeholder="请输入您的手机号码" />
                <text class="getCode font_green_1" @click="getCodeFun" v-if="getCode_state">获取</text>
                <text class="getCode font_gray_1" v-else>已发送 {{getCode_time}}</text>
            </view>
            <view class="input_box">
                <text class="uniText_left">验证码</text>
                <input
                    v-model="Verification_code"
                    type="number"
                    maxlength="6"
                    placeholder="请输入您的短信验证码"
                />
            </view>
            <view class="blank"></view>
            <view
                @click="confirm"
                class="btn"
                :class="{background_color_green_4:Verification_code.length > 0,background_color_green_3:Verification_code.length == 0}"
            >
                <text>登录</text>
            </view>
            <view class="blank_2"></view>
        </view>

        <text class="protocol">
            登录代表您已同意
            <text>用户协议</text>
            <text>和</text>
            <text>隐私协议</text>
        </text>
    </view>
</template>

<script>
import { regular_phone } from "@/utils/regular";
import { getVerificationCode, createAccount } from "@/api/api_mapi";
import { hex_md5 } from "@/utils/CryptoAES/md5.js";
import public_mixin from "@/mixins/public.js";
import CryptoAES from "@/utils/CryptoAES/CryptoAES.js";
import { setStorage } from "@/utils/storage.js";

export default {
    data() {
        return {
            state: true, //页面步骤状态
            input_password: true, //input type 密码属性
            getCode_state: true, // 获取按钮 显示
            getCode_time: 0, //获取按钮 时间显示
            phone_number: "", //手机号
            Verification_code: "", //验证码
            password: "", //密码
        };
    },
    mixins: [public_mixin],
    methods: {
        getCodeFun() {
            if (regular_phone(this.phone_number)) {
                this.getCode_time = 60;
                this.getCode_state = false;
                var interval = setInterval(() => {
                    this.getCode_time = this.getCode_time - 1;
                    if (this.getCode_time == 0) {
                        clearInterval(interval);
                        this.getCode_state = true;
                    }
                }, 1000);
                let data = {
                    phone: this.phone_number,
                };
                getVerificationCode(data)
                    .then((res) => {
                        console.log("res", res);
                    })
                    .catch((err) => console.log("err", err));
            } else {
                uni.showToast({
                    title: "手机号格式错误",
                    icon: "none",
                    duration: 2000,
                });
            }
        },
        async confirm() {
            if (this.stop_click) {
                return;
            }
            this.stop_click = true;

            let that = this;
            if (this.Verification_code.length == 6) {
                uni.showLoading({
                    title: "登录中",
                    icon: "loading",
                });
                let data = {
                    phone: this.phone_number,
                    code: this.Verification_code,
                };
                createAccount(data)
                    .then((res) => {
                        if (res.status == 200) {
                            let Verification_code = hex_md5(
                                that.Verification_code
                            );
                            let privateKey = CryptoAES.decrypt(
                                res.data.token,
                                Verification_code
                            );

                            setStorage("phoneNumber", that.phone_number);
                            setStorage("privateKey", privateKey);
                            setStorage("account", res.data.account);

                            uni.hideLoading();
                            that.jumpRouter_redirect("/pages/home/home");
                        } else if (res.status == 1001) {
                            uni.showToast({
                                title: "验证码输入错误",
                                icon: "none",
                                duration: 2000,
                            });
                        } else if (res.status == 1005) {
                            uni.showToast({
                                title: "当天发送验证码已达上限",
                                icon: "none",
                                duration: 2000,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        uni.hideLoading();
                        uni.showToast({
                            title: "系统出错,请重新登录",
                            icon: "none",
                            duration: 2000,
                        });
                    });
            } else {
                uni.showToast({
                    title: "验证码格式错误",
                    icon: "none",
                    duration: 2000,
                });
            }
            setTimeout(() => {
                this.stop_click = false;
            }, 2000);
        },
    },
    onLoad() {},
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.login {
    width: 100%;
    height: 100%;
    position: relative;
}
.login_tab {
    width: 80%;
    margin: 40upx auto 0 auto;
    text {
        font-size: $font-size-7;
        text-align: left;
        display: inline-block;
        font-weight: 600;
    }
    text:nth-child(2) {
        margin: 0 30upx;
    }
}
.protocol {
    width: 75%;
    position: fixed;
    bottom: 40upx;
    left: 12.5%;
    text-align: center;
    font-size: $font-size-2;
    text {
        font-size: $font-size-2;
        display: inline;
    }
    text:nth-child(1) {
        color: $green-4;
    }
    text:nth-child(3) {
        color: $green-4;
    }
}
.public_box {
    width: 80%;
    margin: 0 auto;
}
.blank {
    width: 100%;
    height: 150upx;
}
.blank_2 {
    width: 100%;
    height: 70upx;
}

.input_box {
    margin-top: 100upx;
    text:nth-child(1) {
        margin: 50upx 0;
        font-size: $font-size-5;
        font-weight: 600;
    }
    input {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-4;
        width: 70%;
    }
    image {
        display: inline-block;
        vertical-align: middle;
        width: 90upx;
        right: -20%;
        height: 90upx;
    }
}
.getCode {
    width: 30%;
    display: inline-block;
    text-align: right;
    font-size: $font-size-4;
    vertical-align: middle;
}
.btn {
    width: 100%;
    height: 90upx;
    border-radius: 15upx;
    margin: 0 auto;
    // box-shadow: 0px 5px 40px -10px $green-4;
    text-align: center;
    text {
        color: #ffffff;
        line-height: 90upx;
        letter-spacing: 20upx;
        font-size: $font-size-5;
    }
}
</style>
