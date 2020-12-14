<template>
    <view class="completed">
        <view class="title_time">
            <text class="font_weight_black1_48">瓶子形状检测失败</text>
            <view>
                <image src="https://img.sporeblockchain.cn/static/recycle/unboxing/clock.png" />
                <text class="font_black1_36">{{countdown}}</text>
            </view>
        </view>
        <text class="title_two">
            请在30s内从投放口取出瓶子，不然
            会被吞掉哦~
        </text>

        <view class="content">
            <view class="row">
                <image src="https://img.sporeblockchain.cn/static/recycle/bottleCheck/bottle5.png" />
                <text>瓶子＞1.5L</text>
            </view>
            <view class="row">
                <image src="https://img.sporeblockchain.cn/static/recycle/bottleCheck/bottle1.png" />
                <text>瓶子变形</text>
            </view>
        </view>
        <view class="content">
            <view class="row">
                <image src="https://img.sporeblockchain.cn/static/recycle/bottleCheck/bottle2.png" />
                <text>识别不出</text>
            </view>
            <view class="row">
                <image src="https://img.sporeblockchain.cn/static/recycle/bottleCheck/bottle3.png" />
                <text>不属于瓶子</text>
            </view>
        </view>

        <view class="tip">
            <image src="https://img.sporeblockchain.cn/static/recycle/bottleCheck/bottle4.png" />
            <text class="font_black1_36">检测失败原因</text>
        </view>

        <view
            @click="jump"
            class="btn btn_bottom"
            :class="{background_color_green_1:btn_mode,background_color_green_3:!btn_mode}"
        >
            <text>投递完成</text>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import countdown from "@/mixins/countdown.js";
import garbage_delivery from "@/mixins/garbage_delivery.js";

export default {
    name: "bottle_inspection",
    components: {},
    data() {
        return {};
    },
    mixins: [public_mixin, countdown, garbage_delivery],
    methods: {
        jump() {
            if (this.btn_mode) {
                this.jumpRouter("/pages/recycle/delivery_details");
            }
        },
        countdown_end() {
            this.jumpRouter("/pages/recycle/delivery_details");
        },
    },
    onLoad() {
        uni.$on("countdown_end", this.countdown_end);
        this.monitor();
    },
    computed: {
        btn_mode() {
            if (this.countdown <= 0) {
                return true;
            } else {
                return false;
            }
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
    height: 100%;
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
.btn {
    width: 80%;
    height: 90upx;
    border-radius: 15upx;
    left: 10%;
    text-align: center;
    text {
        color: #ffffff;
        line-height: 90upx;
        font-size: $font-size-4;
    }
}
.title_two {
    color: $red-1;
    font-size: 28upx;
    margin: 0 0 50upx 5%;
    text-align: left;
}
.content {
    width: 75%;
    margin: 0 auto 40upx auto;
    border-radius: 40upx;
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    .row {
        width: 233upx;
        height: 300upx;
        background: rgb(250, 250, 250);
        image {
            width: 168upx;
            height: 168upx;
            margin: 30upx auto 30upx auto;
        }
        text{
            font-size: $font-size-5;
        }
    }
}
.tip {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    image {
        width: 48upx;
        height: 48upx;
    }
    text {
        font-size: $font-size-5;
        color: $red-1;
        margin-left: 10upx;
    }
}
</style>
