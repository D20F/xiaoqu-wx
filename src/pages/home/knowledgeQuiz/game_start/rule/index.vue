<template>
    <view class="rule">
        <view class="back" @click="back">
            <image src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/back.png" />
        </view>
        <view class="box1">
            <text>
                为深入贯彻党的十九大精神，推进资源全面节约和循环利用，进一步推进生活垃圾分类工作，小蛐特举办垃圾分类知识在线问答活动，通过知识问答的方式，促使广大用户进一步认识到垃圾分类工作的重要性以及掌握部分垃圾分类的方法，使用户
                提升垃圾分类意识。
            </text>
        </view>
        <view class="box2">
            <text>
                1.答题时间为每题60秒钟；答题总数为10道，每题分数为10分，满分为100分，每位参赛者有多次答题机会。
            </text>
            <text>
                2.活动结束后，按照答对题数与答题时间为依据，系统排行的前10名将额外赠送分类垃圾袋。中奖详细信息将通过公众号发送给用户
            </text>
            <text>
                3.所有参赛者均视为阅读并同意遵守活动相关规则，小蛐拥有对活动的最终解释权。
            </text>
        </view>
    </view>
</template>
<script>
export default {
    name: "rule",
    props: {},
    data() {
        return {};
    },
    methods: {
        back() {
            this.$emit("component_jump", "start");
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.rule {
    width: 100%;
    height: inherit;
    position: relative;
}
.back {
    width: 58upx;
    height: 58upx;
    position: absolute;
    left: 30upx;
    top: -40upx;
    z-index: 10;
    image {
        width: 100%;
        height: 100%;
    }
}
.box1 {
    width: 90%;
    height: 553upx;
    margin: 100upx auto 0 auto;
    position: relative;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/rule/background1.png")
        no-repeat;
    background-size: 100%;
    padding: 150upx 110upx 0 110upx;
    text {
        text-align: left;
    }
}
.box2 {
    width: 90%;
    height: 750upx;
    margin: 20upx auto 0 auto;
    position: relative;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/rule/background.png")
        no-repeat;
    background-size: 100%;
    padding: 150upx 110upx 0 110upx;
    text {
        text-align: left;
        margin-bottom: 10upx;
    }
}
</style>