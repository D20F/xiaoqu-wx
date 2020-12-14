<template>
    <view class="delivery">
        <!-- text class="tabbox">正在等待审核</text> -->
        <deliveryDetails :list="list" :order_data="order_data" />
    </view>
</template>

<script>
import btnGreen from "@/component/btnGreen/index";
import deliveryDetails from "@/component/delivery-details/index";
import garbage_delivery from "@/mixins/garbage_delivery.js";
import public_mixin from "@/mixins/public.js";

export default {
    name: "delivery_details",
    components: {
        btnGreen,
        deliveryDetails,
    },
    mixins: [garbage_delivery, public_mixin],
    data() {
        return {
            list: [],
            section_list: [],
            more_show: false,
            order_data: {
                account: "李小红",
                telephone_number: "18100002020",
                time: "2020-01-01 10:19",
                address: "撒哈拉",
                hash: "5S5DA654DS5DAD358DA4D3A",
            },
        };
    },
    methods: {},
    onLoad() {
        this.monitor();
		
		this.list = this.$store.state.garbageDelivery.garbageList;
    },
    computed: {},
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
// text:nth-child(1) {

// }
.delivery {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: $white-1;
}
.tabbox {
    width: 90%;
    margin: 40upx auto 0 auto;
    color: $red-1;
    font-size: 40upx;
    font-weight: 600;
    text-align: left;
}
</style>
