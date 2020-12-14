<template>
    <view class="box">
        <view v-if="this.list.state == '未申请'" class="not_applied">
            <view class="title">
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/card_title.png"
                />
                <text>申请后 7 个工作日内可领取</text>
                <view></view>
                <text>申请人资料:</text>
            </view>
            <view class="row name">
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/card_icon_1_white@3x.png"
                />
                <text>{{ list.nickname }}</text>
            </view>
            <view class="row number">
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/card_icon_2_white@3x.png"
                />
                <text>+86</text>
                <text>|</text>
                <text>{{ list.phone }}</text>
            </view>
            <view class="row name" @click="pickerShow">
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/card_icon_4_white@3x.png"
                />
                <text>{{ list.address }}</text>
            </view>
            <view class="row name">
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/card_icon_3_white@3x.png"
                />
                <text>{{ list.region }}</text>
            </view>
            <view class="item">
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/floors.png"
                />
                <text>{{ list.building }}</text>
                <text>|</text>
                <image
                    src="https://img.sporeblockchain.cn/static/relative_account/houses.png"
                />
                <text>{{ list.house }}</text>
            </view>
        </view>
        <view v-else class="card_box">
            <view class="card">
                <text>申请后 7 个工作日通知审核结果</text>
            </view>
            <view class="card_content">
                <text class="title">申请人资料</text>
                <view class="row name">
                    <image
                        src="https://img.sporeblockchain.cn/static/relative_account/card_icon_1@3x.png"
                    />
                    <text>{{ list.nickname }}</text>
                </view>
                <view class="row number">
                    <image
                        src="https://img.sporeblockchain.cn/static/relative_account/card_icon_2@3x.png"
                    />
                    <text>+86</text>
                    <text>|</text>
                    <text>{{ list.phone }}</text>
                </view>
                <view class="row name" @click="pickerShow">
                    <image
                        src="https://img.sporeblockchain.cn/static/relative_account/card_icon_4@3x.png"
                    />
                    <text>{{ list.address }}</text>
                </view>
                <view class="row name">
                    <image
                        src="https://img.sporeblockchain.cn/static/relative_account/card_icon_3@3x.png"
                    />
                    <text>{{ list.region }}</text>
                </view>
                <view class="item">
                    <image
                        src="https://img.sporeblockchain.cn/static/relative_account/floor.png"
                    />
                    <text>{{ list.building }}</text>
                    <text>|</text>
                    <image
                        src="https://img.sporeblockchain.cn/static/relative_account/house.png"
                    />
                    <text>{{ list.house }}</text>
                </view>
            </view>
        </view>
        <btnGreen
            class="btn_bottom"
            mode="1"
            :content="pageType.content"
            :color="pageType.color"
            @confirm="confirm"
        />
    </view>
</template>

<script>
import btnGreen from "@/component/btnGreen/index";
import { applicationDelivery } from "@/api/api_mapi";

import public_mixin from "@/mixins/public.js";

export default {
    name: "new_account",
    components: {
        btnGreen,
    },
    data() {
        return {
            list: {},
        };
    },
    mixins: [public_mixin],
    methods: {
        confirm() {
            // console.log("申请");
            if (this.list.state == "未申请") {
                this.applicationDelivery();
            }
        },
        applicationDelivery() {
            let data = {
                applets: this.$store.state.account.account,
                relativesid: this.list.relativesid,
                nickname: this.list.nickname,
                phone: this.list.phone,
                area: this.list.address,
                region: this.list.region,
            };
            applicationDelivery(data)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        uni.showToast({
                            title: "申请成功",
                            icon: "none",
                            duration: 2000,
                        });
                    } else {
                        uni.showToast({
                            title: "申请失败",
                            icon: "none",
                            duration: 2000,
                        });
                    }
                    let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
                    if (
                        routes[routes.length - 3].route ==
                        "pages/my/relativeAccount/new_account"
                    ) {
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 3,
                            });
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 2,
                            });
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    onLoad(option) {
        this.list = JSON.parse(option.data);
        console.log(this.list);
    },
    computed: {
        pageType() {
            let data = {};

            if (this.list.state == "未申请") {
                data = {
                    content: "立即申请",
                    color: "background_color_green_1",
                };
            } else if (this.list.state == "待审核") {
                data = {
                    content: "申请中",
                    color: "background_color_gray_2",
                };
            } else if (this.list.state == "审核未通过") {
                data = {
                    content: "审核未通过",
                    color: "background_color_gray_2",
                };
            } else if (this.list.state == "审核通过") {
                data = {
                    content: "已申请",
                    color: "background_color_gray_2",
                };
            } else if (this.list.state == "挂失中") {
                data = {
                    content: "挂失中",
                    color: "background_color_yellow_1",
                };
            } else if (this.list.state == "丢失") {
                data = {
                    content: "挂失",
                    color: "background_color_yellow_1",
                };
            }
            return data;
        },
    },
};
</script>

