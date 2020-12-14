<template>
    <view class="box">
        <view class="tabbar">
            <text>
                {{ commodity.price }}
                <text>积分</text>
            </text>
            <text>
                支付剩余时间
                <text>{{ minute }}</text>
            </text>
        </view>
        <view class="content">
            <text class="title">商品信息</text>
            <view class="line"></view>
            <view>
                <image :src="commodity.pro_img" />
                <view>
                    <text>{{ commodity.lane_no }}</text>
                    <text>{{ commodity.pro_name }}</text>
                    <!-- <text>
                        ￥
                        <text>{{ commodity.price }}</text>
                    </text> -->
                </view>
            </view>
        </view>
        <view class="complete">
            <text class="title">支付方式</text>
            <view class="line"></view>
            <view class="integral" @click="select_pay(1)">
                <view class="integral_content">
                    <view>
                        <image
                            src="https://img.sporeblockchain.cn/static//pointsMall/point.png"
                        />
                    </view>
                    <view>
                        <text>
                            积分支付
                            <!-- <text>10积分 = ￥1.00</text> -->
                        </text>
                    </view>
                    <view>
                        <image
                            v-if="pay == 1"
                            src="https://img.sporeblockchain.cn/static//pointsMall/ovals.png"
                        />
                        <image
                            v-else
                            src="https://img.sporeblockchain.cn/static//pointsMall/oval.png"
                        />
                    </view>
                </view>
                <!-- <view class="integral_tip">
                    <text>积分余额: 10.00</text>
                    <text>积分不足</text>
                </view> -->
            </view>
            <view class="wx" @click="select_pay(2)">
                <view>
                    <image
                        src="https://img.sporeblockchain.cn/static//pointsMall/wx.png"
                    />
                </view>
                <view>
                    <text>微信支付</text>
                </view>
                <view>
                    <image
                        v-if="pay == 2"
                        src="https://img.sporeblockchain.cn/static//pointsMall/ovals.png"
                    />
                    <image
                        v-else
                        src="https://img.sporeblockchain.cn/static//pointsMall/oval.png"
                    />
                </view>
            </view>
        </view>

        <btnGreen
            class="btn_bottom"
            mode="1"
            content="确认付款"
            @confirm="confirm"
        />
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import btnGreen from "@/component/btnGreen/index";
import { minute_conversion } from "@/utils/time/index.js";
import { deductionIntegral } from "@/api/api_mapi";
import { Decimal } from "decimal.js";

export default {
    name: "vendingMachine",
    components: {
        btnGreen,
    },
    data() {
        return {
            commodity: {},
            pay: 1,
            countdown: 900,
            countdown_timeouter: "",
        };
    },
    mixins: [public_mixin],
    methods: {
        confirm() {
            if (this.pay == 1) {
                this.deductionIntegral();
            } else if (this.pay == 2) {
                uni.showToast({
                    icon: "none",
                    title: "暂不支持",
                });
                // this.jumpRouter("/pages/pointsMall/vendingMachine/orderComplete");
            }
        },
        select_pay(index) {
            this.pay = index;
        },
        deductionIntegral() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
                dev_id: "865373045294464", //暂时写死
                price: this.commodity.price,
                pro_id: this.commodity.pro_id,
                lane_no: this.commodity.lane_no,
            };
            deductionIntegral(data)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        let data = {
                            type: 1,
                            price: this.commodity.price,
                        };
                        this.jumpRouter_reLaunch(
                            "/pages/pointsMall/vendingMachine/orderComplete",
                            data
                        );
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: "积分支付失败",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        countdown_start() {
            this.countdown_timeouter = setInterval(() => {
                this.countdown = this.countdown - 1;
                if (this.countdown == 0) {
                    this.countdown_init();
                    uni.$emit("countdown_end");
                }
            }, 1000);
        },
        countdown_init() {
            clearInterval(this.countdown_timeouter);
            this.countdown_timeouter = null;
        },
    },
    computed: {
        integral() {
            return new Decimal(this.commodity.price).mul(10);
        },
        minute() {
            return minute_conversion(this.countdown);
        },
    },
    onLoad(option) {
        this.commodity = JSON.parse(option.data);
        console.log(this.commodity)
    },
    created() {
        this.countdown_start();
    },
    beforeDestroy() {
        this.countdown_init();
    },
    onHide() {
        this.countdown_init();
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: initial;
    position: relative;
    background: #f7f8f9;
}
.tabbar {
    text:nth-child(1) {
        font-weight: 600;
        color: $black-1;
        font-size: 60upx;
        margin: 80upx auto 20upx auto;
        text {
            display: inline;
            font-size: $font-size-4;
            color: $black-1;
            margin-left: 10upx;
        }
    }
    text:nth-child(2) {
        color: $gray-5;
        font-size: $font-size-4;
        text {
            font-weight: 100;
            display: inline;
            font-size: $font-size-4;
            color: $gray-5;
            margin-left: 10upx;
        }
    }
}
.content {
    width: 90%;
    background: #ffffff;
    height: 291upx;
    border-radius: 24upx;
    margin: 40upx auto 0 auto;
    .title {
        font-size: $font-size-6;
        font-weight: 600;
        color: $black-1;
        text-align: left;
        margin: 0 0 0 40upx;
        padding: 40upx 0;
    }
    view:nth-child(3) {
        display: flex;
        image {
            margin: 0 40upx;
            width: 96upx;
            height: 96upx;
        }
        view {
            text:nth-child(1) {
                padding: 4upx 15upx;
                border-radius: 12upx;
                background: $green-1;
                font-size: $font-size-3;
                color: #ffffff;
                display: inline;
                text-align: left;
                margin-right: 20upx;
            }
            text:nth-child(2) {
                text-align: left;
                display: inline-block;
                font-size: $font-size-5;
                font-weight: 600;
                color: $black-1;
            }
            text:nth-child(3) {
                font-size: $font-size-2;
                color: $red-1;
                text-align: left;
                margin-top: 5upx;
                text {
                    background: #ffffff;
                    padding: 0;
                    display: inline-block;
                    font-weight: 500;
                    color: $red-1;
                    font-size: 40upx;
                }
            }
        }
    }
}

