<template>
    <view class="popupbox">
        <view class="mask" @click="close"></view>
        <view class="popup">
            <view>
                <text>{{content}}</text>
            </view>
            <view @click="close" >
                <text>否</text>
            </view>
            <view @click="confirm"> 
                <text>是</text>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: "popup",
    props: {
        content: String
    },
    data() {
        return {};
    },
    methods: {
        confirm() {
            this.$emit("confirm", "popup");
        },
        close() {
            this.$emit("close");
        }
    }
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.popup {
    width: 85%;
    height: 350upx;
    border-radius: 25upx;
    margin: 500upx auto 0 auto;
    background-color: #ffffff;
    text-align: center;
    z-index: 10;
    view:nth-child(1) {
        border-bottom: 1px solid $gray-1;
        height: 245upx;
        line-height: 245upx;
        font-size: $font-size-5;
        font-weight: 600;
    }
    view:nth-child(2) {
        font-size: $font-size-5;
        display: inline-block;
        width: 50%;
        height: 105upx;
        line-height: 105upx;
        border-right: 1px solid $gray-1;
    }
    view:nth-child(3) {
        display: inline-block;
        width: 50%;
        height: 105upx;
        line-height: 105upx;
        text {
            color: $green-1;
        }
        font-size: $font-size-5;
    }
}

.popupbox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
}
.mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 0;
}
</style>