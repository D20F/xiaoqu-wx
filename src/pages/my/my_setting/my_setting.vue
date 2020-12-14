<template>
    <view class="box">
        <view class="row" @click="jumpRouter('/pages/my/my_setting/aboutUs')">
            <text >关于我们</text>
            <image src="https://img.sporeblockchain.cn/static/my/icon_next_gray@3x.png" />
        </view>
        <btnGreen v-if="isLogin" class="margin_50" content="退出登录" mode="2" @confirm="confirm" />
        <popupDoubleChoice v-if="popup_show" content="确认退出登录" @confirm="confirm" @close="close" />
    </view>
</template>

<script>
import btnGreen from "@/component/btnGreen/index";
import popupDoubleChoice from "@/component/popup-double-choice/index";
import public_mixin from "@/mixins/public.js";

export default {
    name: "my_setting",
    components: {
        btnGreen,
        popupDoubleChoice
    },
    data() {
        return {
            popup_show: false,
			isLogin: false
        };
    },
    mixins: [public_mixin],
    methods: {
        confirm(data) {
            if (data == "popup") {
                // console.log('退出登录');
				this.popup_show = false;
                uni.clearStorage();
				
				this.$store.commit("phoneNumberFun", "");
				this.$store.commit("privateKeyFun", "");
				this.$store.commit("accountFun", "");
				this.$store.commit("nickNameFun", "");
				this.$store.commit("avatarFun", "");
				
                uni.reLaunch({
                    url: "/pages/home/home"
                });
                this.$store.commit("tabBarFun", data);
            } else {
                this.popup_show = true;
            }
        },
        close() {
            this.popup_show = false;
        },
    },
    onLoad() {
		console.log('isLogin:',this.$store.state.account.account != "")
		this.isLogin = this.$store.state.account.account != "";
	}
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
}
.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 100upx;
    margin: 0 auto;
    text:nth-child(1) {
        // width: 300upx;
        text-align: left;
        font-size: $font-size-5;
        font-weight: 600;
        color: $black-1;
    }
    image:nth-child(2) {
        width: 40upx;
        height: 40upx;
    }
}
.margin_50 {
    margin-top: 50upx;
}
</style>
