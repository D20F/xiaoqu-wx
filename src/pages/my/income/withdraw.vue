<template>
    <view class="box">
        <view class="content">
            <text class="font_gray1_28">可提现金额</text>
            <text>{{balance}}</text>
            <text class="font_weight_black1_32">提现金额</text>
            <view>
                <text class="font_weight_black1_32">{{withdraw}}</text>
                <text @click="allExchange">全部兑换</text>
            </view>
            <text>最小兑换数额为￥10.00</text>
            <text class="font_weight_black1_32">提现方式</text>
            <view>
                <image src="https://img.sporeblockchain.cn/static/my/change_icon@3x.png" />
                <text class="font_weight_black1_32">微信零钱</text>
            </view>
        </view>
        <btnGreen class="btn_bottom" mode="1" content="确认提现" @confirm="confirm" />
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import btnGreen from "@/component/btnGreen/index";
import { getCurrencyBalance } from "@/api/api_node";

export default {
    name: "delivery_details",
    components: {
        btnGreen,
    },
    data() {
        return {
            balance: '',
            withdraw: 0,
        };
    },
    mixins: [public_mixin],
    methods: {
        confirm() {
            // console.log(data);
            uni.showToast({
                title: "提现功能完善中",
                icon: "none",
                duration: 2000,
            });
            return ;

            if(Number(this.balance) < 10 || Number(this.balance) < Number(this.withdraw)){
                uni.showToast({
                    title: "账户余额不足",
                    icon: "none",
                    duration: 2000,
                });
                return ;
            }
        },
        allExchange() {
            this.withdraw = this.balance;
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
                    if (JSON.stringify(res) == "[]") {
                        that.balance = "0";
                    } else {
                        that.balance = res[0] ? res[0].split(' ')[0] : 0;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    onLoad() {
        this.getBalance();
    }
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
}

.content {
    width: 80%;
    margin: 0 auto;
    text:nth-child(1) {
        margin-top: 80upx;
    }
    text:nth-child(2) {
        color: $green-1;
        font-weight: 600;
        font-size: 64upx;
        margin-bottom: 80upx;
    }
    text:nth-child(3) {
        text-align: left;
        margin-bottom: 30upx;
    }
    view:nth-child(4) {
        margin-bottom: 40upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text:nth-child(1) {
            margin: 0;
            font-size: $font-size-4;
        }
        text:nth-child(2) {
            margin: 0;
            color: $green-1;
            font-size: $font-size-4;
        }
    }
    text:nth-child(5) {
        font-size: $font-size-3;
        text-align: left;
        margin-bottom: 80upx;
    }
    text:nth-child(6) {
        margin-bottom: 40upx;
        text-align: left;
    }
    view:nth-child(7) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        image:nth-child(1) {
            margin: 0;
            width: 88upx;
            height: 88upx;
        }
        text:nth-child(2) {
            margin: 0;
            color: $black-1;
            font-size: $font-size-3;
        }
    }
}
</style>
