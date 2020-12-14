<template>
    <view class="start">
        <view class="leaderboard" @click="component_jump('leaderBoard')">
            <image
                src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/start/Leaderboard.png"
            />
        </view>
        <view class="QRcode" @click="QRcode_show = true">
            <image
                src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/start/QRcode.png"
            />
        </view>
        <view class="content">
            <image
                src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/start/background1.png"
            />
        </view>

        <view class="btnBox">
            <view @click="component_jump('rule')">
                <image
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/start/btn1.png"
                />
            </view>
            <view @click="jumpRouter('/pages/home/knowledgeQuiz/playing/index')">
                <image
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/start/btn2.png"
                />
            </view>
        </view>
        <popupBox v-if="QRcode_show" @close="close">
            <view class="popup">
                <image src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/qrcode.jpg" />
                <text>扫码二维码，领取奖励</text>
            </view>
        </popupBox>
    </view>
</template>
<script>
import popupBox from "@/component/popup-box/index";
import public_mixin from "@/mixins/public.js";

export default {
    props: {},
    data() {
        return {
            QRcode_show: false,
        };
    },
    mixins: [public_mixin],

    components: {
        popupBox,
    },
    methods: {
        component_jump(data) {
            this.$emit("component_jump", data);
        },
        close() {
            this.QRcode_show = false;
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.start {
    width: 100%;
    height: 100%;
    position: relative;
}
.leaderboard {
    width: 98upx;
    height: 98upx;
    position: absolute;
    left: 5%;
    top: 60upx;
    z-index: 10;
    image {
        width: 100%;
        height: 100%;
    }
}
.QRcode {
    width: 98upx;
    height: 98upx;
    position: absolute;
    right: 0;
    top: 60upx;
    z-index: 10;
    image {
        width: 100%;
        height: 100%;
    }
}
.content {
    width: 90%;
    height: inherit;
    position: absolute;
    left: 5%;
    top: 0%;
    image {
        width: 100%;
        height: 100%;
    }
}
.btnBox {
    width: 90%;
    height: 133upx;
    position: absolute;
    z-index: 10;
    left: 5%;
    bottom: 60upx;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    view:nth-child(1) {
        width: 40%;
        height: 100%;
        image {
            width: 100%;
            height: 100%;
        }
    }
    view:nth-child(2) {
        width: 40%;
        height: 100%;
        image {
            width: 100%;
            height: 100%;
        }
    }
}
.popup {
    width: 80%;
    height: 800upx;
    border-radius: 25upx;
    margin: 250upx auto 0 auto;
    background-color: #ffffff;
    z-index: 100;
    padding-top: 100upx;
    image {
        width: 80%;
        height: 500upx;
        border-radius: 25upx;
        margin: 0 auto 0 auto;
        border: 8px solid #242424;
    }
    text {
        margin: 30upx auto 0 auto;
        font-weight: 500;
        font-size: 40upx;
    }
}
</style>