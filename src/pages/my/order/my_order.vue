<template>
    <view class="box">
        <u-tabs-swiper
            ref="tabs"
            class="u_tba"
            :list="list"
            active-color="#242424"
            inactive-color="#CCCCCC"
            gutter="125"
            :current="current"
            @change="tabsChange"
        ></u-tabs-swiper>
        <swiper
            :current="swiperCurrent"
            @transition="transition"
            @animationfinish="animationfinish"
            style="height: 100%"
        >
            <swiper-item class="swiper-item">
                <view
                    v-if="JSON.stringify(cabinet_delivery) == '[]'"
                    class="no_exist"
                >
                    <image
                        src="https://img.sporeblockchain.cn/static/zero_record/default_06@3x.png"
                    />
                    <text>暂时还没有任何订单哦~</text>
                </view>
                <scroll-view :scroll-y="true" class="exist" v-else>
                    <view
                        class="card"
                        v-for="(item, index) in cabinet_delivery"
                        :key="index"
                        @click="
                            jumpRouter('/pages/my/order/delivery_details', item)
                        "
                    >
                        <view class="content_title">
                            <text v-if="item.state == 0" class="font_yellow_1"
                                >投递详情</text
                            >
                            <text
                                v-else-if="item.state >= 1"
                                class="font_green_1"
                                >投递结束
                                <text v-if="item.violation">有误投递</text>
                            </text>
                            <image
                                src="https://img.sporeblockchain.cn/static/home/icon_next@3x.png"
                            />
                        </view>
                        <view class="content_1">
                            <view>
                                <text class="font_size_24">收益:</text>
                                <text class="font_size_36"
                                    >+ {{ item.income }}</text
                                >
                            </view>
                            <view>
                                <text class="font_size_24">积分:</text>
                                <text class="font_size_28"
                                    >+ {{ item.integral }}</text
                                >
                            </view>
                            <view>
                                <text class="font_size_24">投递时间:</text>
                                <text class="font_size_28">{{
                                    item.time
                                }}</text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <view v-if="recycling.length == 0" class="no_exist">
                    <image
                        src="https://img.sporeblockchain.cn/static/zero_record/default_06@3x.png"
                    />
                    <text>暂时还没有任何订单哦~</text>
                </view>
                <scroll-view :scroll-y="true" class="exist" v-else>
                    <view
                        class="card"
                        v-for="(item, index) in recycling"
                        :key="index"
                    >
                        <view class="content_title">
                            <text v-if="item.state == 0" class="font_yellow_1"
                                >等待上门</text
                            >
                            <text
                                v-else-if="item.state == 1"
                                class="font_green_1"
                                >回收完成</text
                            >
                            <image
                                src="https://img.sporeblockchain.cn/static/home/icon_next@3x.png"
                            />
                        </view>
                        <view class="content_2">
                            <view>
                                <image
                                    src="https://img.sporeblockchain.cn/static/relative_account/card_icon_4@3x.png"
                                />
                                <text class="font_size_32">{{
                                    item.address
                                }}</text>
                            </view>
                            <view>
                                <text>积分:</text>
                                <text class="font_green_1 font_size_36"
                                    >+ {{ item.integral }}</text
                                >
                            </view>
                            <view>
                                <text>投递时间:</text>
                                <text class="font_gray_1 font_size_24">{{
                                    item.time
                                }}</text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <view v-if="redeem.length == 0" class="no_exist">
                    <image
                        src="https://img.sporeblockchain.cn/static/zero_record/default_06@3x.png"
                    />
                    <text>暂时还没有任何订单哦~</text>
                </view>
                <scroll-view :scroll-y="true" class="exist" v-else>
                    <view
                        class="card"
                        v-for="(item, index) in redeem"
                        :key="index"
                        @click="
                            jumpRouter('/pages/my/order/order_details', item)
                        "
                    >
                        <view class="content_title">
                            <text v-if="item.state == 0" class="font_yellow_1"
                                >等待收货</text
                            >
                            <text
                                v-else-if="item.state == 1"
                                class="font_green_1"
                                >交易成功</text
                            >
                            <image
                                src="https://img.sporeblockchain.cn/static/home/icon_next@3x.png"
                            />
                        </view>
                        <view class="content_3">
                            <view class="left">
                                <image :src="item.img" />
                            </view>
                            <view class="right">
                                <text class="margin_bottom font_weight">{{
                                    item.name
                                }}</text>
                                <text
                                    class="lable"
                                    v-for="(i, index) in item.lable"
                                    :key="index"
                                    >{{ i }}</text
                                >
                                <view class="tabbar">
                                    <text>所需积分:</text>
                                    <text>{{ item.integral }} 积分</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { getMyOrder } from "@/api/api_mapi";
