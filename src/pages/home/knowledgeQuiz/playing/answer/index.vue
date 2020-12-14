<template>
    <view class="answer">
        <view class="time">
            <text>{{ account.index + 1 }} - 10</text>
        </view>
        <view class="quantity">
            <text>{{ countdown }}S</text>
        </view>
        <view class="box">
            <view class="title">
                <text>第 {{ account.index + 1 }} 题</text>
            </view>
            <view class="topic">
                <text>{{ current_list.topic }} </text>
            </view>
            <view
                class="btn"
                v-for="(item, index) of current_list.options"
                :key="index"
                :class="{ orange: options.title == item.title }"
                @click="select(item)"
            >
                <text>{{ item.title }}. {{ item.content }}</text>
                <!-- <image
                    v-if="options.title == item.title"
                    src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answerReview/sucess.png"
                /> -->
            </view>
        </view>
        <view class="next" @click="next"> </view>

        <answerReview
            v-if="err_show"
            :options="current_list.answer"
            @close="close"
        ></answerReview>
    </view>
</template>
<script>
import { questionBank } from "../../questionBank";
import answerReview from "../answerReview/index";
import { tr } from "date-fns/locale";
import public_mixin from "@/mixins/public.js";
import { ActivitySetRanking } from "@/api/api_mapi";

export default {
    name: "answer",
    props: {},
    data() {
        return {
            account: {
                index: 0,
                success: 0,
            },
            options: {},
            all_time: 0,
            err_show: false,
            countdown: 60,
            countdown_timeouter: "",
            list: [],
        };
    },
    mixins: [public_mixin],

    components: {
        answerReview,
    },
    methods: {
        countdown_start() {
            this.countdown_timeouter = setInterval(() => {
                this.countdown = this.countdown - 1;
                if (this.countdown == 0) {
                    this.countdown_init();
                    this.close();
                    this.countdown_start();
                }
            }, 1000);
        },
        countdown_init() {
            clearInterval(this.countdown_timeouter);
            this.countdown_timeouter = null;
            this.all_time = this.all_time + (60 - this.countdown);
            this.countdown = 60;
        },
        select(data) {
            this.options = data;
        },
        close() {
            this.err_show = false;
            this.options = {};
            this.countdown_init();
            this.countdown_start();
            if (this.account.index == 9) {
                this.end();
            } else {
                this.account.index = this.account.index + 1;
            }
        },
        next() {
            if (JSON.stringify(this.options) == "{}") {
                return console.log("选项未选中");
            }
            if (this.options.title == this.current_list.answer.title) {
                this.account.success = this.account.success + 1;
            } else {
                return (this.err_show = true);
            }
            this.options = {};
            this.countdown_init();
            this.countdown_start();
            if (this.account.index == 9) {
                this.end();
            } else {
                this.account.index = this.account.index + 1;
            }
        },
        end() {
            uni.showLoading({
                title: "积分上传中",
            });
            let data = {
                applets: this.$store.state.account.account,
                time: this.all_time,
                score: this.account.success * 100,
            };
            ActivitySetRanking(data)
                .then((res) => {
                    console.log(res);
                    uni.hideLoading();
                    if (res.status == 200) {
                        this.$emit("component_jump", "answerEnd", data);
                    } else {
                        uni.showToast({
                            title: "积分上传失败",
                            icon: "none",
                        });
                        this.$emit("component_jump", "answerEnd", data);
                    }
                })
                .catch((err) => {
                    uni.hideLoading();
                    console.log(err);
                    uni.showToast({
                        title: "积分上传失败",
                        icon: "none",
                    });
                    this.$emit("component_jump", "answerEnd", data);
                });
        },
    },
    beforeDestroy() {
        this.countdown_init();
    },
    created() {
        let index = Math.floor(Math.random() * 10);
        this.list = questionBank[index];
        this.countdown_start();
    },
    computed: {
        current_list() {
            return this.list[this.account.index];
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.answer {
    width: 100%;
    height: 100%;
    position: relative;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/start/background.png")
        no-repeat;
    background-size: 100%;
}
.box {
    width: 90%;
    height: 890upx;
    top: 170upx;
    left: 5%;
    position: absolute;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answer/content.png")
        no-repeat;
    background-size: 100%;
    padding: 84upx 42upx 0 42upx;
    .title {
        width: 80%;
        position: absolute;
        top: 20upx;
        left: 10%;
        text {
            text-align: center;
        }
    }
    .topic {
        width: 80%;
        height: 100upx;
        word-wrap: break-word;
        margin: 90upx auto 70upx auto;
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
        }
    }
    text {
        font-size: 36upx;
        color: #242424;
        font-weight: 600;
        text-align: left;
    }
}
.time {
    width: 300upx;
    height: 128upx;
    position: absolute;
    top: 30upx;
    left: 40upx;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answer/title1.png")
        no-repeat;
    background-size: 100%;
    padding: 0 60upx;
    text {
        text-align: center;
        line-height: 120upx;
        color: #242424;
        font-weight: 600;
        font-size: 38upx;
    }
}
.quantity {
    width: 300upx;
    height: 128upx;
    position: absolute;
    top: 30upx;
    right: 40upx;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answer/title2.png")
        no-repeat;
    background-size: 100%;
    padding: 0 60upx;
    text {
        text-align: center;
        line-height: 120upx;
        color: #242424;
        font-weight: 600;
        font-size: 38upx;
    }
}
.next {
    width: 80%;
    height: 134upx;
    position: absolute;
    bottom: 10upx;
    left: 10%;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/answer/next.png")
        no-repeat;
    background-size: 100%;
}
.orange {
    background: RGB(251, 195, 52);
}
</style>