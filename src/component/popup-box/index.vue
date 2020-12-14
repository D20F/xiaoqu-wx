<template>
    <view class="popupbox">
        <view class="mask" @click="close"></view>
        <slot></slot>
        <view class="close" @click="close">
            <image
                src="https://img.sporeblockchain.cn/static/my/Popup_icon_down@3x.png"
            />
        </view>
    </view>
</template>
<script>
export default {
    name: "popupBox",
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.close {
    width: 112upx;
    height: 112upx;
    border: 1upx solid #707070;
    border-radius: 50%;
    z-index: 100;
    margin: 60upx auto 0 auto;
    background: rgba($color: #ffffff, $alpha: 0.1);
    image {
        position: relative;
        width: 48upx;
        height: 48upx;
        margin: 32upx auto 32upx auto;
    }
}
.popupbox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 100;
}
.mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 100;
}

</style>