import { it } from "date-fns/locale";
import { format, parse } from "date-fns";
import { Decimal } from "decimal.js";

export default {
    name: "my_order",
    components: {},
    data() {
        return {
            list: [
                {
                    name: "机柜投递",
                },
                {
                    name: "上门回收",
                },
                {
                    name: "积分兑换",
                },
            ],
            cabinet_delivery: [],
            recycling: [],
            redeem: [],
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            swiperCurrent: 0,
        };
    },
    mixins: [public_mixin],
    methods: {
        tabsChange(index) {
            //swiper组件所需函数
            this.swiperCurrent = index;
        },
        transition(e) {
            //swiper组件所需函数
            let dx = e.detail.dx;
            this.$refs.tabs.setDx(dx);
        },
        animationfinish(e) {
            //swiper组件所需函数
            let current = e.detail.current;
            this.$refs.tabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;
        },
        getDelivery() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
                type: 0,
            };
            getMyOrder(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.cabinet_delivery = res.data.list;
                        this.cabinet_delivery.forEach((item) => {
                            item.time = format(
                                new Date(item.time),
                                "yyyy-MM-dd HH:mm:ss"
                            );
                            item.income = new Decimal(item.income)
                                .div(10000)
                                .toFixed(4);
                            item.integral = new Decimal(item.integral)
                                .div(10000)
                                .toFixed(4);
                            item.violation =
                                item.count != item.state && item.state != 0;
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getRecycling() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
                type: 1,
            };
            getMyOrder(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.recycling = res.data.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getRedeem() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
                type: 2,
            };
            getMyOrder(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.redeem = res.data.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    onLoad() {
        this.getDelivery();
        this.getRecycling();
        this.getRedeem();
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
.card {
    width: 90%;
    background: #ffffff;
    min-height: 300upx;
    border-radius: 25upx;
    z-index: 100;
    margin: 40upx auto 0 auto;
    .content_title {
        width: 90%;
        margin: 0 auto 30upx auto;
        height: 100upx;
        border-bottom: 1px solid $gray-2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        image {
            width: 60upx;
            height: 50upx;
            display: inline-block;
        }
        text {
            font-size: $font-size-4;
            font-weight: 600;
            text {
                padding: 5upx 10upx;
                border-radius: 10upx;
                margin-left: 15upx;
                font-size: $font-size-2;
                display: inline;
                background: rgba(241, 72, 91, 0.1);
                color: $red-1;
            }
        }
    }
}
.content_1 {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20upx;
    view {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 10upx;
        text:nth-child(1) {
            margin-right: 10upx;
        }
        text:nth-child(2) {
            font-weight: 500;
        }
    }
}
.content_2 {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20upx;
    view {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 10upx;
        image {
            width: 40upx;
            height: 40upx;
        }
        text:nth-child(1) {
            font-size: $font-size-3;
            margin-right: 10upx;
            color: $gray-1;
        }
        text:nth-child(2) {
            font-weight: 600;
        }
    }
}
.content_3 {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20upx;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 10upx;
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
        width: 515upx;
        text:nth-child(1) {
            font-size: $font-size-4;
            text-align: left;
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
                color: $gray-1;
                font-size: $font-size-4;
            }
            text:nth-child(2) {
                color: $golden-1;
                font-size: $font-size-5;
                font-weight: 500;
            }
        }
    }
}

.margin_bottom {
    margin-bottom: 10upx;
}
.exist {
    height: 100%;
}
.no_exist {
    width: 100%;
    height: inherit;
    image {
        width: 320upx;
        height: 320upx;
        margin: 30% auto 50upx auto;
    }
    text {
        color: $gray-1;
        font-size: $font-size-3;
    }
}
</style>



