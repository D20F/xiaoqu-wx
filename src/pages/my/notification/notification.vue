<template>
    <view class="box">
        <u-tabs-swiper
            ref="tabs"
            class="u_tba"
            :list="list"
            active-color="#242424"
            inactive-color="#CCCCCC"
            gutter="125"
            :current="current"
            @change="tabsChange"
        ></u-tabs-swiper>
        <swiper
            :current="swiperCurrent"
            @transition="transition"
            @animationfinish="animationfinish"
            style="height: 100%"
        >
            <swiper-item class="swiper-item">
                <view v-if="All_mode" class="no_exist">
                    <image
                        src="https://img.sporeblockchain.cn/static/zero_record/default_01@3x.png"
                    />
                    <text>还没有收到任何消息~</text>
                </view>
                <view v-else class="exist">
                    <view v-for="(list, index) in All" :key="index">
                        <view v-for="(item) in list" :key="item.index">
                            <informationCard :list="item" />
                        </view>
                    </view>
                </view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <view v-if="announcement_mode" class="no_exist">
                    <image
                        src="https://img.sporeblockchain.cn/static/zero_record/default_01@3x.png"
                    />
                    <text>还没有收到任何消息~</text>
                </view>
                <view v-else class="exist">
                    <view v-for="(item, index) in All.announcement" :key="index">
                        <informationCard :list="item" />
                    </view>
                </view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <view v-if="violation_mode" class="no_exist">
                    <image
                        src="https://img.sporeblockchain.cn/static/zero_record/default_01@3x.png"
                    />
                    <text>还没有收到任何消息~</text>
                </view>
                <view v-else class="exist">
                    <view v-for="(item, index) in All.violation" :key="index">
                        <informationCard :list="item" />
                    </view>
                </view>
            </swiper-item>
            <swiper-item class="swiper-item">
                <view v-if="message_mode" class="no_exist">
                    <image
                        src="https://img.sporeblockchain.cn/static/zero_record/default_01@3x.png"
                    />
                    <text>还没有收到任何消息~</text>
                </view>
                <view v-else class="exist">
                    <view v-for="(item, index) in All.message" :key="index">
                        <informationCard :list="item" />
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import informationCard from "@/component/informationCard/index";
import { getNotification } from "@/api/api_mapi";

export default {
    name: "delivery_details",
    components: {
        informationCard,
    },
    data() {
        return {
            list: [
                {
                    name: "全部",
                },
                {
                    name: "公告",
                },
                {
                    name: "违规",
                },
                {
                    name: "消息",
                },
            ],
            All: {
                announcement: [
          
                ],
                violation: [
              
                ],
                message: [
                
                ],
            },
            current: 0, // tabs组件的current值，表示当前活动的tab选项
            swiperCurrent: 0,
        };
    },
    mixins: [public_mixin],
    components: {
        informationCard,
    },
    methods: {
        tabsChange(index) {
            //swiper组件所需函数
            this.swiperCurrent = index;
        },
        transition(e) {
            //swiper组件所需函数
            let dx = e.detail.dx;
            this.$refs.tabs.setDx(dx);
        },
        animationfinish(e) {
            //swiper组件所需函数
            let current = e.detail.current;
            this.$refs.tabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;
        },
        getAnnouncement() {
            let data = {
                applets: this.$store.state.account.account,
                type: 0,
            };
            getNotification(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.All.announcement = res.data.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getViolation() {
            let data = {
                applets: this.$store.state.account.account,
                type: 1,
            };
            getNotification(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.All.violation = res.data.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getMessage() {
            let data = {
                applets: this.$store.state.account.account,
                type: 2,
            };
            getNotification(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                        console.log("空");
                    } else {
                        this.All.message = res.data.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    computed: {
        All_mode() {
            return (
                this.All.announcement.length == 0 &&
                this.All.violation.length == 0 &&
                this.All.message.length == 0
            );
        },
        announcement_mode() {
            return this.All.announcement.length == 0;
        },
        violation_mode() {
            return this.All.violation.length == 0;
        },
        message_mode() {
            return this.All.message.length == 0;
        },
    },
    onLoad(option) {
        if(JSON.stringify(option) !== '{}'){
            let data = JSON.parse(option.data).data;
            this.current = data;
            this.swiperCurrent = data;
        }


        this.getAnnouncement();
        this.getViolation();
        this.getMessage();
    },
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
.no_exist {
    width: 100%;
    height: inherit;
    image {
        width: 320upx;
        height: 320upx;
        margin: 30% auto 50upx auto;
    }
    text {
        color: $gray-1;
        font-size: $font-size-3;
    }
}
</style>
