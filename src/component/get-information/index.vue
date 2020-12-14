<template>
    <view class="box">
        <view class="row name">
            <image
                src="https://img.sporeblockchain.cn/static/relative_account/new_icon_name@3x.png"
            />
            <input
                v-model="current_list.nickname"
                class="input"
                type="text"
                placeholder="请输入户主姓名"
            />
        </view>
        <view class="row number">
            <image
                src="https://img.sporeblockchain.cn/static/relative_account/new_icon_phone@3x.png"
            />
            <text>+86</text>
            <text>|</text>
            <input
                v-model="current_list.phone"
                class="input"
                maxlength="11"
                type="number"
                placeholder="请输入手机号码"
            />
        </view>
        <view class="row area" @click="pickerShow">
            <image
                src="https://img.sporeblockchain.cn/static/relative_account/new_icon_address@3x.png"
            />
            <text
                :class="{
                    font_black_1: current_list.area !== '所在地区',
                    font_gray_2: current_list.area == '所在地区',
                }"
                >{{ current_list.area }}</text
            >
        </view>
        <view class="row name">
            <image
                src="https://img.sporeblockchain.cn/static/relative_account/new_icon_detailed@3x.png"
            />
            <input
                v-model="current_list.region"
                class="input"
                type="text"
                placeholder="小区名称"
            />
        </view>

        <view class="row area">
            <image
                src="https://img.sporeblockchain.cn/static/relative_account/floor_icon.png"
            />
            <input
                v-model="current_list.building"
                class="input"
                type="text"
                placeholder="请输入所在栋数"
            />
        </view>
        <view class="row area">
            <image
                src="https://img.sporeblockchain.cn/static/relative_account/house_icon.png"
            />
            <input
                v-model="current_list.house"
                class="input"
                type="text"
                placeholder="门牌号"
            />
        </view>
        <view
            @click="confirm"
            class="btn btn_bottom"
            :class="{
                background_color_green_1: btn_mode,
                background_color_green_3: !btn_mode,
            }"
        >
            <text>{{ btnContent }}</text>
        </view>

        <slot></slot>
        <u-picker
            mode="region"
            v-model="address_show"
            @confirm="address_confirm"
        ></u-picker>
    </view>
</template>
<script>
export default {
    name: "get_information",
    props: {
        btnContent: String, //按钮文字
        optional_phone: {
            //选填手机号 默认必填
            type: Boolean,
            default: true,
        },
        list: {
            type: Object,
            default: function () {
                return {
                    nickname: "",
                    phone: "",
                    area: "所在地区",
                    region: "",
                    id: "",
                    building: "",
                    house: "",
                };
            },
        },
    },
    data() {
        return {
            current_list: {
                nickname: "",
                phone: "",
                area: "所在地区",
                region: "",
                id: "",
                building: "",
                house: "",
            },
            address_show: false,
        };
    },
    mounted() {
        console.log(this.list);
        this.current_list = this.list;
    },
    methods: {
        confirm() {
            if (this.input_mode() == false) {
                return;
            }
            this.$emit("confirm", this.current_list);
        },
        address_confirm(data) {
            let str = "";
            for (const key in data) {
                if (key == "area") {
                    str = str + data[key].label;
                } else {
                    str = str + data[key].label + "·";
                }
            }
            this.current_list.area = str;
        },
        input_mode() {
            if (this.current_list.nickname == "") {
                uni.showToast({
                    icon: "none",
                    title: "请填写姓名",
                });
                return false;
            } else if (
                !this.$u.test.mobile(this.current_list.phone) &&
                this.optional_phone
            ) {
                uni.showToast({
                    icon: "none",
                    title: "手机号码填写错误",
                });
                return false;
            } else if (this.current_list.area == "所在地区") {
                uni.showToast({
                    icon: "none",
                    title: "请填写所在地区",
                });
                return false;
            } else if (this.current_list.region == "") {
                uni.showToast({
                    icon: "none",
                    title: "请填写小区名称",
                });
                return false;
            } else if (this.current_list.building == "") {
                uni.showToast({
                    icon: "none",
                    title: "请填写所在栋数",
                });
                return false;
            } else if (this.current_list.house == "") {
                uni.showToast({
                    icon: "none",
                    title: "请填写所在门牌号",
                });
                return false;
            } else {
                return true;
            }
        },
        pickerShow() {
            this.address_show = true;
        },
    },
    computed: {
        btn_mode() {
            if (this.current_list.nickname == "") {
                return false;
            } else if (
                !this.$u.test.mobile(this.current_list.phone) &&
                this.optional_phone
            ) {
                return false;
            } else if (this.current_list.area == "所在地区") {
                return false;
            } else if (this.current_list.region == "") {
                return false;
            } else if (this.current_list.building == "") {
                return false;
            } else if (this.current_list.house == "") {
                return false;
            } else {
                return true;
            }
        },
    },
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: inherit;
    position: relative;
}

.btn {
    width: 80%;
    height: 90upx;
    border-radius: 15upx;
    left: 10%;
    text-align: center;
    text {
        color: #ffffff;
        line-height: 90upx;
        font-size: $font-size-4;
    }
}
.row {
    width: 90%;
    height: 100upx;
    border-radius: 20upx;
    border: 1upx solid $gray-1;
    margin: 50upx auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
        width: 80upx;
        height: 80upx;
    }
}
.number {
    text:nth-child(2) {
        width: 10%;
        color: $black-1;
        font-weight: 600;
        font-size: $font-size-5;
    }
    text:nth-child(3) {
        width: 10%;
        color: $gray-2;
        font-size: $font-size-4;
    }
    input {
        width: 60%;
        height: 100upx;
        font-size: $font-size-4;
    }
}
.area {
    text {
        width: 80%;
        text-align: left;
        font-size: $font-size-4;
    }
}
input {
    width: 80%;
    height: 100upx;
    font-size: $font-size-4;
}
</style>