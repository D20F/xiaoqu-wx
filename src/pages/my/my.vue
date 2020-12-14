<template>
    <view class="my">
        <view class="tap">
            <view
                v-if="phoneNumber == ''"
                class="not_login"
                @click="login"
            >
                <btnGreen content="登录·注册" />
                <image src="https://img.sporeblockchain.cn/static/my/img_default_head@3x.png" />
            </view>
            <view
                v-else
                class="not_login"
                @click="jumpRouter('/pages/my/my_information/my_information')"
            >
                <view>
                    <text v-if="nickName == ''" class="uniText_left font_weight_black1_48">环保能手 {{phoneNumber.slice(7,11)}}</text>
                    <text v-else class="font_weight_black1_48 uniText_left">{{nickName}}</text>
                    <text class="uniText_left font_gray1_20">加入小蛐环保的第{{day}}天</text>
                </view>
                <image v-if="avatar == ''" src="https://img.sporeblockchain.cn/static/my/img_default_head@3x.png" />
                <image v-else class="avter" :src="avatar" />
            </view>
        </view>
        <view class="cardBox">
            <view class="card card_left" @click="jumpRouter('/pages/my/income/income')">
                <text>我的收益</text>
                <text>{{balance}} 环保金</text>
                <text class="font_green_1">余额可进行提现消费</text>
            </view>
            <view class="card card_right" @click="jumpRouter('/pages/my/totalRecovery/recycle')">
                <text>回收总量</text>
                <text>
                    {{total}}
                    <text>公斤</text>
                </text>
                <text class="font_purple_1">感谢您为环保贡献的力量</text>
            </view>
        </view>
        <view class="features">
            <view
                class="vertical_columnImg_layout"
                v-for="(item,index) of list"
                :key="index"
                @click="jump(item.router)"
            >
                <image :src="item.src" />
                <text>{{item.title}}</text>
                <text :class="{red:item.title == '消息通知',gray:item.title == '绑定门户'}">{{item.content}}</text>
                <image
                    class="icon"
                    src="https://img.sporeblockchain.cn/static/my/icon_next_gray@3x.png"
                />
            </view>
        </view>

        <tabBar></tabBar>
        <phonePopup v-if="phone_show"></phonePopup>
    </view>
</template>

<script>
import tabBar from "@/component/tabBar/index";
import btnGreen from "@/component/btnGreen/index";
import public_mixin from "@/mixins/public.js";
import garbage_delivery from "@/mixins/garbage_delivery.js";
import { getCurrencyBalance, getAccount } from "@/api/api_node";
import { getPersonalDelivery, getMyInformation } from "@/api/api_mapi";
import { setStorage } from "@/utils/storage.js";
import { Decimal } from "decimal.js";
import phone_popup from "@/component/phone_popup/index";

