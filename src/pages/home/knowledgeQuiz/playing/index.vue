<template>
    <view class="homePage">
        <!-- 主页 -->



        <answer v-if="component_name == 'answer'"  :list="list" @component_jump="component_jump" />
        <answerEnd v-if="component_name == 'answerEnd'" :list="list"  @component_jump="component_jump" />

    </view>
</template>
<script>
import answerEnd from "./answerEnd/index";
import answer from "./answer/index";

export default {
    name: "playing",
    props: {},
    components: {
        answerEnd,
        answer,
    },
    data() {
        return {
            component_name: "answer",
            list:{}
        };
    },
    methods: {
        component_jump(router,data) {
            this.component_name = router;
            this.list = data;
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.homePage {
    width: 100%;
    height: inherit;
    position: relative;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/start/background.png")
        no-repeat;
    background-size: 100%;
}
</style>