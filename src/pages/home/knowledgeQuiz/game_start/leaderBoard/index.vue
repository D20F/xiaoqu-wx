<template>
    <view class="leaderBoard">
        <view class="back" @click="back">
            <image
                src="https://img.sporeblockchain.cn/static/home/knowledgeQuiz/back.png"
            />
        </view>
        <!-- 排行榜 -->
        <view class="content_bg">
            <view class="title">
                <view>
                    <text>排名</text>
                </view>
                <view>
                    <text>时间</text>
                </view>
                <view>
                    <text>积分</text>
                </view>
            </view>
            <view class="contentbox">
                <scroll-view class="content" :scroll-y="true">
                    <view
                        class="row"
                        v-for="(item, index) of list"
                        :key="index"
                    >
                        <view>
                            <image
                                v-if="item.rank < 4"
                                :src="'https://img.sporeblockchain.cn/static/home/knowledgeQuiz/leaderBoard/rank' + item.rank + '.png'"
                            />
                            <text v-else>{{ item.rank }}</text>
                            <image :src="item.headurl" mode="" />
                            <text>{{ item.nickname }}</text>
                        </view>
                        <view>
                            <text>{{ item.time }}秒</text>
                            <text>{{ item.score }}</text>
                        </view>
                    </view>
                </scroll-view>
                <view class="my">
                    <view class="row">
                        <view>
                            <image
                                v-if="my.rank < 4"
                                :src="'https://img.sporeblockchain.cn/static/home/knowledgeQuiz/leaderBoard/rank' + my.rank + '.png'"
                            />
                            <text v-else>{{ my.rank }}</text>
                            <image :src="my.headurl" mode="" />
                            <text>{{ my.nickname }}</text>
                        </view>
                        <view>
                            <text>{{ my.time }}秒</text>
                            <text>{{ my.score }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { getActivityRanking } from "@/api/api_mapi";

export default {
    name: "leaderBoard",
    props: {},
    data() {
        return {
            list: [],
            my: {},
        };
    },
    methods: {
        back() {
            this.$emit("component_jump", "start");
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
    },
    created() {
        let data = {
            applets: this.$store.state.account.account,
        };
        getActivityRanking(data)
            .then((res) => {
                console.log(res);
                if (JSON.stringify(res.data.list) == "[]") {
                } else {
                    // for (let item of res.data.list) {
                    //     item.time = this.setTimes(item.time);
                    // }
                    this.list = res.data.list;
                    this.my = res.data.main;
                    // this.my.time = this.setTimes(res.data.main.time);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.leaderBoard {
    width: 100%;
    height: inherit;
    position: relative;
}
.content_bg {
    width: 90%;
    height: 1100upx;
    margin: 100upx auto 0 auto;
    position: relative;
    background: url("https://img.sporeblockchain.cn/static/home/knowledgeQuiz/leaderBoard/background.png")
        no-repeat;
    background-size: 100%;
    padding-top: 330upx;
}
.title {
    text {
        color: #000000;
        font-weight: 600;
        font-size: 28upx;
    }
    width: 78%;
    margin: 0 auto;
    height: 77upx;
    padding: 0 20upx;
    background: #fbf3c9;
    view {
        height: 100%;
        display: inline-block;
        text {
            line-height: 77upx;
        }
    }
    view:nth-child(1) {
        width: 60%;
        text {
            text-align: left;
        }
    }
    view:nth-child(2) {
        width: 20%;
        text {
            text-align: right;
        }
    }
    view:nth-child(3) {
        width: 20%;
        text {
            text-align: right;
        }
    }
}
.contentbox {
    width: 78%;
    margin: 0 auto;
    height: 580upx;
    .content {
        width: 100%;
        height: 100%;
    }
    .row {
        width: 100%;
        height: 56upx;
        padding: 0 20upx;
        display: flex;
        margin: 20upx auto;
        view {
            height: 100%;
            text {
                line-height: 56upx;
                color: #242424;
                font-weight: 600;
                font-size: 28upx;
            }
        }
        view:nth-child(1) {
            width: 60%;
            display: flex;
            justify-content: left;
            align-items: center;
            text {
                white-space: nowrap;
                text-align: left;
            }
            image {
                width: 40upx;
                height: 40upx;
            }
            text:nth-child(1) {
                width: 40upx;
                text-align: center;
            }
            image:nth-child(2) {
                margin: 0 10upx;
            }
        }
        view:nth-child(2) {
            width: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            text {
                width: 50%;
                white-space: nowrap;
                text-align: right;
            }
        }
    }
}
.my {
    width: 100%;
    margin: 0 auto;
    height: 80upx;
    border-top: 4upx solid;
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
</style>