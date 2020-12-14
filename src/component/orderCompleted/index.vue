<template>
    <view class="sss">
        <!-- 暂无此组件 -->
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
// import btnGreen from "@/component/btnGreen/index";

export default {
    name: "delivery_completed",
    components: {
        // btnGreen,
    },
    data() {
        return {};
    },
    mixins: [public_mixin],
    methods: {
        confirm() {},
    },
    computed: {},
    onLoad(option) {},
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.sss {
    width: 100%;
    height: 100%;
    position: relative;
   
}

</style>
