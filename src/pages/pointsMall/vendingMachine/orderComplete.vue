<template>
    <view class="box">
        <image
            src="https://img.sporeblockchain.cn/static/recycle/complete_icon.png"
        />
        <text>支付成功，正在出货</text>
        <text v-if="commodity.type == 1">
            - {{ commodity.price }} <span> 积分</span>
        </text>
        <text v-else-if="commodity.type == 2">- ￥{{ commodity.price }} </text>
        <view @click="confirm" class="btn">
            <text>完成</text>
        </view>
        <text>若商品未成功出货，请咨询客服</text>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";

export default {
    name: "orderComplete",
    components: {},
    data() {
        return { commodity: {} };
    },
    mixins: [public_mixin],
    methods: {
        confirm() {
            uni.reLaunch({
                url: "/pages/home/home",
            });
        },
    },
    onLoad(option) {
        this.commodity = JSON.parse(option.data);
        console.log(JSON.parse(option.data));
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    width: 100%;
    height: 100%;
    position: relative;
    image:nth-child(1) {
        width: 150upx;
        height: 150upx;
        margin: 180upx auto 0 auto;
    }
    text:nth-child(2) {
        color: $gray-1;
        font-size: $font-size-5;
        margin-top: 40upx;
    }
    text:nth-child(3) {
        font-size: 64upx;
        margin-top: 40upx;
        font-weight: 600;
        span {
            font-size: $font-size-4;
            margin-left: 10upx;
        }
    }
    .btn {
        width: 40%;
        height: 90upx;
        border-radius: 15upx;
        margin: 0 auto;
        text-align: center;
        position: fixed;
        bottom: 30%;
        background-color: $green-4;
        left: 30%;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: 32upx;
        }
    }
    text:nth-child(5) {
        width: 90%;
        position: fixed;
        bottom: 25%;
        left: 5%;
        color: $black-1;
        font-weight: 600;
        font-size: $font-size-3;
    }
}
</style>
