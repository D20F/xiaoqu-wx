<template>
    <view class="box">
        <view class="content">
            <view class="space"></view>
            <text class="title">可提现金额</text>
            <view class="box_1">
                <view>
                    <text>{{balance}} 环保金</text>
                </view>
                <view @click="jumpRouter('/pages/my/income/withdraw')">
                    <text>提现</text>
                </view>
            </view>
            <view class="box_2">
                <text>
                    投递次数:
                    <text>{{count}}</text>
                </text>
                <text>
                    可用积分:
                    <text>{{integral}} 积分</text>
                </text>
            </view>
        </view>
        <view class="detail">
            <u-sticky>
                <view class="sticky">
                    <text class="uniText_left font_weight_black1_36">积分明细</text>
                    <view class="select">
                        <view @click="type_show = true">
                            <text>{{selected_type}}</text>
                            <image
                                src="https://img.sporeblockchain.cn/static/recycle/details_icon_an.png"
                            />
                        </view>
                        <view @click="time_show = true">
                            <text>{{selected_data.year}}.{{selected_data.month}}</text>
                            <image
                                src="https://img.sporeblockchain.cn/static/recycle/details_icon_an.png"
                            />
                        </view>
                    </view>
                </view>
            </u-sticky>
            <view class="row" v-for="(item, index) in show_list" :key="index">
                <view class="left">
                    <view>
                        <image
                            v-if="item.name == '终端回收'"
                            src="https://img.sporeblockchain.cn/static/my/earnings_icon_01@2x.png"
                        />
                        <image
                            v-else-if="item.name == '上门回收'"
                            src="https://img.sporeblockchain.cn/static/my/earnings_icon_02@2x.png"
                        />
                        <image
                            v-else-if="item.name == '提现'"
                            src="https://img.sporeblockchain.cn/static/my/earnings_icon_03@2x.png"
                        />
                        <image
                            v-else-if="item.name == '兑换'"
                            src="https://img.sporeblockchain.cn/static/my/earnings_icon_04@2x.png"
                        />
                        <image
                            v-else-if="item.name == '其他'"
                            src="https://img.sporeblockchain.cn/static/my/earnings_icon_05@2x.png"
                        />
                    </view>
                    <view>
                        <text>{{item.name}}</text>
                        <text>{{item.times}}</text>
                    </view>
                </view>
                <view class="right">
                    <text v-if="item.type == 'JF'" class="font_red_1">{{item.score}}积分</text>
                    <text v-else>{{item.score}}环保金</text>
                </view>
            </view>
        </view>
        <view>
            <u-picker mode="time" v-model="time_show" :params="params" @confirm="confirm"></u-picker>
        </view>
        <view v-if="type_show" class="background_mask"></view>
        <view v-if="type_show" class="select_type">
            <text class="uniText_left font_weight_black1_36">积分明细</text>
            <view class="row">
                <view
                    @click="select_typeFun(item)"
                    :class="{border_gray:item !== selected_type,border_green:item == selected_type}"
                    v-for="(item, index) in type_list[0]"
                    :key="index"
                >
                    <text
                        :class="{font_gray_1:item !== selected_type,font_green_1:item == selected_type}"
                    >{{item}}</text>
                </view>
            </view>
            <view class="row">
                <view
                    @click="select_typeFun(item)"
                    :class="{border_gray:item !== selected_type,border_green:item == selected_type}"
                    v-for="(item, index) in type_list[1]"
                    :key="index"
                >
                    <text
                        :class="{font_gray_1:item !== selected_type,font_green_1:item == selected_type}"
                    >{{item}}</text>
                </view>
            </view>
            <view class="btn" @click="type_show = false">
                <text>确认</text>
            </view>
        </view>
    </view>
</template>

<script>
import public_mixin from "../../../mixins/public.js";
import { getCurrencyBalance } from "@/api/api_node";
import { getPointsDetails } from "@/api/api_mapi";
import { format, parse } from "date-fns";

