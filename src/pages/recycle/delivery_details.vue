<template>
    <view class="delivery">
        <view class="tabbox">
            <view v-if="1" class="tabcontent">
                <view>
                    <text class="font_green_4">投递成功</text>
                    <text>本次投递{{router_data.title}}{{router_data.weight}}{{router_data.unit}}</text>
                </view>
                <view>
                    <image :src="router_data.src" />
                    <image src="https://img.sporeblockchain.cn/static/recycle/success@3x.png" />
                </view>
            </view>
            <view v-else class="tabcontent">
                <view>
                    <text class="font_red_1">投递失败</text>
                    <text>未检测到{{router_data.title}}</text>
                </view>
                <view>
                    <image :src="router_data.src" />
                    <image src="https://img.sporeblockchain.cn/static/recycle/failure@3x.png" />
                </view>
            </view>
        </view>
        <view class="content">
            <view class="content_title">
                <image src="https://img.sporeblockchain.cn/static/recycle/green.png" />
                <text>当前已投递</text>
            </view>
            <view v-if="JSON.stringify(list) !== '[]'" class="exist">
                <view class="row" v-for="(item,index) of list" :key="index">
                    <view>
                        <image :src="item.src" />
                    </view>
                    <view>
                        <text>{{item.title}}</text>
                        <image
                            :style="item.state !== 0 ? '' : 'display:none;'"
                            src="https://img.sporeblockchain.cn/static/recycle/icon_yellow.png"
                        />
                        <text>{{item.price}}{{item.currency}}.{{item.unit}}</text>
                    </view>
                    <text class="line_height_100" v-if="item.currency == '环保金'">{{item.reward}} 环保金</text>
                    <text class="line_height_100 font_golden_1" v-else>{{item.reward}} 积分</text>
                </view>
            </view>
            <view v-else class="no_exist">
                <image src="https://img.sporeblockchain.cn/static/zero_record/default_06@3x.png" />
                <text>暂无回收投递哦~</text>
            </view>
            <view class="income">
                <text>收益:</text>
                <text>
                    <span v-if="balance_gold >= 0">+</span>
                    {{balance_gold}} 环保金
                </text>
                <text>
                    <span v-if="balance_integral >= 0">+</span>
                    {{balance_integral}} 积分
                </text>
            </view>
        </view>
        <view class="btnBox">
            <view @click="jump_delivery_completed">
                <text>结束投递</text>
            </view>
            <view @click="jump_recycle">
                <text>继续投递</text>
            </view>
        </view>

        <view v-if="waitTime" class="waitbox">
            <view class="wait">
                <image src="https://img.sporeblockchain.cn/static/recycle/open_bg.png" />
                <chocolateProgressBar :progress_txt="1"></chocolateProgressBar>
                <text>数据打包上链中</text>
                <text>无论有无真实投递都会上链，请稍后</text>
            </view>
        </view>
    </view>
</template>

<script>
import btnGreen from "@/component/btnGreen/index";
import chocolateProgressBar from "@/component/chocolateProgressBar/index";
import public_mixin from "@/mixins/public.js";
import garbage_delivery from "@/mixins/garbage_delivery.js";
import { Decimal } from "decimal.js";

