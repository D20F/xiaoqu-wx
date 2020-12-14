<template>
    <view class="answer">
        <!-- 回答结束 -->
        <view class="box">
            <view class="title">
                <text>恭喜您！答题完成</text>
                <text>共花费 {{ list.time }} 秒</text>
                <text>共答对 {{ list.score / 100 }} 道</text>
            </view>
        </view>
        <view class="btnBox">
            <view @click="again">
                <image
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answerEnd/btn2.png"
                />
            </view>
            <view @click="back(1)">
                <image
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answerEnd/btn1.png"
                />
            </view>
        </view>
        <view class="tabbox">
            <view>
                <text>扫描二维码，关注公众号</text>
                <text>领取奖励</text>
            </view>
            <view @click="QRcode_show = true">
                <image
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/qrcode.jpg"
                />
            </view>
        </view>
        <popupBox v-if="QRcode_show" @close="close">
            <view class="popup">
                <image
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/qrcode.jpg"
                />
                <text>扫码二维码，领取奖励</text>
            </view>
        </popupBox>
    </view>
</template>
<script>
import public_mixin from "@/mixins/public.js";
import popupBox from "@/component/popup-box/index";

export default {
    name: "answer",
    props: {},
    data() {
        return { QRcode_show: false };
    },
    components: {
        popupBox,
    },
    props: {
        list: {
            type: Object,
        },
    },
    mixins: [public_mixin],
    methods: {
        close() {
            this.QRcode_show = false;
        },
        setTimes(value) {
            var theTime = parseInt(value); //秒
            var theTime1 = 0; //分
            if (theTime > 60) {
                theTime1 = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                if (theTime1 > 60) {
                    theTime2 = parseInt(theTime1 / 60);
                    theTime1 = parseInt(theTime1 % 60);
                }
            }
            var theTime_y = parseInt(theTime);
            if (theTime_y < 10) {
                theTime_y = "0" + theTime_y;
            }
            var results = "" + theTime_y;
            if (theTime1 > 0 || theTime1 == 0) {
                var theTime1_y = parseInt(theTime1);
                if (theTime1_y < 10) {
                    theTime1_y = "0" + theTime1_y;
                }
                results = "" + theTime1_y + ":" + results;
            }
            return results;
        },
        again() {
            this.$emit("component_jump", "answer");
        },
    },
    created() {
        // this.list.time = this.setTimes(this.list.time);
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.answer {
    width: 100%;
    height: inherit;
    position: relative;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/start/background.png")
        no-repeat;
    background-size: 100%;
}
.box {
    width: 100%;
    height: 916upx;
    position: relative;
    margin: 0 auto 0 auto;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answerEnd/background.png")
        no-repeat;
    background-size: 100%;
    padding: 400upx 32upx 0 32upx;
    z-index: 95;
    top: -150upx;
    text {
        text-align: center;
    }
}
.title {
    width: 80%;
    margin: 120upx auto;
    text {
        font-size: 36upx;
        color: #d83423;
        font-weight: 600;
    }
}
.btnBox {
    width: 90%;
    height: 133upx;
    position: right;
    margin: 30upx auto 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    top: -150upx;

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
.tabbox {
    width: 80%;
    height: 209upx;
    position: fixed;
    bottom: 60upx;
    left: 10%;
    margin: 0 auto 0 auto;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answerEnd/background1.png")
        no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    view:nth-child(1) {
        width: 500upx;
        margin-left: 30upx;
        text {
            text-align: left;
            font-size: 28upx;
            color: #242424;
            font-weight: 600;
        }
    }
    view:nth-child(2) {
        width: 118upx;
        height: 118upx;
        margin-right: 30upx;
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