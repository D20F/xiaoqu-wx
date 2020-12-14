<template>
    <view class="export_PrivateKey">
        <text class="toptext">私钥导出后请妥善保管，不要泄露。否则可能导致个人信息泄露</text>
        <text class="textarea">{{privateKey}}</text>
        <btnGreen class="btn_bottom" content="复制私钥" mode="1" @confirm="confirm" />
    </view>
</template>
<script>

import public_mixin from "@/mixins/public.js";
import btnGreen from "@/component/btnGreen/index";

export default {
    data() {
        return {};
    },
    components: {
        btnGreen,
    },
    mixins: [public_mixin],
    methods: {
        confirm() {
            console.log(this.privateKey);
            uni.setClipboardData({
                data: this.privateKey,
                success: function () {
                    console.log("success");
                },
            });
        },
    },
    onLoad() {},
    computed: {
        privateKey() {
            return this.$store.state.account.privateKey;
        },
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.export_PrivateKey {
    width: 100%;
    height: 100%;
    position: relative;
}
.toptext {
    font-size: 28upx;
    color: #f1485b;
    text-align: left;
    width: 80%;
    margin: 100upx auto;
}
.textarea {
    position: relative;
    width: 80%;
    height: 156upx;
    padding: 20upx 5%;
    margin: 0 auto;
    text-align: left;
    word-wrap: break-word;
    border: 1px solid #e6e6e6;
    border-radius: 24upx;
}
</style>
