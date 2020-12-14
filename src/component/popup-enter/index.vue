<template>
    <view class="popupbox">
    <view class="mask" @click="close"></view>
        <view class="popup">
            <text class="title">{{list.title}}</text>
            <input v-model="input_data" class="input" type="text" :placeholder="list.placeholder" />
            <view @click="confirm" class="btn">
                <text>{{list.btn}}</text>
            </view>
            <image @click="close"  class="close" src="https://img.sporeblockchain.cn/static/my/chacha.png" mode="" />
        </view>
    </view>
</template>
<script>
export default {
    name: "popup",
    props: {
        list: Object
    },
    data() {
        return {
            input_data: ""
        };
    },
    methods: {
        confirm() {
            this.$emit("confirm",this.input_data);
        },
        close(){
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
    height: 450upx;
    border-radius: 25upx;
    margin: 500upx auto 0 auto;
    background-color: #ffffff;
    text-align: center;
    padding-top: 10upx;
    z-index: 10;
    .title {
        color: $black-1;
        font-size: $font-size-4;
        margin: 30upx auto 40upx auto;
        font-weight: 600;
    }
    input{
        width: 80%;
        height: 90upx;
        border-radius: 20upx;
        margin: 0 auto 40upx auto;
        border: 1upx solid $gray-1;
    }
}
.btn {
    width: 80%;
    height: 90upx;
    border-radius: 15upx;
    margin: 0 auto;
    background-color: $green-4;
    text-align: center;
    text {
        color: #ffffff;
        line-height: 90upx;
        font-size: $font-size-4;
    }
}
.close{
    width: 40upx;
    height: 40upx;
    position: absolute;
    top: 20upx;
    right: 20upx;
}
.popupbox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
}
.mask{
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 0;
}

</style>