<template>
    <view class="box">
        <map
            v-if="mapShow"
            id="myMap"
            style="width: 100%; height: 100%;"
            :latitude="latitude"
            :longitude="longitude"
            :markers="markers"
            @markertap="markertap"
        ></map>
        <view class="btnbox">
            <image
                @click="back_place"
                src="https://img.sporeblockchain.cn/static/map/map_icon_current@3x.png"
            />
            <image
                @click="open_map"
                src="https://img.sporeblockchain.cn/static/map/map_icon_navigation@3x.png"
            />
        </view>
        <view class="detail_box">
            <mapDetails @change="change" :list="list" :time="time"></mapDetails>
        </view>
    </view>
</template>

<script>
import public_mixin from "@/mixins/public.js";
import map_mixin from "@/mixins/map.js";
import mapDetails from "./map_details";
import { getPeripheral } from "@/api/api_mapi";

export default {
    components: {
        mapDetails,
    },
    data() {
        return {
            list: [],
            markers: [],
            rubbish: [
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_glass@3x.png",
                    title: "厨余垃圾",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_bottles@3x.png",
                    title: "饮料瓶",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_paper@3x.png",
                    title: "纸类",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_fabric@3x.png",
                    title: "纺织物",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_plastic@3x.png",
                    title: "塑料",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_metal@3x.png",
                    title: "金属",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_glass@3x(1).png",
                    title: "玻璃",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_harmful@3x.png",
                    title: "有害垃圾",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/qita@3x.png",
                    title: "其他",
                    state: "",
                },
            ],
            time: {
                start_date: "周一",
                end_date: "周日",
                start_time: "06:30",
                end_time: "00:00",
            },
            latitude: 23.106378,
            longitude: 113.323588,
            mapShow: true,
			selectIndex: 0,
        };
    },
    mixins: [public_mixin, map_mixin],
    methods: {
        //切换垃圾箱，改变地图显示
        change(i) {
			this.selectIndex = i;
            this.latitude = this.list[i].latitude;
            this.longitude = this.list[i].longitude;
            this.mapShow = false;
            for (let index = 0; index < this.list.length; index++) {
                this.list[index].iconPath =
                    "https://img.sporeblockchain.cn/static/map/map_bin_disabled.png";
            }
            this.list[i].iconPath =
                "https://img.sporeblockchain.cn/static/map/map_bin_selected.png";
            this.$nextTick(function () {
                this.mapShow = true;
            });
        },
        markertap(e) {
            this.mapShow = false;
            for (let index = 0; index < this.list.length; index++) {
                this.list[index].iconPath =
                    "https://img.sporeblockchain.cn/static/map/map_bin_disabled.png";
            }
            let i = e.detail.markerId - 1;
            this.list[i].iconPath =
                "https://img.sporeblockchain.cn/static/map/map_bin_selected.png";
            uni.$emit("currentClick", i);
            this.$nextTick(function () {
                this.mapShow = true;
            });
        },
        back_place() {
            let _this = this;
            wx.getLocation({
                type: "gcj02", //返回可以用于wx.openLocation的经纬度
                success: function (res) {
                    _this.latitude = res.latitude;
                    _this.longitude = res.longitude;
                    console.log(res.latitude);
                    console.log(res.longitude);
                },
                fail: function (res) {
                    console.log(res);
                },
            });
        },
        open_map() {
            // uni.chooseLocation({
            //     success: function (res) {},
            // });
            // wx.getLocation({
            //     type: "gcj02", //返回可以用于wx.openLocation的经纬度
            //     success: function (res) {
                    uni.openLocation({
                        latitude: this.list[this.selectIndex].latitude,
                        longitude: this.list[this.selectIndex].longitude,
                    });
            //     },
            //     fail: function (res) {
            //         console.log(res);
            //     },
            // });
        },
        get_position() {
            let _this = this;
            wx.getLocation({
                type: "gcj02", //返回可以用于wx.openLocation的经纬度
                success: function (res) {
                    _this.latitude = _this.list[_this.selectIndex].latitude;
                    _this.longitude = _this.list[_this.selectIndex].longitude;
					
                    _this.AllNearDistance(
                        _this.list,
                        res.latitude,
                        res.longitude
                    );
                },
                fail: function (res) {
                    console.log(res);
                },
            });
        },
        init() {
            let data = {
                //获取设备信息 ，应该给经纬度 --未添加
                applets: this.$store.state.account.account,
                latitude: 22,
                longitude: 22,
            };
            getPeripheral(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                    } else {
                        for (const item of res.data.list) {
                            for (let i = 0; i < 9; i++) {
                                this.rubbish[0].state = item.list.kitchen_waste;
                                this.rubbish[1].state = item.list.paper;
                                this.rubbish[2].state = item.list.fabric;
                                this.rubbish[3].state = item.list.plastic;
                                this.rubbish[4].state = item.list.metal;
                                this.rubbish[5].state = item.list.glass;
                                this.rubbish[6].state =
                                    item.list.beverage_bottle;
                                this.rubbish[7].state = item.list.harmful;
                                this.rubbish[8].state = item.list.other;
                            }
                            item.list = this.rubbish;
                            item.iconPath =
                                "https://img.sporeblockchain.cn/static/map/map_bin_disabled.png";
                        }
                        this.list = res.data.list;

                        let markers = [];
                        for (let i = 0; i < res.data.list.length; i++) {
                            let object = {
                                iconPath:
                                    "https://img.sporeblockchain.cn/static/map/map_bin_disabled.png",
                                latitude: res.data.list[i].latitude,
                                longitude: res.data.list[i].longitude,
                                width: 35,
                                height: 35,
                                id: i,
                            };
                            markers.push(object);
                            this.markers = markers;
                        }

                        this.get_position();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    onLoad() {
        this.init();
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
}
.detail_box {
    width: 100%;
    height: 513upx;
    position: fixed;
    left: 0%;
    bottom: 1%;
}
.btnbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    bottom: 540upx;
    left: 7.5%;
    position: fixed;
    image:nth-child(1) {
        width: 88upx;
        height: 88upx;
    }
    image:nth-child(2) {
        width: 176upx;
        height: 88upx;
    }
}
</style>
