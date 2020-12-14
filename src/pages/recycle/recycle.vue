<template>
    <view class="recycle">
        <view class="back">
            <image @click="back" src="https://img.sporeblockchain.cn/static/home/icon_next@3x.png" />
        </view>
        <view class="recycle_title">
            <text>选择回收类型</text>
        </view>
        <view class="recycle_titles">
            <text>
                剩余选择时间
                <text class="uniText_inline font_green_1">‧ {{countdown}}s</text>
            </text>
        </view>
        <view class="jiugongge_layout">
            <view class="row" v-for="(item,index) of list" :key="index" @click="select(item,index)">
                <view>
                    <image :src="item.src" />
                    <image
                        v-if="item.state == 1"
                        src="https://img.sporeblockchain.cn/static/home/home_icon_label_red@3x.png"
                    />
                    <image
                        v-if="item.state == 2"
                        src="https://img.sporeblockchain.cn/static/home/home_icon_label_yellow@3x.png"
                    />
                </view>
                <text>{{item.title}}</text>
                <text>{{item.price}}{{item.currency_unit}}{{item.weight_unit}}</text>
            </view>
        </view>

        <view v-if="waitTime" class="waitbox">
            <view class="wait">
                <image src="https://img.sporeblockchain.cn/static/recycle/open_bg.png" />
                <chocolateProgressBar></chocolateProgressBar>
                <text>正在开箱</text>
                <text>请移步到对应的投放箱前等候</text>
            </view>
        </view>
    </view>
</template>

<script>
import chocolateProgressBar from "@/component/chocolateProgressBar/index";
import public_mixin from "@/mixins/public.js";
import countdown from "@/mixins/countdown.js";
import garbage_delivery from "@/mixins/garbage_delivery.js";

export default {
    name: "recycle",
    components: {
        chocolateProgressBar,
    },
    mixins: [public_mixin, countdown, garbage_delivery],
    data() {
        return {
            waitTime: false,
            list: [
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_glass@3x.png",
                    title: "厨余垃圾",
                    state: 0,
                    weight_unit: "斤",
                    price: 30,
                    currency_unit: "积分/",
                },

                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_bottles@3x.png",
                    title: "饮料瓶",
                    state: 0,
                    weight_unit: "个",
                    price: 3,
                    currency_unit: "环保金/",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_paper@3x.png",
                    title: "纸类",
                    state: 0,
                    weight_unit: "斤",
                    price: 55,
                    currency_unit: "环保金/",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_metal@3x.png",
                    title: "金属",
                    state: 0,
                    weight_unit: "",
                    price: '暂未上线',
                    currency_unit: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_plastic@3x.png",
                    title: "塑料",
                    state: 0,
                    weight_unit: "",
                    price: '暂未上线',
                    currency_unit: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_fabric@3x.png",
                    title: "纺织物",
                    state: 0,
                    weight_unit: "",
                    price: '暂未上线',
                    currency_unit: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_glass@3x(1).png",
                    title: "玻璃",
                    state: 0,
                    weight_unit: "",
                    price: '暂未上线',
                    currency_unit: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/qita@3x.png",
                    title: "其他",
                    state: 0,
                    weight_unit: "斤",
                    price: 10,
                    currency_unit: "积分/",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_harmful@3x.png",
                    title: "有害垃圾",
                    state: 0,
                    weight_unit: "斤",
                    price: 30,
                    currency_unit: "积分/",
                },
            ],
        };
    },
    methods: {
        select(item, index) {
            if (this.stop_click) {
                return;
            }
            this.stop_click = true;
            let data = {
                data: item,
                index: index,
            };
            if (item.state == 0) {
                // 最好增加成功回调
                this.send(this.sendType("unboxing", index))
                    .then((res) => {
                        this.stop_click = false;
                        // this.jumpRouter("/pages/recycle/recycle_completed", data);
                    })
                    .catch((err) => {
                        console.log(err);
                        this.stop_click = false;
                        this.jumpRouter_reLaunch("/pages/home/home");
                    });
            } else {
                this.stop_click = false;
                console.log("已满 故障");
            }
        },
        back() {
            // 判断当前有没有已经投递的记录，有则跳转最后结算页
            if (this.$store.state.garbageDelivery.garbageList.length > 0) {
				this.$store.commit("setPacking", true);
                this.jumpRouter_reLaunch("/pages/recycle/delivery_details");

                this.send(this.sendType("deliveryEnd"))
                    .then((res) => {
                        // this.jumpRouter("/pages/recycle/recycle_completed", data);
                    })
                    .catch((err) => {
                        console.log(err);
                        this.jumpRouter_reLaunch("/pages/home/home");
                    });
            } else {
                // this.jumpRouter_reLaunch("/pages/home/home");
				this.send(this.sendType("selectBox"))
				    .then((res) => {
				    })
				    .catch((err) => {
				        console.log(err);
				        this.jumpRouter_reLaunch("/pages/home/home");
				    });
            }
        },
    },
    watch: {
        "$store.state.garbageDelivery.basket_state": {
            handler(newVal) {
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].state = newVal[i];
                }
            },
        },
        "$store.state.garbageDelivery.is_unboxing": {
            handler(newVal) {
                this.waitTime = newVal;
            },
        },
    },
    onLoad() {
        uni.$on("countdown_end", this.back);
		for (let i = 0; i < this.list.length; i++) {
		    this.list[i].state = this.$store.state.garbageDelivery.basket_state[i];
		}
        this.monitor();
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.recycle {
    width: 100%;
    height: 100%;
    position: relative;
}
.back {
    z-index: 10;
    image {
        width: 100upx;
        height: 100upx;
        position: absolute;
        -moz-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        transform: scaleX(-1);
    }
}
.recycle_title {
    width: 90%;
    margin: 25upx auto 20upx auto;
    text {
        text-align: center;
        font-weight: 600;
        font-size: $font-size-7;
    }
}
.recycle_titles {
    width: 90%;
    margin: 0 auto 50upx auto;
    text {
        text-align: center;
        font-size: $font-size-4;
    }
}
.jiugongge_layout {
    width: 90%;
    margin: 0 auto;
}
.row {
    display: inline-block;
    width: 30%;
    height: 300upx;
    margin: 0 1.6%;
    border-radius: 20upx;
    margin-bottom: 30upx;
    background-color: $gray-3;
    view image:nth-child(1) {
        width: 120upx;
        height: 120upx;
        margin-top: 10%;
    }
    view image:nth-child(2) {
        width: 80upx;
        height: 80upx;
        position: absolute;
        top: 18%;
        right: 7%;
    }
    text {
        margin-left: 30upx;
        text-align: left;
        font-size: $font-size-4;
    }
    text:nth-child(2) {
        color: $black-1;
        font-weight: 600;
        margin-bottom: 10%;
    }
    text:nth-child(3) {
        color: $green-4;
        font-size: 24upx;
    }
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
