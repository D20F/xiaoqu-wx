<template>
    <view class="answerReview">
        <!-- 答题回顾 -->
        <view class="mask"></view>
        <view class="box">
            <view class="title">
                <text>
                    好可惜呀！回答错误
                    正确答案为：
                </text>
            </view>
            <view class="btn orange">
                <text>{{ options.title }}. {{ options.content }}</text>
                <image
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answerReview/sucess.png"
                />
            </view>
            <view @click="close" class="close">
                <image
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answerReview/btn.png"
                />
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: "answerReview",
    props: {
        options: {
            type: Object,
        },
    },
    data() {
        return {};
    },

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
.answerReview {
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
.box {
    width: 80%;
    height: 700upx;
    position: relative;
    margin: 300upx auto 0 auto;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answerReview/background.png")
        no-repeat;
    background-size: 100%;
    padding: 256upx 32upx 0 32upx;
    z-index: 101;
    text {
        text-align: center;
    }
}
.btn {
    width: 80%;
    height: 100upx;
    border-radius: 25upx;
    border: 5upx solid #242424;
    margin: 0 auto 30upx auto;
    image {
        width: 48upx;
        height: 48upx;
        position: absolute;
        bottom: 0%;
        right: 0%;
    }
    text {
        margin-left: 20upx;
        line-height: 100upx;

        font-size: 36upx;
        color: #242424;
        font-weight: 600;
        text-align: left;
    }
}
.close {
    width: 80%;
    height: 128upx;
    margin: 0 auto;
    image{
        width: 100%;
        height: 100%;
    }
}
.title{
    width: 80%;
    margin: 20upx auto;
        text {
        font-size: 36upx;
        color: #D83423;
        font-weight: 600;
    }
}
.orange {
    background: RGB(251, 195, 52);
}
</style>