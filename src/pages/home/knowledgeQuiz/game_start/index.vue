<template>
    <view class="homePage">
        <!-- 主页 -->

        <start v-if="component_name == 'start'" @component_jump="component_jump" />
        <leaderBoard v-if="component_name == 'leaderBoard'" @component_jump="component_jump" />
        <rule v-if="component_name == 'rule'" @component_jump="component_jump" />
    </view>
</template>
<script>
import start from "./start/index";
import leaderBoard from "./leaderBoard/index";
import rule from "./rule/index";

export default {
    name: "gameStart",
    props: {},
    components: {
        start,
        leaderBoard,
        rule,
    },
    data() {
        return {
            component_name: "start",
        };
    },
    methods: {
        component_jump(data) {
            this.component_name = data;
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