export default {
    name: "delivery_details",
    components: {
        btnGreen,
        chocolateProgressBar,
    },
    mixins: [public_mixin, garbage_delivery],
    data() {
        return {
            section_list: [],
            waitTime: false,
        };
    },
    methods: {
        jump_recycle() {
            if (this.stop_click) {
                return;
            }
            this.stop_click = true;
            // this.jumpRouter("/pages/recycle/recycle");
            this.send(this.sendType("selectRecycle", this.router_data.index))
                .then((res) => {
                    // this.jumpRouter("/pages/recycle/delivery_completed");
                    this.stop_click = false;
                })
                .catch((err) => {
                    this.jumpRouter_reLaunch("/pages/home/home");
                    this.stop_click = false;
                });
        },
        jump_delivery_completed() {
            if (this.stop_click) {
                return;
            }
            this.stop_click = true;
            this.waitTime = true;
            this.send(this.sendType("deliveryEnd"))
                .then((res) => {
                    // this.jumpRouter("/pages/recycle/delivery_completed");
                    this.stop_click = false;
                })
                .catch((err) => {
                    this.jumpRouter_reLaunch("/pages/home/home");
                    this.stop_click = false;
                });
        },
    },
    onLoad(option) {
        // const item = JSON.parse(option.data);
        // this.router_data = item;
		this.waitTime = this.$store.state.garbageDelivery.is_packing;
        this.monitor();
    },
    watch: {
        "$store.state.garbageDelivery.is_packing": {
            handler(newVal) {
                this.waitTime = newVal;
            },
        },
    },
    computed: {
        list() {
            // let data = [];
            // for (const item of this.$store.state.garbageDelivery.garbageList) {
            //     if (JSON.stringify(data) == "[]") {
            //         data.push(item);
            //     } else if (item.title == data.title) {
            //         data.weight = data.weight + item.weight;
            //     } else {
            //         data.push(item);
            //     }
            // }
            // return data;
            return this.$store.state.garbageDelivery.garbageList;
        },
        router_data() {
            let index = 0;

            // 数组最后一个对象为当次投放信息
            if (this.list.length > 0) {
                index = this.list.length - 1;
            }

            return this.list[index];
        },
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

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
// text:nth-child(1) {

// }
.delivery {
    width: 100%;
    height: inherit;
    position: relative;
    background-color: $white-1;
}
.tabbox {
    width: 90%;
    height: 180upx;
    background: #ffffff;
    margin: 30upx auto;
    border-radius: 20upx;
    .tabcontent {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        padding-top: 25upx;
        text {
            text-align: left;
            line-height: 60upx;
        }
        view:nth-child(1) {
            text:nth-child(1) {
                font-size: $font-size-6;
                font-weight: 600;
            }
            text:nth-child(2) {
                font-size: $font-size-4;
                color: $black-1;
            }
        }
        view:nth-child(2) {
            width: 112upx;
            height: 112upx;
            border-radius: 50%;
            background: rgba(248, 250, 249, 1);
            image:nth-child(1) {
                width: 112upx;
                height: 112upx;
            }
            image:nth-child(2) {
                position: absolute;
                top: 32upx;
                left: 32upx;
                width: 48upx;
                height: 48upx;
            }
        }
    }
}
.content {
    width: 90%;
    background: #ffffff;
    margin: 30upx auto 200upx auto;
    border-radius: 20upx;
}
.no_exist {
    width: 100%;
    height: 480upx;
    image {
        width: 240upx;
        height: 240upx;
        margin: 100upx auto 50upx auto;
    }
    text {
        color: $gray-1;
        font-size: $font-size-3;
    }
}
.content_title {
    width: 90%;
    margin: 0 auto 40upx auto;
    height: 120upx;
    border-bottom: 1px solid $gray-2;
    display: flex;
    align-content: center;
    justify-content: left;
    image {
        width: 35upx;
        height: 35upx;
        margin-top: 42.5upx;
        margin-right: 20upx;
    }
    text {
        font-size: $font-size-4;
        font-weight: 600;
        text-align: left;
        line-height: 120upx;
    }
}
.exist {
    width: 100%;
    min-height: 400upx;
    padding-bottom: 40upx;
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
                margin: 10upx auto;
            }
        }
        view:nth-child(2) {
            width: 300upx;
            text:nth-child(1) {
                display: inline-block;
                font-size: $font-size-4;
                font-weight: 600;
                line-height: 50upx;
            }
            image:nth-child(2) {
                width: 30upx;
                height: 30upx;
                display: inline-block;
                margin-left: 30upx;
            }

            text:nth-child(3) {
                text-align: left;
                line-height: 50upx;
                color: $gray-1;
                font-size: $font-size-2;
            }
        }
        text:nth-child(3) {
            width: 200upx;
            text-align: right;
            font-size: $font-size-5;
            font-weight: 600;
        }
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
        font-size: 40upx;
        margin-right: 40upx;
        font-weight: 500;
    }
    text:nth-child(3) {
        font-size: 40upx;
        font-weight: 500;
        color: $golden-1;
    }
}
.btnBox {
    width: 100%;
    height: 180upx;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    view:nth-child(1) {
        background-color: $green-3;
    }
    view:nth-child(2) {
        background-color: $green-4;
    }
    view {
        width: 43%;
        height: 90upx;
        border-radius: 15upx;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: $font-size-4;
        }
    }
}
.line_height_100 {
    line-height: 100upx;
}
.waitbox {
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    z-index: 1000;
}
.wait {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 650upx;
    background: #ffffff;
    border-radius: 60upx 60upx 0 0;
    image {
        width: 550upx;
        height: 220upx;
        position: absolute;
        top: 2%;
        left: 100upx;
    }
    text:nth-child(3) {
        font-weight: 600;
        color: $black-1;
        font-size: $font-size-4;
    }
    text:nth-child(4) {
        font-size: $font-size-4;
        color: $gray-1;
        margin-top: 10upx;
    }
}
</style>
