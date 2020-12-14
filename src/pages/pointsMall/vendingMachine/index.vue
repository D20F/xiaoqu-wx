<template>
    <view class="box">
        <view class="space"></view>
        <view class="content">
            <view class="index">
                <view
                    :class="{ white: list_index == item }"
                    v-for="(item, index) of list"
                    :key="index"
                    @click="select_index(item)"
                >
                    <text
                        :class="{
                            font_black_1: list_index == item,
                            font_gray_1: list_index !== item,
                        }"
                        >第</text
                    >
                    <text
                        :class="{
                            font_green_1: list_index == item,
                            font_gray_1: list_index !== item,
                        }"
                        >{{ item }}</text
                    >
                    <text
                        :class="{
                            font_black_1: list_index == item,
                            font_gray_1: list_index !== item,
                        }"
                        >排</text
                    >
                </view>
            </view>
            <scroll-view :scroll-y="true" class="commodity">
                <view
                    v-for="(item, index) of current_content"
                    :key="index"
                    @click="buy(item)"
                >
                    <image :src="item.pro_img" />
                    <text>{{ item.lane_no }}</text>
                    <text>{{ item.pro_name }}</text>
                    <text>
                        <!-- <text>￥</text> -->
                        {{ item.price }} 积分
                    </text>
                    <text v-if="item.left_num !== 0"
                        >剩余 {{ item.left_num }}</text
                    >
                    <text v-else>已售罄</text>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import { productDetails } from "@/api/api_mapi";
import { tr } from "date-fns/locale";

export default {
    name: "vendingMachine",
    components: {},
    data() {
        return {
            list: [1, 2, 3, 4, 5, 6],
            list_content: [],
            commodity: [
                {
                    title: "康师傅矿泉水",
                    id: "021",
                    price: 12,
                    quantity: 12,
                },
            ],
            list_index: 1,
            status: true,
        };
    },
    mixins: [public_mixin],
    methods: {
        select_index(index) {
            this.list_index = index;
            console.log(index);
        },
        productDetails() {
            let that = this;
            let data = {
                dev_id: "865373045294464", //暂时写死
            };
            productDetails(data)
                .then((res) => {
                    console.log(res);
                    if (res.status == 1006) {
                        this.status = false;
                        uni.showToast({
                            icon: "none",
                            title: "当前设备未联网",
                        });
                    }
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.list_content = res.data.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        buy(item) {
            if (!this.status) {
                uni.showToast({
                    icon: "none",
                    title: "当前机器不在线，请联系客服",
                });
            } else if (item.left_num == 0) {
                uni.showToast({
                    icon: "none",
                    title: "当前商品库存为0",
                });
            } else {
                this.jumpRouter(
                    "/pages/pointsMall/vendingMachine/orderDefray",
                    item
                );
            }
        },
    },
    computed: {
        current_content() {
            let index = "rank_" + this.list_index;
            let arr = [];
            for (let item in this.list_content[index]) {
                arr.unshift(this.list_content[index][item]);
            }
            return arr;
        },
    },
    onLoad(option) {
        // this.commodity = JSON.parse(option.data);
        // console.log(JSON.parse(option.data))
        this.productDetails();
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: 100%;
    position: relative;
}
uni-page-body {
    height: inherit;
}
.space {
    width: 100%;
    height: 40upx;
}
.content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: top;
    justify-content: center;
}
.index {
    width: 20%;
    height: 100%;
    background: #fafafa;
    view {
        width: 100%;
        height: 96upx;
        align-items: center;
        justify-content: center;
        display: flex;
        text:nth-child(1) {
            font-size: $font-size-4;
            font-weight: 600;
        }
        text:nth-child(2) {
            margin: 0 5upx;
            font-size: $font-size-5;
            font-weight: 600;
        }
        text:nth-child(3) {
            font-size: $font-size-4;
            font-weight: 600;
        }
    }
}
.commodity {
    width: 80%;
    height: 100%;
    view {
        width: 100%;
        height: 144upx;
        margin: 0 0 35upx 0;
        image {
            width: 144upx;
            height: 144upx;
        }
        text:nth-child(2) {
            position: absolute;
            top: 0%;
            left: 150upx;
            padding: 5upx 15upx;
            border-radius: 12upx;
            background: $green-1;
            font-size: $font-size-3;
            color: #ffffff;
        }
        text:nth-child(3) {
            position: absolute;
            top: 0%;
            left: 240upx;
            font-size: $font-size-5;
            font-weight: 600;
            color: $black-1;
        }
        text:nth-child(4) {
            position: absolute;
            bottom: 0%;
            left: 148upx;
            font-weight: 500;
            color: $red-1;
            font-size: 35upx;
            text {
                display: inline;
                font-size: $font-size-2;
                color: $red-1;
            }
        }
        text:nth-child(5) {
            position: absolute;
            bottom: 0%;
            right: 20upx;
            font-size: $font-size-4;
            color: #808080;
        }
    }
}

.white {
    background: #ffffff;
}
.font_gray_1 {
    color: $gray-1;
}
.font_black_1 {
    color: $black-1;
}
</style>