.complete {
    width: 90%;
    background: #ffffff;
    height: 500upx;
    border-radius: 24upx;
    margin: 30upx auto 0 auto;
    .title {
        font-size: $font-size-6;
        font-weight: 600;
        color: $black-1;
        text-align: left;
        margin: 0 0 0 5%;
        padding: 40upx 0;
    }
    .integral {
        width: 90%;
        margin: 0 auto 80upx auto;
        .integral_content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            view:nth-child(1) {
                width: 48upx;
                height: 48upx;
                image {
                    width: 48upx;
                    height: 48upx;
                    margin-right: 5%;
                }
            }
            view:nth-child(2) {
                width: 450upx;
                text {
                    text-align: left;
                    margin-left: 20upx;
                    margin: 0upx 0upx 0 0;
                    font-size: $font-size-5;
                    font-weight: 600;
                    color: $black-1;
                    text {
                        margin-left: 10upx;
                        display: inline;
                        font-size: $font-size-3;
                        color: $gray-1;
                    }
                }
            }
            view:nth-child(3) {
                width: 56upx;
                height: 56upx;
                image {
                    width: 56upx;
                    height: 56upx;
                }
            }
        }
        .integral_tip {
            width: 533upx;
            height: 109upx;
            background: #fafafa;
            border-radius: 24upx;
            margin: 20upx 0 0 12%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            text:nth-child(1) {
                font-size: $font-size-4;
                color: $black-1;
            }
            text:nth-child(2) {
                font-size: $font-size-3;
                color: $red-1;
            }
        }
    }
    .wx {
        width: 90%;
        margin: 0 auto 60upx auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        view:nth-child(1) {
            width: 48upx;
            height: 48upx;
            image {
                width: 48upx;
                height: 48upx;
                margin-right: 5%;
            }
        }
        view:nth-child(2) {
            width: 450upx;
            text {
                text-align: left;
                margin-left: 20upx;
                margin: 0upx 0upx 0 0;
                font-size: $font-size-5;
                font-weight: 600;
                color: $black-1;
                text {
                    margin-left: 10upx;
                    display: inline;
                    font-size: $font-size-3;
                    color: $gray-1;
                }
            }
        }
        view:nth-child(3) {
            width: 56upx;
            height: 56upx;
            image {
                width: 56upx;
                height: 56upx;
            }
        }
    }
}
.line {
    width: 90%;
    margin: 0 auto 30upx auto;
    height: 1px;
    background: $gray-2;
    transform: scaleY(0.5);
}
</style>