<style  lang="scss">
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: 100%;
    position: relative;
}
.not_applied {
    width: 100%;
    height: 1000upx;
    border-radius: 35upx;
    margin: 50upx auto 0 auto;
    background: url("https://img.sporeblockchain.cn/static/relative_account/card_bg@3x.png")
        no-repeat;
    background-size: 100% 105%;
    padding-top: 100upx;
    .title {
        width: 60%;
        height: 260upx;
        margin: 0 auto 0 auto;
        image:nth-child(1) {
            width: 144upx;
            height: 49upx;
        }
        text:nth-child(2) {
            text-align: left;
            color: $gray-1;
            margin-top: 20upx;
        }
        view:nth-child(3) {
            width: 40upx;
            height: 4upx;
            margin: 30upx 0 80upx 0;
            background-color: $white-2;
        }
        text:nth-child(4) {
            text-align: left;
            color: $gray-1;
            margin-top: 20upx;
        }
    }
    .row {
        width: 60%;
        height: 90upx;
        margin: 20upx auto 0 auto;
        display: flex;
        justify-content: left;
        align-items: center;
        image {
            width: 60upx;
            height: 60upx;
            margin-right: 30upx;
        }
        text {
            color: $gray-1;
            font-size: $font-size-3;
        }
    }
    .item{
        width: 60%;
        height: 90upx;
        margin: 0upx auto 0 auto;
        display: flex;
        justify-content: left;
        align-items: center;
        image {
            width: 60upx;
            height: 60upx;
            margin-right: 30upx;
        }
        text:nth-child(3){
            margin:  0 40upx;
        }
        text {
            color: $gray-1;
            font-size: $font-size-3;
        }
    }
    .number {
        text:nth-child(2) {
            width: 10%;
            font-weight: 600;
            font-size: $font-size-3;
        }
        text:nth-child(3) {
            width: 10%;
            margin: 0 10upx;
            font-size: $font-size-3;
        }
    }
}
.card_box {
    .card {
        width: 100%;
        height: 401upx;
        border-radius: 35upx;
        margin: 0upx auto 0 auto;
        background: url("https://img.sporeblockchain.cn/static/relative_account/card_img@2x.png")
            no-repeat;
        background-size: 100%;
        text {
            position: absolute;
            font-size: $font-size-3;
            color: $gray-1;
            bottom: 25%;
            left: 18%;
        }
    }
    .card_content {
        width: 80%;
        height: 632upx;
        border-radius: 10upx;
        margin: 0 auto;
        background-color: $white-1;
        .title {
            text-align: left;
            font-size: $font-size-3;
            color: $black-1;
            margin-left: 10%;
            font-weight: 600;
            padding-top: 50upx;
        }
        .row {
            width: 80%;
            height: 90upx;
            margin: 20upx auto 0 auto;
            display: flex;
            justify-content: left;
            align-items: center;
            image {
                width: 60upx;
                height: 60upx;
                margin-right: 30upx;
            }
            text {
                color: $black-1;
                font-size: $font-size-2;
            }
        }
        .item{
            width: 80%;
            height: 90upx;
            margin: 0upx auto 0 auto;
            display: flex;
            justify-content: left;
            align-items: center;
            image {
                width: 60upx;
                height: 60upx;
                margin-right: 30upx;
            }
            text:nth-child(3){
                margin:  0 40upx;
            }
            text {
                color: $gray-1;
                font-size: $font-size-3;
            }
        }
        .number {
            text:nth-child(2) {
                width: 10%;
                font-weight: 600;
                font-size: $font-size-3;
            }
            text:nth-child(3) {
                width: 10%;
                margin: 0 10upx;
                font-size: $font-size-3;
            }
        }
    }
    .tabbar {
        margin-top: 50upx;
        text {
            text-align: center;
            font-size: $font-size-2;
        }
    }
}
</style>
