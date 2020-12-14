<template>
    <view class="box">
        <view class="confirm" v-if="order_data.state == 1">
            <text>确认收货</text>
            <image
                src="https://img.sporeblockchain.cn/static/my/my_icon_d.png"
            />
        </view>
        <view class="await" v-else>
            <text>等待收货</text>
            <image
                src="https://img.sporeblockchain.cn/static/my/my_icon_await@3x.png"
            />
        </view>
        <view class="card_1">
            <view>
                <image
                    src="https://img.sporeblockchain.cn/static/my/order_icon_address@3x.png"
                />
                <text>
                    {{ order_data.name }}
                    <text>{{ order_data.telephone_number }}</text>
                </text>
                <text>
                    {{ order_data.address }}
                </text>
            </view>
            <view>
                <image
                    src="https://img.sporeblockchain.cn/static/my/number@3x.png"
                />
                <text>{{ order_data.courier_company }}</text>
                <text>{{ order_data.tracking_number }}</text>
                <image
                    src="https://img.sporeblockchain.cn/static/my/copy.png"
                />
            </view>
        </view>
        <view class="card_2">
            <view class="content">
                <view class="left">
                    <image :src="list.img" />
                </view>
                <view class="right">
                    <text class="margin_bottom font_weight">{{
                        list.name
                    }}</text>
                    <text
                        class="lable"
                        v-for="(i, index) in list.lable"
                        :key="index"
                        >{{ i }}</text
                    >
                    <view class="tabbar">
                        <text v-if="list.pay_type == 1"> 积分</text>
                        <text v-else> 环保金</text>
                    </view>
                </view>
            </view>
            <view class="introduction">
                <text>数量</text>
                <text>{{ list.quantity }}</text>
            </view>
            <view class="introduction">
                <text>支付方式</text>
                <text class="font_purple_1" v-if="list.pay_type == 1">
                    积分支付</text
                >
                <text class="font_purple_1" v-else> 环保币支付</text>
            </view>
            <view class="introduction">
                <text>运费</text>
                <text>{{ order_data.courier_fee }}</text>
            </view>
            <view class="introduction">
                <text>备注</text>
                <text>{{ order_data.remark }}</text>
            </view>
            <view class="split_line"></view>
            <view class="subtotal">
                <text>小计:</text>
                <text>{{ order_data.total_amount }}</text>
                <text>积分</text>
            </view>
        </view>
        <view class="order">
            <view class="content_title">
                <text>订单信息</text>
            </view>
            <view class="details">
                <view>
                    <text class="font_gray_1">发票</text>
                    <text
                        class="font_weight"
                        v-if="order_data.invoice_type == 0"
                    >
                        个人</text
                    >
                    <text class="font_weight" v-else> 企业</text>
                </view>
                <view>
                    <text class="font_gray_1">下单时间</text>
                    <text class="font_weight">{{
                        order_data.create_time
                    }}</text>
                </view>
                <view>
                    <text class="font_gray_1">订单编号</text>
                </view>
                <view>
                    <text class="font_weight">{{ order_data.id }}</text>
                    <text @click="copy" class="font_green_1">复制</text>
                </view>
                <view>
                    <text class="font_gray_1">操作哈希</text>
                </view>
                <view>
                    <text class="font_weight">{{ order_data.hash }}</text>
                    <text @click="copy" class="font_green_1">复制</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getOrderDetails } from "@/api/api_mapi";

