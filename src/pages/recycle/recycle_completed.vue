<template>
    <view class="completed">
        <view class="title_time">
            <text class="font_weight_black1_48">箱门已打开</text>
            <view>
                <!-- <image src="https://img.sporeblockchain.cn/static/recycle/unboxing/clock.png" /> -->
                <!-- <text class="font_black1_36">{{countdown}}</text> -->
            </view>
        </view>
        <text class="title_two">请移步到对应箱门，文明投递</text>
        <view class="content">
            <image :src="content_data.img" />
            <text class="font_black1_32">{{ content_data.title }}</text>
        </view>
        <btnGreen class="btn_bottom" content="投递完成" @confirm="confirm" />

        <view class="tips" v-if="tip_show">
            <view class="content">
                <image
                    src="https://img.sporeblockchain.cn/static/recycle/weight.png"
                />
                <text>重量获取中</text>
            </view>
        </view>
    </view>
</template>

<script>
import btnGreen from "@/component/btnGreen/index";
import public_mixin from "@/mixins/public.js";
// import countdown from "@/mixins/countdown.js";
import garbage_delivery from "@/mixins/garbage_delivery.js";

export default {
    name: "recycle_completed",
    components: {
        btnGreen,
    },
    mixins: [public_mixin, garbage_delivery],
    data() {
        return {
            router_data: {},
            router_index: "",
        };
    },
    methods: {
        confirm() {
            if (this.stop_click) {
                return;
            }
            this.stop_click = true;
            this.send(this.sendType("deliveryWin", this.router_index))
                .then((res) => {
                    // 跳转过去了，需要把信息加到store统计  -- 功能未添加
                    // this.jumpRouter(
                    //     "/pages/recycle/delivery_details",
                    //     this.router_data
                    // );
                    this.stop_click = false;
                })
                .catch((err) => {
                    this.stop_click = false;
                    this.jumpRouter_reLaunch("/pages/home/home");
                });
        },
        countdown_end() {
            console.log("time out");
        },
    },
    onLoad(option) {
        // uni.$on("countdown_end", this.countdown_end);

        const item = JSON.parse(option.data);
        this.router_data = item.data;
        this.router_index = item.index;

        this.monitor();
        if (0) {
            console.log("如果是瓶子要触发检测，不成功进入检测界面");
            this.jumpRouter("/pages/recycle/bottle_inspection");
        }
    },
    computed: {
        tip_show() {
            return this.$store.state.garbageDelivery.weightTip;
        },
        content_data() {
            let data = {
                title: "",
                img: "",
            };
            switch (this.router_data.title) {
                case "饮料瓶":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon1.png";
                    data.title = "瓶内干净无残留 瓶身不变形更容易识别";
                    break;
                case "纸类":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon2.png";
                    data.title = "纸盒压扁之后在投递，平行放入回收箱";
                    break;
                case "纺织物":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon3.png";
                    data.title = "干净整洁的纺织物，更方便回收叔叔整理";
                    break;
                case "塑料":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon4.png";
                    data.title = "大型物品先拆卸，藏物品清洗后再投递";
                    break;
                case "金属":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon5.png";
                    data.title = "金属物品大物品装小物品，叠加投放更方便";
                    break;
                case "玻璃":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon6.png";
                    data.title = "玻璃是易碎物品小心投递，碎玻璃无需装袋";
                    break;
                case "厨余垃圾":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon7.png";
                    data.title =
                        "投放前尽可能沥干水分，有包装袋应将包装袋除去后投递";
                    break;
                case "有害垃圾":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon9.png";
                    data.title = "有害垃圾用袋子装好，不同垃圾分开装好投递";
                    break;
                case "其他":
                    data.img =
                        "https://img.sporeblockchain.cn/static/recycle/unboxing/icon8.png";
                    data.title = "其他垃圾投递不要装袋投放，湿垃圾沥干后投放";
                    break;
                default:
                    break;
            }
            return data;
        },
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.completed {
    width: 100%;
    height: inherit;
    position: relative;
}
.title_time {
    width: 90%;
    margin: 0 auto 50upx auto;
    padding-top: 100upx;
    display: flex;
    align-content: center;
    justify-content: space-between;
    view:nth-child(2) {
        display: flex;
        align-content: center;
        justify-content: space-between;
        image {
            width: 48upx;
            height: 48upx;
        }
    }
}
.title_two {
    color: $gray-1;
    font-size: $font-size-4;
    margin-left: 5%;
    text-align: left;
}
.content {
    width: 90%;
    margin: 200upx auto 0 auto;
    image {
        width: 350upx;
        height: 350upx;
        margin: 0 auto 30upx auto;
    }
}

.tips {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    .content {
        width: 80%;
        height: 600upx;
        border-radius: 40upx;;
        background-color: #ffffff;
        margin: 150upx auto 0 auto;
        padding-top: 100upx;
        image {

            width: 260upx;
            height: 260upx;
            margin: 0 auto 30upx auto;
        }
        text:nth-child(2) {
            font-size: 40upx;
            font-weight: 500;
            text-align: center;
        }
    }
}
</style>
