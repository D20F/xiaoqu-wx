<template>
    <view class="my_information">
        <view class="avatar" @click="avatarChoose">
            <text>头像</text>
            <view>
                <image class="icon" :src="avatar" />
            </view>
            <image
                class="icon"
                src="https://img.sporeblockchain.cn/static/my/icon_next_gray@3x.png"
            />
        </view>
        <view class="row">
            <text>登录手机号</text>
            <text class="font_gray_1">{{phoneNumber}}</text>
            <image
                class="icon"
                src="https://img.sporeblockchain.cn/static/my/icon_next_gray@3x.png"
            />
        </view>
        <view class="row" @click="popup_show = true">
            <text>用户昵称</text>
            <text class="font_gray_1">{{nickName}}</text>
            <image
                class="icon"
                src="https://img.sporeblockchain.cn/static/my/icon_next_gray@3x.png"
            />
        </view>
        <view class="row" @click="jumpRouter('/pages/my/my_information/export_PrivateKey')">
            <text>导出私钥</text>
            <text class="font_gray_1"></text>
            <image
                class="icon"
                src="https://img.sporeblockchain.cn/static/my/icon_next_gray@3x.png"
            />
        </view>
        <view class="row">
            <text>实名认证</text>
            <text class="font_red_1">未认证</text>
            <image
                class="icon"
                src="https://img.sporeblockchain.cn/static/my/icon_next_gray@3x.png"
            />
        </view>
        <view class="row">
            <text>人脸采集</text>
            <text class="font_red_1">未采集</text>
            <image
                class="icon"
                src="https://img.sporeblockchain.cn/static/my/icon_next_gray@3x.png"
            />
        </view>
        <popupEnter v-if="popup_show" :list="popup_data" @confirm="confirm" @close="close" />
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import popupEnter from "@/component/popup-enter/index";
import { changeNickName } from "@/api/api_mapi";
import { setStorage } from "@/utils/storage.js";

export default {
    data() {
        return {
            popup_data: {
                title: "修改昵称",
                placeholder: "昵称字数不超过20个字符",
                btn: "确认修改",
            },
            popup_show: false,
        };
    },
    components: {
        popupEnter,
    },
    mixins: [public_mixin],
    methods: {
        confirm(val) {
            let data = {
                applets: this.$store.state.account.account,
                nick_name: val,
            };
            changeNickName(data)
                .then((res) => {
                    let that = this;
                    that.$store.commit("nickNameFun", res.data.nick_name);
                    setStorage("nickName", res.data.nick_name);
                    that.popup_show = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        close() {
            this.popup_show = false;
        },
        avatarChoose() {
            let that = this;
            uni.chooseImage({
                count: 1,
                sizeType: ["original", "compressed"],
                sourceType: ["album", "camera"],
                success(res) {
                    that.imgUpload(res.tempFilePaths);
                    console.log(1, res.tempFilePaths);
                },
            });
        },
        imgUpload(file) {
            let that = this;
            uni.uploadFile({
                header: {},
                url: "https://mapi.sporeblockchain.cn/v1/uploadhead",
                filePath: file[0],
                name: "tupian",
                formData: {
                    applets: that.$store.state.account.account,
                },
                success: function (res) {
                    let img = JSON.parse(res.data);
                    that.$store.commit("avatarFun", img.data.headurl);
                    setStorage("avatar", img.data.headurl);
                },
                fail: function (error) {
                    console.log(error);
                },
            });
        },
    },
    onLoad() {},
    computed: {
        phoneNumber() {
            return this.$store.state.account.phoneNumber;
        },
        avatar() {
            return this.$store.state.account.avatar;
        },
        nickName() {
            return this.$store.state.account.nickName;
        },
    },
};
</script>

<style  lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";
.my_information {
    width: 100%;
    height: 100%;
    position: relative;
}
.avatar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 150upx;
    margin: 0 auto;
    text:nth-child(1) {
        width: 620upx;
        text-align: left;
        font-size: $font-size-5;
        font-weight: 600;
        color: $black-1;
    }
    view {
        width: 90upx;
        height: 80upx;
        border-radius: 50%;
        overflow: hidden;
        image {
            width: 100%;
            height: 100%;
        }
    }
    image:nth-child(3) {
        width: 40upx;
        height: 40upx;
    }
}
.row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 100upx;
    margin: 0 auto;
    text:nth-child(1) {
        width: 300upx;
        text-align: left;
        font-size: $font-size-5;
        font-weight: 600;
        color: $black-1;
    }
    text:nth-child(2) {
        font-size: $font-size-4;
        text-align: right;
        width: 310upx;
    }
    image:nth-child(3) {
        width: 40upx;
        height: 40upx;
    }
}
</style>
