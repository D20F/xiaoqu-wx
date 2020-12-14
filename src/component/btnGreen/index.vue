<template>
    <view>
        <view v-if="mode == '1'" @click="confirm" class="btn" :class="color">
            <text>{{content}}</text>
        </view>
        <view v-if="mode == '2'" @click="confirm" class="btn_2" >
            <text>{{content}}</text>
        </view>
    </view>
</template>
<script>
export default {
    name: "btnGreen",
    props: {
        content: {
            type: String
        },
        mode: {
            type: String,
            default: '1'
        },
        color: {
            type: String,
            default: 'background_color_green_4'
        },
    },
    created(){
        
    },
    data() {
        return {};
    },
    methods: {
        confirm() {
            this.$emit("confirm");
        }
    }
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
.btn {
    width: 80%;
    height: 90upx;
    border-radius: 15upx;
    margin: 0 auto;
    // box-shadow: 0px 5px 40px -10px $green-4;
    text-align: center;
    text {
        color: #ffffff;
        line-height: 90upx;
        // letter-spacing:20upx;
        font-size: 32upx;
    }
}
.btn_2 {
    width: 80%;
    height: 90upx;
    border-radius: 15upx;
    margin: 0 auto;
    border:1upx solid $green-4;
    text-align: center;
    text {
        color: $green-4;
        line-height: 90upx;
        font-size: 32upx;
        font-weight: 600;
    }
}
</style>