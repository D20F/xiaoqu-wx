<template>
    <view class="box">
        <image
            class="logo"
            src="https://img.sporeblockchain.cn/static/my/mySetting/xiaoqu.png"
            mode=""
        />
        <view class="block">
            <view
                ><image
                    src="https://img.sporeblockchain.cn/static/my/mySetting/wx.png"
                    mode=""
            /></view>
            <view>
                <text class="font_weight_black1_32">联系电话</text>
                <text class="font_black1_32">400-832-0996</text>
                <text class="font_gray1_28">周一至周日 9:00-18:00</text>
            </view>
        </view>
        <view class="block">
            <view
                ><image
                    src="https://img.sporeblockchain.cn/static/my/mySetting/phone.png"
                    mode=""
            /></view>
            <view>
                <text class="font_weight_black1_32">官方微信公众号</text>
                <text class="font_gray1_28">第一步：微信搜索框输入“<text style="color:#00B075;display: inline;">小蛐</text>”</text>
                <text class="font_gray1_28">第二步：点击“搜一搜”</text>
                <text class="font_gray1_28">第三步：关注小蛐公众号</text>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";

export default {
    name: "aboutUs",
    data() {
        return {};
    },
    mixins: [public_mixin],
    methods: {},
    onLoad() {},
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
.logo {
    width: 400upx;
    height: 400upx;
    margin: 0 auto;
}
.block {
    width: 90%;
    padding: 30upx 30upx;
    display: flex;
    margin: 70upx auto 0 auto;
    background: #fafafa;
    border-radius: 24upx;
    image {
        width: 48upx;
        height: 48upx;
        margin-right: 20upx;
    }
    text {
        margin-bottom: 15upx;
        text-align: left;
    }
}

</style>
