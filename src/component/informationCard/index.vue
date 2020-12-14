<template>
    <view class="card">
        <view class="content_title">
            <image :src="icon_src" />
            <text>{{list.title}}</text>
            <text>{{list.time}}</text>
        </view>
        <view class="content">
            <jyfParser :html="list.content" ref="article"></jyfParser>
        </view>
    </view>
</template>

<script>
import jyfParser from "@/components/jyf-parser/jyf-parser";

export default {
    name: "card",
    props: {
        list: {
            type: Object
        }
    },
    components: {
        jyfParser
    },
    data() {
        return {
        };
    },
    methods: {},
    onLoad() {},
    computed: {
        icon_src() {
            let src;
            if (this.list.mode == 1) {
                src =
                    "https://img.sporeblockchain.cn/static/my/information_icon_announcement@3x.png";
            } else if (this.list.mode == 2) {
                src =
                    "https://img.sporeblockchain.cn/static/my/information_icon_violations@3x.png";
            } else {
                src =
                    "https://img.sporeblockchain.cn/static/my/information_icon_system@3x.png";
            }
            return src;
        }
    }
};
</script>

<style lang="scss">
@import "@/common/variable.scss";
.card {
    width: 90%;
    background: #ffffff;
    min-height: 300upx;
    border-radius: 25upx;
    z-index: 100;
    margin: 40upx auto 0 auto;
    .content_title {
        width: 90%;
        margin: 0 auto 30upx auto;
        height: 100upx;
        border-bottom: 1px solid $gray-2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        image {
            width: 60upx;
            height: 50upx;
            display: inline-block;
        }
        text:nth-child(2) {
            width: 250upx;
            font-size: $font-size-5;
            font-weight: 600;
            display: inline-block;
            color: $black-1;
            margin-left: 20upx;
            text-align: left;
        }
        text:nth-child(3) {
            width: 400upx;
            font-size: $font-size-3;
            color: $gray-1;
            display: inline-block;
            text-align: right;
        }
    }
    .content {
        width: 90%;
        margin: 0 auto;
        padding-bottom: 20upx;
    }
}
</style>
