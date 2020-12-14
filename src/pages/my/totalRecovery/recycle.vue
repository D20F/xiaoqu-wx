<template>
    <view class="box">
        <view class="title">
            <text>您的垃圾投递总量</text>
            <text>{{total}}</text>
            <text>公斤</text>
        </view>
        <view class="chart">
            <view class="xannotation">
                <text>0</text>
                <text>数量</text>
            </view>
            <view class="rowbox">
                <view
                    v-if="JSON.stringify(select_chart) !== '{}'"
                    class="tip"
                    :style="{top: select_chart.tipheight}"
                >
                    <text>{{select_chart.title}}</text>
                    <text>{{select_chart.weight}}</text>
                    <text>公斤</text>
                </view>
                <view
                    class="row"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="show_chartTip(item)"
                >
                    <text
                        :class="{font_gray_1:select_chart.title !== item.title,font_black_1:select_chart.title == item.title}"
                    >{{item.title}}</text>
                    <view>
                        <view :style="{backgroundColor:item.backcolor,width:item.percentage}"></view>
                    </view>
                </view>
            </view>
        </view>
        <view class="tabbar">
            <text class="tab_title">您的环保行为相当于</text>
            <view class="card">
                <view>
                    <image src="https://img.sporeblockchain.cn/static/my/total_img_1@3x.png" />
                    <text>
                        {{environmental.trees}}
                        <text>棵</text>
                    </text>
                    <text>植树造林</text>
                </view>
                <view>
                    <image src="https://img.sporeblockchain.cn/static/my/total_img_2@3x.png" />
                    <text>
                        {{environmental.sewage}}
                        <text>公斤</text>
                    </text>
                    <text>减排污水</text>
                </view>
                <view>
                    <image src="https://img.sporeblockchain.cn/static/my/total_img_3@3x.png" />
                    <text>
                        {{environmental.carbonEmission}}
                        <text>千克</text>
                    </text>
                    <text>减少碳排量</text>
                </view>
            </view>
        </view>
        <view class="btnbox">
            <btnGreen content="生成海报" @confirm="confirm" />
        </view>
    </view>
</template>

<script>
import btnGreen from "@/component/btnGreen/index";
import public_mixin from "@/mixins/public.js";
import { getPersonalDelivery } from "@/api/api_mapi";
import { Decimal } from "decimal.js";

