<template>
    <view class="box">
        <getInformation  @confirm="confirm" :list="list" btnContent="确认新增"></getInformation>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import getInformation from '@/component/get-information/index'
import { portalAddressAdd } from "@/api/api_mapi";

export default {
    components: {
        getInformation
    },
    data() {
        return {
            list: {
                nickname: "",
                phone: "",
                area: "所在地区",
                region: "",
                id: "",
                building: "",
                house: "",
            },
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
            let that = this;
            let data = {
                applets: this.$store.state.account.account,
                nickname: val.nickname,
                phone: val.phone,
                area: val.area,
                region: val.region,
                building:val.building,
                house:val.house,
            }

            portalAddressAdd(data)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        uni.showToast({
                            title: "添加成功",
                            icon: "success",
                            duration: 1500,
                        });
                    } else {
                        uni.showToast({
                            title: "添加失败",
                            icon: "none",
                            duration: 1500,
                        });
                    }
                    setTimeout(() => {
                        this.stop_click = false;
                        uni.navigateBack({
                            delta: 1,
                        });
                    }, 1500);
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
    onLoad(option) {},
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
</style>
