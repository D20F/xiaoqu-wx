<template>
    <view class="box">
        <text class="title">投递卡/面容识别</text>
        <view v-if="list.state == '未申请'">
            <view
                class="card card_bg"
                @click="
                    jumpRouter('/pages/my/relativeAccount/delivery_card', list)
                "
            >
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/choose_cion_card@3x.png"
                />
                <view>
                    <text>投递卡申请</text>
                </view>
            </view>
            <view class="card face_bg">
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/choose_cion_face@3x.png"
                />
                <view>
                    <text>面容识别录入</text>
                </view>
            </view>
            <view
                @click="back(2)"
                class="btn btn_bottom"
            >
                <text>暂不考虑</text>
            </view>
        </view>
        <view v-else>
            <view
                class="card card_bg"
                @click="
                    jumpRouter('/pages/my/relativeAccount/delivery_card', list)
                "
            >
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/choose_cion_card@3x.png"
                />
                <view>
                    <text>投递卡申请</text>
                    <text :style="list.state == '审核通过' ? '' : 'display:none;'">已申请</text>
                    <text>已为该亲属申请投递卡</text>
                </view>
            </view>
            <view class="card face_bg">
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/choose_cion_face@3x.png"
                />
                <view>
                    <text>面容识别录入</text>
                    <text :style="list.state == '审核通过' ? '' : 'display:none;'">已录入</text>
                    <text>已录入该亲属面容</text>
                </view>
            </view>
       
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";

export default {
    name: "delivery_method",
    data() {
        return {
            list: [],
        };
    },
    mixins: [public_mixin],
    methods: {

    },
    onLoad(option) {
        this.list = JSON.parse(option.data);
        console.log(this.list)
    },
};
</script>

<style  lang="scss">
@import "@/common/variable.scss";
@import "@/common/public.scss";

.box {
    width: 100%;
    height: 100%;
    position: relative;
}
.title {
    width: 90%;
    margin: 100upx auto 50upx auto;
    font-weight: 600;
    font-size: $font-size-7;
    color: $black-1;
    text-align: left;
}
.card {
    width: 90%;
    margin: 0 auto 30upx auto;
    height: 230upx;
    display: flex;
    justify-content: left;
    align-items: center;
    image {
        width: 100upx;
        height: 100upx;
        margin: 0 40upx;
    }
    view {
        width: 400upx;
        text:nth-child(1) {
            color: $white-1;
            text-align: left;
            font-size: $font-size-6;
            display: inline-block;
        }
        text:nth-child(2) {
            font-size: $font-size-2;
            border-radius: 10upx;
            margin-left: 20upx;
            color: $white-1;
            width: 100upx;
            background-color: $green-4;
            display: inline-block;
        }
        text:nth-child(3) {
            margin-top: 20upx;
            color: $gray-1;
            text-align: left;
            font-size: $font-size-4;
        }
    }
}
.card_bg {
    background: url("https://img.sporeblockchain.cn/static/relative_account/choose_bg_card.png")
        no-repeat;
    background-size: 100%;
}
.face_bg {
    background: url("https://img.sporeblockchain.cn/static/relative_account/choose_bg_face.png")
        no-repeat;
    background-size: 100%;
}

.btn {
    width: 80%;
    height: 90upx;
    border-radius: 15upx;
    left: 10%;
    text-align: center;
    border: 1px solid $gray-1;
    text {
        color: $gray-1;
        line-height: 90upx;
        font-size: $font-size-4;
    }
}
</style>
