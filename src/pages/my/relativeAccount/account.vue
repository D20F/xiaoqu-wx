<template>
    <view class="box">
        <view v-if="list.length == 0" class="no_exist">
            <image
                src="https://img.sporeblockchain.cn/static/zero_record/default_05@3x.png"
            />
            <text>还没有添加亲属账号哦~</text>
        </view>
        <view v-else class="exist">
            <view
                v-for="(item, index) in list"
                :key="index"
            >
                <card :list="item" @deletes="deletes"/>
            </view>
        </view>



        <view v-if="portal_mode" class="btnBox">
            <view @click="confirm">
                <text>新增亲属</text>
            </view>
            <view @click="select_mode = true">
                <text>快速申请</text>
            </view>
        </view>
        <view v-else class="btnbox">
            <btnGreen
                class="btn_bottom"
                mode="1"
                content="新增亲属"
                @confirm="confirm"
            />
        </view>


        <popupBox v-if="select_mode" @close="close">
            <view class="selectBox">
                <view class="rowbox" v-for="(item, index) in portal_list" :key="item.id">
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
                            </view>
                            <view class="btn_apply" @click="selectApply(item)">
                                <text>申请</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </popupBox>

    </view>
</template>

<script>
import btnGreen from "@/component/btnGreen/index";
import public_mixin from "@/mixins/public.js";
import card from "./card";
import { relativesCheck,relativesDel,portalAddressCheck } from "@/api/api_mapi";
import popupBox from "@/component/popup-box/index";

export default {
    name: "account",
    components: {
        btnGreen,
        card,
        popupBox,
    },
    data() {
        return {
            list: [],
            portal_list:[],
            portal_mode:false,
            select_mode:false,
            select_index:0
        };
    },
    mixins: [public_mixin],
    methods: {
        close() {
            this.select_mode = false;
        },
        confirm() {
            this.jumpRouter("/pages/my/relativeAccount/new_account");
        },
        relativesCheck() {
            let data = {
                applets: this.$store.state.account.account,
            };
            relativesCheck(data)
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
        deletes(data) {
            if(data.state == '待审核'){
                return uni.showToast({
                    title: "投递卡申请中，亲属账号无法删除",
                    icon: "none",
                });
            }else if(data.state == '审核通过'){
                return uni.showToast({
                    title: "投递卡申请完成，亲属账号无法删除",
                    icon: "none",
                });
            }else if(data.state == '挂失中'){
                return uni.showToast({
                    title: "投递卡挂失中，亲属账号无法删除",
                    icon: "none",
                });
            }
            let list = {
                relativesid: data.relativesid,
            };
            relativesDel(list)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        this.relativesCheck();
                        uni.showToast({
                            title: "删除成功",
                            icon: "none",
                        });
                    } else {
                        uni.showToast({
                            title: "删除失败",
                            icon: "none",
                        });
                    }
                })
                .catch((err) => {
                    uni.showToast({
                        title: "删除失败",
                        icon: "none",
                    });
                    console.log(err);
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
                        this.portal_list = [];
                        this.portal_mode = false;
                    } else {
                        this.portal_mode = true;
                        this.portal_list = res.data.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        selectFun(index){
            this.select_index = index;
        },
        selectApply(item){
            this.close();
            this.jumpRouter('/pages/my/relativeAccount/new_account',item)
        }
    },
    onLoad() {},
    onShow() {
        this.relativesCheck();
        this.portalAddressCheck();
    },
    computed:{

    }
};
</script>

<style  lang="scss">
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: inherit;
    position: relative;
    background-color: $white-1;
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
.exist{
    width: 100%;
    padding-bottom: 180upx;
}
.btnbox{
    width: 100%;
    height: 180upx;
    position: fixed;
    bottom: 0%;
    background: #ffffff;

}

.btnBox {
    width: 100%;
    height: 180upx;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    view:nth-child(1) {
        background-color: $green-4;
    }
    view:nth-child(2) {
        background-color: $green-4;
    }
    view {
        width: 43%;
        height: 90upx;
        border-radius: 15upx;
        text {
            color: #ffffff;
            line-height: 90upx;
            font-size: $font-size-4;
        }
    }
}

.selectBox{
    width: 90%;
    height: 800upx;
    overflow: scroll;
    z-index: 100;
    background: #ffffff;
    margin:200upx auto 0 auto;
    border-radius: 30upx;
}
.rowbox {
    width: 90%;
    height: 206upx;
    margin: 0 auto 40upx auto;
    border-radius: 30upx;
    .left {
        background: #ffffff;
        width: 100%;
        height: 206upx;
        border-radius: 30upx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .row {
            width: 100%;
            height: 206upx;
            display: flex;
            justify-content: space-around;
            align-items: center;
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
        .btn_apply {
            background-color: $green-4;
            width: 100upx;
            height: 60upx;
            border-radius: 15upx;
            text {
                color: #ffffff;
                line-height: 60upx;
                font-size: $font-size-4;
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


</style>
