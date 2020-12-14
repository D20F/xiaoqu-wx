<template>
    <view class="delivery">
        <image
            src="https://img.sporeblockchain.cn/static/recycle/complete_icon.png"
        />
        <text @click="portalAddressCheck">本次垃圾投递获得总收益</text>
        <text>
            <span v-if="balance_gold >= 0">+</span>
            {{ balance_gold }} 环保金
        </text>
        <view>
            <text>
                <span v-if="balance_integral >= 0">+</span>
                {{ balance_integral }} 积分
            </text>
        </view>
        <btnGreen content="确定" @confirm="confirm" class="btn_position" />
        <text @click="jump_moderated">查看详情</text>
        <text>由于需核对原因，收益需核对后送达，请耐心等候</text>

        <u-modal
            v-model="popup"
            :show-cancel-button="true"
            @confirm="jumpRouter('/pages/my/bindPortal/addAddress')"
            @cancel="cancel"
            :content="content"
        ></u-modal>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import garbage_delivery from "@/mixins/garbage_delivery.js";
import { Decimal } from "decimal.js";
import btnGreen from "@/component/btnGreen/index";
import { portalAddressCheck } from "@/api/api_mapi";
import { tr } from "date-fns/locale";

export default {
    name: "delivery_completed",
    components: {
        btnGreen,
    },
    data() {
        return {
            transaction_id: "",
            popup: false,
            popup_show: true,
            content: "检测到未绑定门户地址，是否跳转绑定门户地址",
        };
    },
    mixins: [public_mixin, garbage_delivery],
    methods: {
        async confirm() {
            if (this.popup_show) {
                this.popup = await this.portalAddressCheck();
                if (this.popup) {
                    return (this.popup = true);
                }
            }
            if (this.stop_click) {
                return;
            }
            this.stop_click = true;
            this.send(this.sendType("selectBox"))
                .then((res) => {
                    this.jumpRouter_reLaunch("/pages/home/home");
                })
                .catch((err) => {
                    console.log(err);
                    this.jumpRouter_reLaunch("/pages/home/home");
                });
            this.stop_click = false;
        },
        cancel() {
            this.popup = false;
            this.popup_show = false;
        },
        jump_moderated() {
            // this.jumpRouter("/pages/recycle/moderated", this.transaction_id);
            this.jumpRouter("/pages/my/order/delivery_details", {
                id: this.transaction_id,
                violation: false,
            });
        },
        async portalAddressCheck() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
            };
            try {
                let res = await portalAddressCheck(data);
                console.log(res);
                if (JSON.stringify(res.data.list) == "[]") {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }
        },
    },
    computed: {
        list() {
            return this.$store.state.garbageDelivery.garbageList;
        },
        balance_gold() {
            let data = new Decimal(0);
            for (const item of this.list) {
                if (item.currency == "环保金") {
                    data = data.add(item.reward);
                }
            }
            return data.toNumber();
        },
        balance_integral() {
            let data = new Decimal(0);
            for (const item of this.list) {
                if (item.currency == "积分") {
                    data = data.add(item.reward);
                }
            }
            return data.toNumber();
        },
    },
    async onLoad(option) {
        const item = JSON.parse(option.data);
        console.log(item);
        this.transaction_id = item.transaction_id;
        this.monitor();
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.delivery {
    width: 100%;
    height: 100%;
    position: relative;
    image:nth-child(1) {
        width: 150upx;
        height: 150upx;
        margin: 180upx auto 0 auto;
    }
    text:nth-child(2) {
        color: $gray-1;
        font-size: $font-size-5;
        margin-top: 40upx;
    }
    text:nth-child(3) {
        font-size: 64upx;
        margin-top: 40upx;
        font-weight: 600;
    }
    view:nth-child(4) {
        margin: 70upx auto 0 auto;
        border-radius: 20upx;
        width: 260upx;
        background-color: $golden-2;
        height: 70upx;
        text {
            line-height: 70upx;
            color: $golden-1;
            font-size: $font-size-5;
            text {
                display: inline;
                color: $golden-1;
                font-size: $font-size-3;
                margin-left: 4upx;
            }
        }
    }

    text:nth-child(6) {
        width: 40%;
        position: fixed;
        bottom: 25%;
        left: 30%;
        color: $green-1;
        font-size: $font-size-4;
    }
    text:nth-child(7) {
        width: 90%;
        position: fixed;
        bottom: 5%;
        left: 5%;
        color: $gray-1;
        font-size: $font-size-3;
    }
}
.btn_position {
    width: 60%;
    position: fixed;
    bottom: 30%;
    left: 20%;
}
</style>
