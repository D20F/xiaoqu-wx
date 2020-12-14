<template>
    <view class="box">
        <view class="main">
            <view class="title">
                <view>
                    <image :src="list.titleImg" />
                </view>
                <view>
                    <text>{{list.title}}</text>
                    <text>{{list.comment}}</text>
                </view>
            </view>
            <view class="splitLine">
                <view></view>
                <view>
                    <text>以下类型仅供参考</text>
                </view>
                <view></view>
            </view>
            <view class="content">
                <view class="row" v-for="(item, index) in list.img" :key="index">
                    <image :src="item.src" />
                    <text>{{item.title}}</text>
                </view>
            </view>
            <view class="tips">
                <image src="https://img.sporeblockchain.cn/static/recycle/prompt_icon@3x.png" />
                <text>{{list.tip}}</text>
            </view>
        </view>

        <view class="tabbar">
            <tabSwiper
                @change="change"
                @selectedFun="selectedFun"
                :tabList="tabList"
                :selected="selected"
            ></tabSwiper>
        </view>

        <view class="indicator">
            <view
                :class="{background_color_green_4: index == 0, background_color_gray_2: index == 1}"
            ></view>
            <view
                :class="{background_color_green_4: index == 1, background_color_gray_2: index == 0}"
            ></view>
        </view>
    </view>
</template>


<script>
import public_mixin from "@/mixins/public.js";
import tabSwiper from "./tabSwiper";
import { sortList, tabList } from "./config";

export default {
    components: { tabSwiper },
    data() {
        return {
            tabList: tabList,
            selected: "plastic",
            index: 0,
        };
    },
    mixins: [public_mixin],
    methods: {
        change(i) {
            this.index = i;
        },
        selectedFun(data) {
            this.selected = data;
        },
    },
    onLoad() {
        console.log(sortList);
    },
    computed: {
        list() {
            return sortList[this.selected];
        },
    },
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
.tabbar {
    width: 100%;
    height: 240upx;
    position: fixed;
    bottom: 0;
    border-radius: 30upx 30upx 0 0;
    background: #ffffff;
}
.main {
    width: 90%;
    border-radius: 30upx;
    margin: 40upx auto;
    background: rgba(255, 255, 255, 1);
    .title {
        width: 90%;
        padding-top: 60upx;
        margin: 0 auto 50upx auto;
        display: flex;
        justify-content: left;
        align-content: center;
        view:nth-child(1) {
            border-radius: 20upx;
            width: 104upx;
            height: 104upx;
            box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.05);
            image {
                margin: 20upx auto;
                width: 64upx;
                height: 64upx;
            }
        }
        view:nth-child(2) {
            height: 104upx;
            margin-left: 40upx;
            text:nth-child(1) {
                line-height: 52upx;
                text-align: left;
                color: $green-1;
                font-weight: 600;
                font-size: $font-size-6;
            }
            text:nth-child(2) {
                line-height: 52upx;
                text-align: left;
                color: $green-1;
                font-size: $font-size-3;
            }
        }
    }
    .splitLine {
        margin-bottom: 60upx;
        display: flex;
        justify-content: center;
        align-content: center;
        view:nth-child(1) {
            flex: 1;
            height: 1px;
            margin-top: 17upx;
            background: rgba(230, 230, 230, 1);
        }
        view:nth-child(2) {
            flex: 2;
            text {
                font-size: $font-size-4;
                color: $black-1;
            }
        }
        view:nth-child(3) {
            flex: 1;
            height: 1px;
            margin-top: 17upx;
            background: rgba(230, 230, 230, 1);
        }
    }
    .content {
        width: 90%;
        margin: 0 auto;
        .row {
            display: inline-block;
            width: 170upx;
            height: 218upx;
            background: rgba(250, 250, 250, 1);
            margin: 0 0 35upx 25upx;
            border-radius: 20upx;
            image {
                width: 112upx;
                height: 112upx;
                margin: 20upx auto;
            }
            text {
                text-align: center;
                font-size: $font-size-3;
            }
        }
    }
    .tips {
        width: 90%;
        margin: 0 auto;
        height: 112upx;
        display: flex;
        justify-content: left;
        align-content: center;
        border-radius: 25upx;
        background: rgba(251, 210, 57, 0.11);
        image {
            width: 112upx;
            height: 112upx;
            margin: 0 10upx;
        }
        text {
            width: 450upx;
            margin-top: 15upx;
            line-height: 40upx;
            text-align: left;
            font-size: $font-size-3;
            color: $yellow-1;
        }
    }
}
.indicator {
    position: fixed;
    bottom: 50upx;
    width: 100%;
    height: 24upx;
    display: flex;
    justify-content: center;
    align-content: center;
    view {
        width: 24upx;
        height: 4upx;
    }
}
</style>
