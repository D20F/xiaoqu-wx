<template>
    <view class="box">
        <view v-if="list.length == 0" class="no_exist">
            <image src="https://img.sporeblockchain.cn/static/zero_record/default_03@3x.png" />
            <text>还没有添加门户地址哦~</text>
        </view>
        <view v-else class="content">
            <sliderComponent
                :show="item.show"
                :index="index"
                v-for="(item, index) in list"
                :key="item.id"
                @deleteRow="deleteRow"
                @open="open"
                :options="options"
                class="rowbox"
            >
                <view class="item u-border-bottom" @click="selectFun(index)">
                    <view class="left">
                        <view class="row">
                            <view
                                :class="{background_color_gray_1:select_index !== index,background_color_green_1:select_index == index}"
                            ></view>
                            <view>
                                <text>
                                    {{ item.nickname }}
                                    <text>{{ item.phone }}</text>
                                </text>
                                <text>
                                    {{ item.area }}
                                    <text>{{ item.region }}</text>
                                </text>
                            </view>
                            <image
                                @click="jumpRouter('/pages/my/bindPortal/changeAddress',item)"
                                src="https://img.sporeblockchain.cn/static/my/portal_icon_editor@3x.png"
                            />
                        </view>
                    </view>
                </view>
            </sliderComponent>
        </view>
        <view class="tabbar">
            <btnGreen class="btn_bottom" mode="1" content="新增地址" @confirm="confirm" />
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import btnGreen from "@/component/btnGreen/index";
import sliderComponent from "./slider-component";
import { portalAddressCheck, portalAddressDelete } from "@/api/api_mapi";

export default {
    components: {
        btnGreen,
        sliderComponent,
    },
    data() {
        return {
            list: [],
            select_index: 0,
            disabled: false,
            btnWidth: 180,
            show: false,
            options: [
                {
                    text: "确认删除",
                    style: {
                        backgroundColor: "#F1485B",
                    },
                },
            ],
        };
    },
    mixins: [public_mixin],
    methods: {
        confirm() {
            this.jumpRouter("/pages/my/bindPortal/addAddress");
        },
        selectFun(data) {
            this.select_index = data;
        },
        deleteRow(index) {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
                id: this.list[index].id,
            };
            portalAddressDelete(data)
                .then((res) => {
                    if (res.status == 200) {
                        this.portalAddressCheck();
                        uni.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 2000,
                        });
                    } else {
                        uni.showToast({
                            title: "删除失败",
                            icon: "none",
                            duration: 2000,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    uni.showToast({
                        title: "删除失败",
                        icon: "none",
                        duration: 2000,
                    });
                });
            // 获取到数据删除
        },
        // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
        open(index) {
            // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
            // 原本为'false'，再次设置为'false'会无效
            this.list[index].show = true;
            this.list.map((val, idx) => {
                if (index != idx) this.list[idx].show = false;
            });
        },
        portalAddressCheck() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
            };
            portalAddressCheck(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        this.list = [];
                    } else {
                        this.list = res.data.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    watch: {},
    computed: {},
    mounted() {},
    onLoad() {},
    onShow() {
        this.portalAddressCheck();
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
    background: rgb(250, 250, 250);
}
.content {
    width: 90%;
    margin: 0 auto;
    height: 100%;
    padding-top: 50upx;
    padding-bottom: 160upx;
}
.tabbar {
    width: 100%;
    height: 160upx;
    position: fixed;
    background: #ffffff;
    bottom: 0%;
}
.rowbox {
    width: 100%;
    height: 206upx;
    margin: 0 auto 40upx auto;
    border-radius: 30upx;
    .left {
        background: #ffffff;
        width: 100%;
        height: 206upx;
        border-radius: 30upx;
        .row {
            width: 100%;
            height: 206upx;
            display: flex;
            justify-content: space-around;
            align-items: center;
            image {
                width: 88upx;
                height: 88upx;
            }
            view:nth-child(1) {
                width: 24upx;
                height: 24upx;
                left: -12upx;
                top: 60upx;
                border-radius: 50%;
                position: absolute;
            }
            view:nth-child(2) {
                text:nth-child(1) {
                    line-height: 60upx;
                    color: $black-1;
                    font-weight: 600;
                    font-size: $font-size-5;
                    text-align: left;
                    text {
                        margin-left: 20upx;
                        color: $black-1;
                        line-height: 60upx;
                        display: inline;
                        font-size: $font-size-5;
                    }
                }
                text:nth-child(2) {
                    line-height: 60upx;
                    color: $gray-1;
                    font-size: $font-size-3;
                    text-align: left;
                    text {
                        margin-left: 20upx;
                        line-height: 60upx;
                        display: inline;
                        color: $gray-1;
                        font-weight: 300;
                        font-size: $font-size-3;
                    }
                }
            }
        }
    }
    .right {
        width: 200upx;
        height: 206upx;
        border-radius: 30upx;
        background: $red-1;
        image {
            width: 88upx;
            height: 88upx;
            margin: 59upx auto 0 auto;
        }
        text {
            font-size: $font-size-3;
            color: $white-1;
            letter-spacing: 20upx;
            width: 100upx;
            text-align: center;
            margin: 65upx 0 0 60upx;
        }
    }
}
.no_exist {
    width: 100%;
    height: inherit;
    image {
        width: 320upx;
        height: 320upx;
        margin: 30% auto 50upx auto;
    }
    text {
        color: $gray-1;
        font-size: $font-size-3;
    }
}
</style>