export default {
    data() {
        return {
            list: [
                {
                    title: "我的订单",
                    router: "/pages/my/order/my_order",
                    src:
                        "https://img.sporeblockchain.cn/static/my/my_icon_order@3x.png",
                    content: "",
                },
                {
                    title: "消息通知",
                    router: "/pages/my/notification/notification",
                    src:
                        "https://img.sporeblockchain.cn/static/my/my_icon_message@3x.png",
                    content: "",
                },
                {
                    title: "亲属账号",
                    router: "/pages/my/relativeAccount/account",
                    src:
                        "https://img.sporeblockchain.cn/static/my/my_icon_relatives@3x.png",
                    content: "",
                },
                {
                    title: "绑定门户",
                    router: "/pages/my/bindPortal/bindPortal",
                    src:
                        "https://img.sporeblockchain.cn/static/my/my_icon_portal@3x.png",
                    content: "",
                },
                {
                    title: "帮助中心",
                    router: "",
                    src:
                        "https://img.sporeblockchain.cn/static/my/my_icon_help@3x.png",
                    content: "",
                },
                {
                    title: "设置",
                    router: "/pages/my/my_setting/my_setting",
                    src:
                        "https://img.sporeblockchain.cn/static/my/my_icon_set@3x.png",
                    content: "",
                },
            ],
            balance: "0",
            total: "0.00",
            day: 1,
        };
    },
    components: {
        tabBar,
        btnGreen,
        phonePopup: phone_popup,
    },
    mixins: [public_mixin, garbage_delivery],
    methods: {
        jump(data) {
            if (data == "/pages/my/my_setting/my_setting") {
                this.jumpRouter_detection(data);
            } else {
                this.jumpRouter(data);
            }
        },
        getBalance() {
            let that = this;
            let data = {
                account: this.$store.state.account.account,
                code: "baz.token",
                symbol: "HBB",
            };
            getCurrencyBalance(data)
                .then((res) => {
                    if (JSON.stringify(res) == "[]") {
                        that.balance = "0";
                    } else {
                        that.balance = res[0].split(' ')[0];
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getCalculateDay() {
            let that = this;
            let data = {
                account_name: this.$store.state.account.account,
            };
            getAccount(data)
                .then((res) => {
                    let createDate = res.created + "Z";
                    let createTime = new Date(createDate).getTime();
                    let curTime = Date.now();
                    that.day = new Decimal(curTime)
                        .sub(createTime)
                        .div(86400000)
                        .toFixed(0);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getPersonalDelivery() {
            let data = {
                applets: this.$store.state.account.account,
            };
            getPersonalDelivery(data)
                .then((res) => {
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.total = new Decimal(res.data.total).toFixed(2);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getMyInformation() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
            };
            getMyInformation(data)
                .then((res) => {
                    console.log(res);
                    if (res.data.headurl) {
                        that.$store.commit("avatarFun", res.data.headurl);
                        setStorage("avatar", res.data.headurl);
                    }

                    if (res.data.nickname) {
                        that.$store.commit("nickNameFun", res.data.nickname);
                        setStorage("nickName", res.data.nickname);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        login() {
            this.$store.commit("phoneShowFun", true);
        },
		init(){
			this.getBalance();
			this.getCalculateDay();
			this.getPersonalDelivery();
			this.getMyInformation();
		}
    },
    onLoad() {
        // console.log(this.$store.state.garbageDelivery);
    },
    computed: {
        avatar() {
            return this.$store.state.account.avatar;
        },
        phoneNumber() {
            return this.$store.state.account.phoneNumber;
        },
        nickName() {
            return this.$store.state.account.nickName;
        },
        phone_show() {
            return this.$store.state.public.phone_show;
        },
    },
	watch: {
	    "$store.state.account.account": {
	        handler(newVal) {
	            this.init();
	        },
	    },
	},
    onShow(){
        // this.send(this.sendType("selectBox")).then((res) => {
        //     uni.closeSocket();
        // });
        this.init();
    }
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.my {
    width: 100%;
    height: 100%;
    position: relative;
}
.tap {
    width: 90%;
    margin: 50upx auto;
    .not_login {
        display: flex;
        justify-content: space-between;
        align-items: center;
        image {
            width: 180upx;
            height: 180upx;
        }
        view {
            width: 250upx;
            margin: 0;
            text:nth-child(1){
                white-space: nowrap;
            }
        }
        .avter {
            width: 180upx;
            height: 180upx;
            border-radius: 50%;
            overflow: hidden;
            image {
                width: 180upx;
                height: 180upx;
            }
        }
    }
    .fulfil_login {
        display: flex;
        justify-content: space-between;
        align-items: center;
        view:nth-child(1) {
            text {
                text-align: left;
            }
            text:nth-child(1) {
                color: $black-1;
                font-size: 56upx;
                font-weight: 600;
            }
            text:nth-child(2) {
                margin-top: 20upx;
                color: $gray-1;
                font-size: $font-size-3;
            }
        }
        view:nth-child(2) {
            width: 180upx;
            height: 180upx;
            border-radius: 50%;
            overflow: hidden;
            image {
                width: 180upx;
                height: 180upx;
            }
        }
    }
}
.cardBox {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .card {
        height: 190upx;
        width: 47.5%;
        padding: 20upx 0 0 20upx;
        text {
            text-align: left;
        }
        text:nth-child(1) {
            color: $gray-5;
            font-size: $font-size-4;
        }
        text:nth-child(2) {
            font-size: $font-size-5;
            color: $black-1;
            font-weight: 600;
            text {
                display: inline-block;
            }
        }
        text:nth-child(3) {
            font-size: $font-size-2;
        }
    }
    .card_left {
        background: url("https://img.sporeblockchain.cn/static/my/my_bg_green@3x.png")
            no-repeat;
        background-size: 100%;
        text:nth-child(3) {
            margin-top: 10upx;
            width: 80%;
            border-radius: 10upx;
            background-color: $green-5;
        }
    }
    .card_right {
        background: url("https://img.sporeblockchain.cn/static/my/my_bg_purple@3x.png")
            no-repeat;
        background-size: 100%;
        text:nth-child(3) {
            margin-top: 10upx;
            width: 100%;
            border-radius: 10upx;
            background-color: $purple-2;
        }
    }
}
.features {
    width: 90%;
    margin: 0 auto;
    .vertical_columnImg_layout {
        text {
            font-size: $font-size-5;
        }
    }
}
</style>
