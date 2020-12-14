<template>
    <view class>
        <view class>
            <text>{{11}}</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
    onLoad() {
        console.log(this.$store.state.garbageDelivery);
    }
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
</style>
