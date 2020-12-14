<template>
    <view class="popup">
        <view class="tabbar">
            <view>
                <text>{{ list.nickname }}</text>
                <text>{{ list.phone }}</text>
            </view>
            <view>
                <text>{{ list.address }}</text>
                <text>{{ list.region }}</text>
            </view>
            <image
                @click="deletes"
                src="https://img.sporeblockchain.cn/static/recycle/failure@3x.png"
            />
        </view>
        <view
            class="left"
            @click="
                jumpRouter('/pages/my/relativeAccount/delivery_method', list)
            "
        >
            <image
                v-if="1"
                src="https://img.sporeblockchain.cn/static/relative_account/relatives_icon_card_selected@3x.png"
            />
            <image
                v-else
                src="https://img.sporeblockchain.cn/static/relative_account/relatives_icon_card_disabled@3x.png"
            />
            <text :class="{ font_black_1: 1, font_gray_1: 0 }">投递卡</text>
        </view>
        <view class="right">
            <image
                v-if="1"
                src="https://img.sporeblockchain.cn/static/relative_account/relatives_icon_face_selected@3x.png"
            />
            <image
                v-else
                src="https://img.sporeblockchain.cn/static/relative_account/relatives_icon_face_relatives_icon_face_selected@3x.png"
            />
            <text :class="{ font_bule_1: 1, font_gray_1: 0 }">面容识别</text>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";

export default {
    name: "card",
    props: {
        list: Object,
    },
    data() {
        return {};
    },
    methods: {
        deletes() {
            this.$emit('deletes',this.list);
        },
    },
    mixins: [public_mixin],
};
</script>

<style  lang="scss">
@import "@/common/variable.scss";
.popup {
    width: 90%;
    height: 290upx;
    border-radius: 25upx;
    margin: 50upx auto 0 auto;
    background-color: #ffffff;
    text-align: left;
    .tabbar {
        text {
            margin: 30upx 0 0 40upx;
        }
        border-bottom: 1px solid $gray-1;
        height: 185upx;
        view:nth-child(1) {
            text:nth-child(1) {
                font-weight: 600;
                display: inline-block;
                font-size: $font-size-5;
                color: $black-1;
            }
            text:nth-child(2) {
                font-weight: 600;
                font-size: $font-size-5;
                color: $black-1;
                display: inline-block;
            }
        }
        view:nth-child(2) {
            text:nth-child(1) {
                text-align: left;
                color: $gray-1;
                font-size: $font-size-4;
                display: inline-block;
            }
            text:nth-child(2) {
                text-align: left;
                color: $gray-1;
                font-size: $font-size-4;
                display: inline-block;
            }
        }
        image {
            width: 60upx;
            height: 60upx;
            position: absolute;
            top: 25upx;
            right: 25upx;
            z-index: 10;
        }
    }
    .left {
        font-size: $font-size-4;
        display: inline-block;
        width: 50%;
        height: 105upx;
        border-right: 1px solid $gray-1;
        image {
            width: 40upx;
            height: 40upx;
            position: absolute;
            top: 32.5upx;
            left: 20%;
        }
        text {
            line-height: 105upx;
        }
    }
    .right {
        display: inline-block;
        width: 50%;
        height: 105upx;
        font-size: $font-size-4;
        image {
            width: 40upx;
            height: 40upx;
            position: absolute;
            top: 32.5upx;
            left: 18%;
        }
        text {
            line-height: 105upx;
        }
    }
}
</style>