export default {
    name: "delivery_details",
    components: {},
    data() {
        return {
            params: {
                year: true,
                month: true,
            },
            time_show: false,
            type_show: false,
            list: [],
            type_list: [
                ["全部", "提现", "兑换"],
                ["终端回收", "上门回收", "其他"],
            ],
            show_list: [],
            selected_type: "全部",
            selected_data: {
                year: "",
                month: "",
            },
            balance: "",
            integral: "",
			count: 0
        };
    },
    mixins: [public_mixin],
    methods: {
        getTime() {
            this.selected_data.year = new Date().getFullYear();
            this.selected_data.month = new Date().getMonth() + 1;
        },
        confirm(data) {
            this.selected_data = data;
            this.time_show = false;
            this.selected_dataFun(data);
        },
        selected_dataFun(data) {
            let list = [];
            for (const item of this.list) {
                let time = item.times.split(" ")[0].split("-");
                if (time[0] == data.year && time[1] == data.month) {
                    list.push(item);
                }
            }
            this.show_list = list;
        },
        select_typeFun(data) {
            this.selected_type = data;
            if (data == "全部") {
                this.show_list = this.list;
            } else {
                let list = [];
                for (const item of this.list) {
                    if (item.name == data) {
                        list.push(item);
                    }
                }
                this.show_list = list;
            }
        },
        getBalance() {
            let that = this;
            let data = {
                account: this.$store.state.account.account,
                code: "baz.token",
                symbol: "HBB",
            };
            getCurrencyBalance(data)
                .then((res) => {
                    console.log(res)
                    if (JSON.stringify(res) == "[]") {
                        that.balance = "0";
                    } else {
                        that.balance = res[0].split(' ')[0];
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getIntegral() {
            let that = this;
            let data = {
                account: this.$store.state.account.account,
                code: "baz.token",
                symbol: "JF",
            };
            getCurrencyBalance(data)
                .then((res) => {
                    console.log(res)
                    if (JSON.stringify(res) == "[]") {
                        that.integral = "0";
                    } else {
                        that.integral = res[0].split(' ')[0];
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getPointsDetails() {
            let that = this;
            let data = {
                applets: that.$store.state.account.account,
            };
            getPointsDetails(data)
                .then((res) => {
                    // console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        that.list = [];
                    } else {
                        that.list = res.data.list;
                        for (const item of res.data.list) {
                            item.times = format(new Date(item.times + 'Z'), 'yyyy-MM-dd HH:mm:ss');
                        }
                        that.select_typeFun("全部");
                        // that.selected_dataFun(that.selected_data);
						that.count = res.data.count ? res.data.count : 0;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    onLoad() {
        this.getTime();
        this.getBalance();
        this.getIntegral();
        this.getPointsDetails();
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
    background: #1ac771;
}
.space {
    width: 200upx;
    height: 50upx;
}
.content {
    width: 90%;
    height: 408upx;
    margin: 0 auto;
    position: relative;
    .title {
        text-align: left;
        margin-bottom: 5%;
        font-size: $font-size-5;
        color: rgba(255, 255, 255, 0.5);
    }
    .box_1 {
        margin-bottom: 8%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        view:nth-child(1) {
            text {
                font-size: 64upx;
                color: #ffffff;
            }
        }
        view:nth-child(2) {
            width: 145upx;
            height: 72upx;
            border-radius: 60upx;
            background: rgba(255, 255, 255, 0.2);
            text {
                line-height: 72upx;
                font-size: $font-size-4;
                color: #ffffff;
            }
        }
    }
    .box_2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text {
            display: inline-block;
            font-size: $font-size-5;
            color: rgba(255, 255, 255, 0.5);
            text {
                font-size: $font-size-5;
                color: #ffffff;
                display: inline-block;
                margin-left: 10upx;
            }
        }
    }
}
.detail {
    width: 100%;
    min-height: 74%;
    background: #ffffff;
    border-radius: 50upx 50upx 0 0;
    padding: 40upx 5% 0 5%;
    .sticky {
        background: #ffffff;
        .select {
            margin: 30upx auto 40upx auto;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            view {
                display: flex;
                justify-content: space-around;
                align-items: center;
                border: 1px solid rgba(230, 230, 230, 1);
                width: 47%;
                height: 80upx;
                border-radius: 24upx;
                text {
                    font-size: $font-size-4;
                    color: $black-1;
                }
                image {
                    width: 24upx;
                    height: 24upx;
                }
            }
        }
    }
    .row {
        .left {
            width: 60%;
            display: inline-block;
            height: 88upx;
            margin-bottom: 40upx;
            vertical-align: middle;
            view:nth-child(1) {
                width: 88upx;
                height: 88upx;
                vertical-align: middle;
                display: inline-block;
                image {
                    width: 88upx;
                    height: 88upx;
                }
            }
            view:nth-child(2) {
                margin-left: 30upx;
                vertical-align: middle;
                height: 88upx;
                display: inline-block;
                text {
                    text-align: left;
                    line-height: 44upx;
                }
                text:nth-child(1) {
                    font-weight: 600;
                    font-size: $font-size-4;
                    color: $black-1;
                }
                text:nth-child(2) {
                    font-size: $font-size-3;
                    color: $gray-1;
                }
            }
        }
        .right {
            vertical-align: middle;
            width: 40%;
            display: inline-block;
            height: 88upx;
            margin-bottom: 40upx;
            text {
                text-align: right;
                line-height: 88upx;
                font-size: $font-size-4;
                font-weight: 600;
            }
        }
    }
}
.margin_left_20 {
    margin-left: 20upx;
}
.select_type {
    width: 100%;
    height: 500upx;
    bottom: 0;
    left: 0;
    position: fixed;
    background: #ffffff;
    border-radius: 50upx 50upx 0 0;
    padding: 40upx 5% 0 5%;
    z-index: 10;
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30upx 0;
        view {
            height: 80upx;
            width: 30%;
            border-radius: 40upx;
            text {
                line-height: 80upx;
            }
        }
    }
    .btn {
        position: absolute;
        bottom: 10%;
        width: 90%;
        height: 90upx;
        border-radius: 25upx;
        left: 5%;
        text-align: center;
        background: $green-1;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: $font-size-5;
        }
    }
}
.border_green {
    border: 1px solid $green-1;
}
.border_gray {
    border: 1px solid $gray-1;
}
</style>
