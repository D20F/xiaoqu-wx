<template>
    <view class="delivery_details">
        <view class="content">
            <view class="content_title">
                <image
                    src="https://img.sporeblockchain.cn/static/recycle/yellow.png"
                />
                <text>垃圾投递种类</text>
            </view>
            <view class="row" v-for="(item, index) of list" :key="index">
                <view>
                    <image :src="item.src" />
                </view>
                <view>
                    <text>{{ item.title }}</text>
                    <image
                        :style="item.state == 2 ? '' : 'display:none;'"
                        src="https://img.sporeblockchain.cn/static/recycle/icon_yellow.png"
                    />
                    <text :style="item.state == 2 ? '' : 'display:none;'"
                        >错误投递</text
                    >
                    <text
                        >{{ item.price }}{{ item.currency }}.{{
                            item.unit
                        }}</text
                    >
                </view>
                <text class="line_height_100" v-if="item.currency == '环保金'"
                    >{{ item.reward }} 环保金</text
                >
                <text class="line_height_100 font_golden_1" v-else
                    >{{ item.reward }} 积分</text
                >
            </view>
            <view class="income">
                <text>收益:</text>
                <text
                    ><span v-if="balance_gold >= 0">+</span>
                    {{ balance_gold }} 环保金</text
                >
                <text
                    ><span v-if="balance_integral >= 0">+</span>
                    {{ balance_integral }} 积分</text
                >
            </view>
        </view>

        <view class="order">
            <view class="content_title">
                <text>订单信息</text>
            </view>
            <view class="details">
                <view>
                    <text class="font_gray_1">投放人</text>
                    <text class="font_weight">{{ order_data.account }}</text>
                    <text class="font_weight">{{
                        order_data.telephone_number
                    }}</text>
                </view>
                <view>
                    <text class="font_gray_1">投递时间</text>
                    <text class="font_weight">{{ order_data.time }}</text>
                </view>
                <view>
                    <text class="font_gray_1">投递地址</text>
                    <text class="font_weight">{{ order_data.address }}</text>
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

        <view class="customer_service">
            <image
                src="https://img.sporeblockchain.cn/static/recycle/details_icon_service@3x.png"
            />
            <text>联系客服</text>
        </view>
    </view>
</template>
<script>
import { Decimal } from "decimal.js";

export default {
    name: "delivery_details",
    props: {
        list: {
            type: Array,
        },
        order_data: {
            type: Object,
        },
    },
    data() {
        return { section_list: [] };
    },
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
    },
    created() {},
    computed: {
        balance_gold() {
            let data = new Decimal(0);
            for (const item of this.list) {
                if (item.currency == "环保金") {
                    data = data.add(item.reward);
                }
            }
            return data.toNumber();
        },
        balance_integral() {
            let data = new Decimal(0);
            for (const item of this.list) {
                if (item.currency == "积分") {
                    data = data.add(item.reward);
                }
            }
            return data.toNumber();
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.delivery_details {
    width: 100%;
    height: 100%;
    position: relative;
}
.content {
    width: 90%;
    background: #ffffff;
    margin: 30upx auto 40upx auto;
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
.row {
    display: flex;
    width: 90%;
    margin: 0 auto 40upx auto;
    height: 100upx;
    view:nth-child(1) {
        width: 100upx;
        height: 100upx;
        margin-right: 30upx;
        border-radius: 30upx;
        background-color: $gray-3;
        image {
            width: 80upx;
            height: 80upx;
            top: 10upx;
            left: 10upx;
        }
    }
    view:nth-child(2) {
        width: 400upx;
        text:nth-child(1) {
            display: inline-block;
            font-size: $font-size-4;
            font-weight: 600;
            line-height: 50upx;
            vertical-align: middle;
        }
        image:nth-child(2) {
            width: 30upx;
            height: 30upx;
            display: inline-block;
            margin-left: 30upx;
            vertical-align: middle;
        }
        text:nth-child(3) {
            width: auto;
            vertical-align: middle;
            display: inline-block;
            color: $red-1;
            padding: 5upx 10upx;
            margin-left: 15upx;
            border-radius: 15upx;
            background: rgba(241, 72, 91, 0.1);
            font-size: $font-size-3;
        }
        text:nth-child(4) {
            text-align: left;
            line-height: 50upx;
            color: $gray-1;
            font-size: $font-size-2;
        }
    }
    text:nth-child(3) {
        width: 300upx;
        text-align: right;
        font-size: $font-size-5;
        font-weight: 500;
    }
}
.income {
    border-top: 1px solid $gray-2;
    width: 100%;
    height: 120upx;
    text {
        line-height: 120upx;
        display: inline-block;
    }
    text:nth-child(1) {
        font-size: $font-size-3;
        margin: 0 50upx 0 200upx;
    }
    text:nth-child(2) {
        font-size: 30upx;
        margin-right: 40upx;
        font-weight: 500;
    }
    text:nth-child(3) {
        font-size: 30upx;
        font-weight: 500;
        color: $golden-1;
    }
}

.order {
    width: 90%;
    background: #ffffff;
    margin: 30upx auto 0 auto;
    border-radius: 20upx;
}
.details {
    width: 90%;
    margin: 0 auto;
    view {
        height: 60upx;
        font-size: $font-size-3;
        display: flex;
        justify-content: space-between;
    }
    text {
        font-size: $font-size-4;
    }
    view:nth-child(5) {
        height: 160upx;
        text:nth-child(1) {
            width: 80%;
            text-align: left;
            word-break: break-all;
        }
    }
}
.customer_service {
    width: 90%;
    background: #ffffff;
    margin: 30upx auto 150upx auto;
    height: 80upx;
    border-radius: 20upx;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
        width: 40upx;
        height: 40upx;
        margin-right: 10upx;
    }
    text {
        color: $black-1;
        font-weight: 600;
        font-size: $font-size-5;
    }
}

.line_height_100 {
    line-height: 100upx;
}
</style>