export default {
    name: "delivery_details",
    components: {
        btnGreen,
    },
    data() {
        return {
            list: [
                {
                    title: "塑料",
                    backcolor: "#69D9BA",
                    tipheight: "-37%",
                    weight: "0",
                    percentage: "0%",
                },
                {
                    title: "饮料瓶",
                    backcolor: "#FAD340",
                    tipheight: "-25%",
                    weight: "0",
                    percentage: "0%",
                },
                {
                    title: "厨余",
                    backcolor: "#FEB66D",
                    tipheight: "-14%",
                    weight: "0",
                    percentage: "0%",
                },
                {
                    title: "纸类",
                    backcolor: "#5382D4",
                    tipheight: "-2%",
                    weight: "0",
                    percentage: "0%",
                },
                {
                    title: "纺织物",
                    backcolor: "#68DFFD",
                    tipheight: "9%",
                    weight: "0",
                    percentage: "0%",
                },
                {
                    title: "玻璃",
                    backcolor: "#F14E61",
                    tipheight: "20%",
                    weight: "0",
                    percentage: "0%",
                },
                {
                    title: "金属",
                    backcolor: "#969EEA",
                    tipheight: "33%",
                    weight: "0",
                    percentage: "0%",
                },
                {
                    title: "有害",
                    backcolor: "#242424",
                    tipheight: "43%",
                    weight: "0",
                    percentage: "0%",
                },
                {
                    title: "其他",
                    backcolor: "#E6E6E6",
                    tipheight: "55%",
                    weight: "0",
                    percentage: "0%",
                },
            ],
            select_chart: {},
            total: 0,
            environmental: {
                trees: "",
                sewage: "",
                carbonEmission: "",
            },
        };
    },
    mixins: [public_mixin],
    methods: {
        show_chartTip(data) {
            this.select_chart = data;
        },
        confirm() {
            let data = {
                total: this.total,
                environmental: {
                    trees: this.environmental.trees,
                    sewage: this.environmental.sewage,
                    carbonEmission: this.environmental.carbonEmission,
                },
            };
            this.jumpRouter("/pages/my/totalRecovery/poster", data);
        },
        getPersonalDelivery() {
            let data = {
                applets: this.$store.state.account.account,
            };
            getPersonalDelivery(data)
                .then((res) => {
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                        this.total = 0;
                        this.environmental.trees = 0;
                        this.environmental.sewage = 0;
                        this.environmental.carbonEmission = 0;
                    } else {
                        this.total = new Decimal(res.data.total).toFixed(2);
                        this.mergeList(res.data.list);
                        this.environmental.trees = new Decimal(this.total)
                            .mul(new Decimal(0.06))
                            .toFixed(2);
                        this.environmental.sewage = new Decimal(this.total)
                            .mul(new Decimal(0.2))
                            .toFixed(2);
                        this.environmental.carbonEmission = new Decimal(
                            this.total
                        )
                            .mul(new Decimal(0.3))
                            .toFixed(2);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        mergeList(val) {
            for (let item of val) {
                switch (item.classification) {
                    case "其他":
                        this.list[8].weight = item.quantity;
                        this.list[8].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    case "玻璃":
                        this.list[5].weight = item.quantity;
                        this.list[5].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    case "纸类":
                        this.list[3].weight = item.quantity;
                        this.list[3].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    case "纺织物":
                        this.list[4].weight = item.quantity;
                        this.list[4].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    case "饮料瓶":
                        this.list[1].weight = item.quantity;
                        this.list[1].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    case "金属":
                        this.list[6].weight = item.quantity;
                        this.list[6].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    case "塑料":
                        this.list[0].weight = item.quantity;
                        this.list[0].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    case "厨余":
                        this.list[2].weight = item.quantity;
                        this.list[2].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    case "有害":
                        this.list[7].weight = item.quantity;
                        this.list[7].percentage =
                            new Decimal(item.quantity)
                                .div(new Decimal(this.total))
                                .mul(100) + "%";
                        break;
                    default:
                        break;
                }
            }
        },
    },
    onLoad() {
        this.getPersonalDelivery();
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fafafa;
}
.title {
    width: 80%;
    margin: 30upx auto 30upx auto;
    text:nth-child(1) {
        font-size: $font-size-4;
        color: $gray-1;
        text-align: left;
        margin-bottom: 10upx;
    }
    text:nth-child(2) {
        font-size: 68upx;
        color: $black-1;
        font-weight: 600;
        display: inline-block;
    }
    text:nth-child(3) {
        font-size: $font-size-3;
        margin-left: 10upx;
        color: $black-1;
        display: inline-block;
    }
}
.chart {
    width: 80%;
    margin: 0 auto;
    .xannotation {
        width: 85%;
        margin: 0 0 40upx 15%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text {
            font-size: $font-size-2;
            color: $gray-1;
        }
    }
    .rowbox {
        width: 100%;
        margin-bottom: 100upx;
        .tip {
            width: 398upx;
            height: 273upx;
            background: url("https://img.sporeblockchain.cn/static/my/total_tip@3x.png")
                no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 44%;
            z-index: 10;
            text:nth-child(1) {
                margin: 50upx 0 0 100upx;
                font-size: $font-size-3;
                color: $gray-1;
                text-align: left;
                margin-bottom: 10upx;
            }
            text:nth-child(2) {
                margin: 0upx 0 0 100upx;
                font-size: $font-size-6;
                color: $black-1;
                font-weight: 600;
                display: inline-block;
            }
            text:nth-child(3) {
                margin: 0upx 0 0 100upx;
                font-size: $font-size-2;
                margin-left: 10upx;
                color: $black-1;
                display: inline-block;
            }
        }
        .row {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 20upx;
            text {
                text-align: left;
                width: 15%;
                font-size: $font-size-2;
            }
            view {
                border-radius: 15upx;
                height: 16upx;
                width: 85%;
            }
        }
    }
}
.tabbar {
    width: 80%;
    margin: 0 auto;
    .tab_title {
        font-size: $font-size-5;
        font-weight: 600;
        text-align: left;
        margin-bottom: 40upx;
    }
    .card {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40upx;
        view {
            border-radius: 25upx;
            width: 30%;
            height: 280upx;
            background: #ffffff;
            text-align: center;
        }
        image {
            width: 104upx;
            height: 104upx;
            margin: 20upx auto 0 auto;
        }
        text:nth-child(2) {
            font-size: $font-size-5;
            font-weight: 600;
            display: inline-block;
            margin: 20upx 0;
            text {
                display: inline-block;
                font-size: $font-size-3;
                color: $gray-1;
                margin-left: 10upx;
            }
        }
        text:nth-child(3) {
            font-size: $font-size-3;
        }
    }
}
.btnbox {
    width: 100%;
    height: 320upx;
}
</style>