export default {
    name: "my_order",
    components: {},
    data() {
        return {
            list: {},
            order_data: {},
            router_data: {},
        };
    },
    mixins: [public_mixin],
    methods: {
        copy() {
            uni.setClipboardData({
                data: this.order_data.hash,
                success: function () {
                    console.log("success");
                    console.log(this.order_data.hash);
                },
            });
        },
        getOrderDetails() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
                id: this.router_data.id,
            };
            getOrderDetails(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.order_data = res.data;
                        this.list = this.order_data.list[0];
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    onLoad(option) {
        this.router_data = JSON.parse(option.data);
        this.getOrderDetails();
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: inherit;
    position: relative;
    background-color: $white-1;
}
.confirm {
    width: 90%;
    height: 181upx;
    margin: 40upx auto;
    background: url("https://img.sporeblockchain.cn/static/my/bg_red.png")
        no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    image {
        width: 150upx;
        height: 150upx;
    }
    text {
        color: #ffffff;
        font-size: $font-size-6;
        font-weight: 500;
    }
}
.await {
    width: 90%;
    height: 181upx;
    margin: 40upx auto;
    background: url("https://img.sporeblockchain.cn/static/my/bg_yellow.png")
        no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    image {
        width: 150upx;
        height: 150upx;
    }
    text {
        color: #ffffff;
        font-size: $font-size-4;
        font-weight: 600;
    }
}
.card_1 {
    width: 90%;
    height: 278upx;
    margin: 0 auto 40upx auto;
    background: #ffffff;
    border-radius: 15upx;
    view:nth-child(1) {
        width: 100%;
        height: 66%;
        padding-top: 20upx;
        border-bottom: 1px solid $gray-2;
        image {
            width: 50upx;
            height: 50upx;
            position: absolute;
            top: 35upx;
            left: 5%;
        }
        text {
            text-align: left;
            text {
                display: inline;
            }
        }
        text:nth-child(2) {
            font-size: $font-size-5;
            color: $black-1;
            font-weight: 600;
            margin: 20upx 0 0 100upx;
            text {
                margin-left: 20upx;
            }
        }
        text:nth-child(3) {
            font-size: $font-size-4;
            color: $gray-1;
            margin: 20upx 0 0 100upx;
            text {
                color: $gray-1;
                margin-left: 20upx;
            }
        }
    }
    view:nth-child(2) {
        width: 100%;
        height: 34%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: $font-size-3;
        image:nth-child(1) {
            width: 72upx;
            height: 32upx;
        }
        image:nth-child(4) {
            width: 50upx;
            height: 50upx;
        }
        text:nth-child(2) {
        }
    }
}
.card_2 {
    width: 90%;
    background: #ffffff;
    min-height: 300upx;
    border-radius: 25upx;
    z-index: 100;
    margin: 40upx auto 0 auto;
    .content {
        width: 90%;
        margin: 0 auto;
        padding-top: 20upx;
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 40upx;
        .left {
            width: 160upx;
            height: 160upx;
            margin-right: 20upx;
            image {
                width: 160upx;
                margin: 20upx 0 0 0upx;
                height: 120upx;
            }
        }
        .right {
            width: 495upx;

            text:nth-child(1) {
                font-size: $font-size-4;
                text-align: left;
                margin-bottom: 15upx;
            }
            .lable {
                background: $white-1;
                color: $gray-1;
                font-size: $font-size-3;
                border-radius: 10upx;
                padding: 3upx 10upx;
                display: inline;
                margin: 0 20upx 0 0;
            }
            .tabbar {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20upx;
                text:nth-child(1) {
                    color: $golden-1;
                    font-size: $font-size-4;
                    font-weight: 500;
                }
            }
        }
    }
    .introduction {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 60upx;
        text:nth-child(1) {
            width: 160upx;
            display: inline-block;
            font-size: $font-size-4;
            text-align: right;
        }
        text:nth-child(2) {
            width: 70%;
            display: inline-block;
            font-size: $font-size-4;
            font-weight: 600;
            text-align: right;
        }
    }
    .subtotal {
        width: 90%;
        height: 120upx;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text:nth-child(1) {
            margin-right: 50upx;
            font-size: $font-size-2;
        }
        text:nth-child(2) {
            margin-right: 10upx;
            font-size: $font-size-4;
            font-weight: 600;
            color: $golden-1;
        }
        text:nth-child(3) {
            font-size: $font-size-2;
            color: $golden-1;
        }
    }
}

.order {
    width: 90%;
    background: #ffffff;
    margin: 30upx auto 100upx auto;
    border-radius: 20upx;
}
.content_title {
    width: 90%;
    margin: 0 auto 40upx auto;
    height: 120upx;
    border-bottom: 1px solid $gray-2;
    image {
        width: 35upx;
        height: 35upx;
        display: inline-block;
        margin: 0 40upx 0 0;
    }
    text {
        margin-top: 40upx;
        font-size: $font-size-5;
        font-weight: 600;
        display: inline-block;
        text-align: left;
    }
}
.details {
    width: 90%;
    margin: 0 auto;
    view {
        height: 60upx;
        font-size: $font-size-4;
        display: flex;
        justify-content: space-between;
    }
    view:nth-child(6) {
        height: 160upx;
        text:nth-child(1) {
            width: 80%;
            text-align: left;
            word-break: break-all;
        }
    }
}
</style>



