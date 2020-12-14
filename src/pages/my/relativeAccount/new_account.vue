<template>
    <view class="box">
        <!-- 新增亲属 手机账号可以选填 -->
        <getInformation
            btnContent="确认新建"
            :optional_phone="false"
            @confirm="confirm"
            :list="list"
        >
        </getInformation>
    </view>
</template>

<script>
import getInformation from "@/component/get-information/index";
import public_mixin from "@/mixins/public.js";
import { relativesAdd } from "@/api/api_mapi";

export default {
    name: "new_account",
    components: {
        getInformation,
    },
    data() {
        return {
            list:{},
            operator_list: [   //这个运营商是要从接口获取的，暂时写死
                {
                    value: "1",
                    label: "13247545204",
                },
            ],
            operator: "选择运营商",
            stop_click: false,
        };
    },
    mixins: [public_mixin],
    methods: {
        confirm(val) {
            if (this.stop_click) {
                return;
            }
            this.stop_click = true;

            let data = {
                applets: this.$store.state.account.account,
                nickname: val.nickname,
                phone: val.phone,
                address: val.area,
                region: val.region,
                building:val.building,
                house:val.house,
            }

            console.log(data);
            relativesAdd(data)
                .then((res) => {
                    console.log(res);
                    let list = res.data;
                    list.state = "未申请";
                    if (res.status == 200) {
                        this.jumpRouter(
                            "/pages/my/relativeAccount/delivery_method",
                            list
                        );
                    } else {
                        uni.showToast({
                            title: "添加失败",
                            icon: "none",
                            duration: 1500,
                        });
                        setTimeout(() => {
                            this.stop_click = false;
                            uni.navigateBack({
                                delta: 1,
                            });
                        }, 1500);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    uni.showToast({
                        title: "添加失败",
                        icon: "none",
                        duration: 1500,
                    });
                    setTimeout(() => {
                        this.stop_click = false;
                        uni.navigateBack({
                            delta: 1,
                        });
                    }, 1500);
                });
        },
    },
    onLoad(option) {
        if(JSON.stringify(option) !== '{}'){
            let data = JSON.parse(option.data);
            this.list = data;
        }
    },
};
</script>

<style  lang="scss">
@import "@/common/variable.scss";
@import "@/common/public.scss";
.box {
    width: 100%;
    height: 100%;
    position: relative;
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
.area {
    text {
        width: 80%;
        text-align: left;
        font-size: $font-size-4;
    }
}
</style>
