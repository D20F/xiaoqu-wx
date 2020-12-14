<template>
    <view class="box">
        <swiper
            class="swiper"
            :vertical="true"
            @change="change"
            :current="current"
        >
            <swiper-item>
                <image src="https://img.sporeblockchain.cn/static/home/recycliGuide/step1.png" />
            </swiper-item>
            <swiper-item>
                <image src="https://img.sporeblockchain.cn/static/home/recycliGuide/step2.png" />
            </swiper-item>
            <swiper-item>
                <image src="https://img.sporeblockchain.cn/static/home/recycliGuide/step3.png" />
            </swiper-item>
            <swiper-item>
                <image src="https://img.sporeblockchain.cn/static/home/recycliGuide/step4.png" />
            </swiper-item>
            <swiper-item>
                <image src="https://img.sporeblockchain.cn/static/home/recycliGuide/step5.png" />
            </swiper-item>
            <swiper-item>
                <image src="https://img.sporeblockchain.cn/static/home/recycliGuide/step6.png" />
            </swiper-item>

        </swiper>

        <image class="next" @click="next" src="https://img.sporeblockchain.cn/static/home/recycliGuide/next.png" />
    </view>
</template>


<script>
import public_mixin from "@/mixins/public.js";

export default {
    data() {
        return {
            current:0
        };
    },
    mixins: [public_mixin],
    methods: {
        change(e) {
            let current = e.detail.current;
            this.current = current;
        },
        next(){
            if(this.current !== 5){
                this.current = this.current + 1;
            }
        }
    },
    onLoad() {},
    computed: {},
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: inherit;
    position: relative;
    background: rgba(250, 250, 250, 1);
}
.swiper {
    width: 100%;
    height: 100%;
    image{
    width: 100%;
    height: 100%;
    }
}
.next{
    width: 48upx;
    height: 48upx;
    bottom: 50upx;
    left: 351upx;
    position: fixed;
}
</style>
