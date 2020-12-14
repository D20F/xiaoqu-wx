<template>
    <view class="box">
        <view class="title">
            <text>本次投递结束</text>
            <view v-if="router_data.violation" @click="jumpRouter('/pages/my/notification/notification',{data:2})">
                <image src="https://img.sporeblockchain.cn/static/my/tip.png" />
                <text>您本次投递有违规行为，违规投递将不计收益</text>
                <image src="https://img.sporeblockchain.cn/static/my/icon_next_red@3x.png" />
            </view>
        </view>
        <deliveryDetails :list="list" :order_data="order_data" />
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import deliveryDetails from "@/component/delivery-details/index";
import { getDeliveryDetails } from "@/api/api_mapi";
import { format, parse } from "date-fns";
import { Decimal } from "decimal.js"

export default {
    components: {
        deliveryDetails,
    },
    data() {
        return {
            router_data:{},
            list: [],
            order_data: {},
        };
    },
    mixins: [public_mixin],
    methods: {
        getDeliveryDetails() {
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
                id: this.router_data.id,
            };
            getDeliveryDetails(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.list = res.data.list;
                        this.list.forEach(item => {
                            item.reward = new Decimal(item.reward).div(10000).toNumber();
                        })
                        this.order_data.account = res.data.account;
                        this.order_data.telephone_number = res.data.telephone_number;
                        this.order_data.hash = res.data.hash;
                        this.order_data.address = res.data.address;
                        this.order_data.time= format(new Date(res.data.time), 'yyyy-MM-dd HH:mm:ss');
                   }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    onLoad(option) {
        let data = JSON.parse(option.data);
        this.router_data = data;

        this.getDeliveryDetails();
    },
    computed: {},
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
    background-color: $white-1;
}
.title {
    width: 90%;
    margin: 60upx auto 0 auto;
    text:nth-child(1) {
        font-size: $font-size-7;
        color: $green-4;
        text-align: left;
        font-weight: 600;
        margin: 0 0 30upx 0;
    }
    view:nth-child(2) {
        width: 100%;
        height: 88upx;
        border-radius: 25upx;
        margin: 0 auto;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background: rgba(254, 237, 239, 1);
        image {
            width: 48upx;
            height: 48upx;
        }
        text {
            font-size: $font-size-3;
            color: $red-1;
        }
    }
}
</style>



