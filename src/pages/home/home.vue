<template>
    <view class="home">
        <view class="swiper">
            <u-swiper
                :list="swiper_list"
                border-radius="20"
                @click="swiper_callback"
            ></u-swiper>
        </view>
        <view class="flex_around_layout features">
            <view @click="jumpRouter('/pages/my/bindPortal/bindPortal')">
                <image
                    src="https://img.sporeblockchain.cn/static/home/index/home_icon_portal@3x.png"
                />
                <text>绑定门户</text>
            </view>
            <view @click="undone">
                <image
                    src="https://img.sporeblockchain.cn/static/home/index/home_icon_fault@3x.png"
                />
                <text>故障上报</text>
            </view>
            <view
                @click="jumpRouter_detection('/pages/home/recycleSort/index')"
            >
                <image
                    src="https://img.sporeblockchain.cn/static/home/index/home_icon_classification@3x.png"
                />
                <text>回收分类</text>
            </view>
            <view @click="jumpRouter_detection('/pages/home/recycliGuide/index')">
                <image
                    src="https://img.sporeblockchain.cn/static/home/index/home_icon_guide@3x.png"
                />
                <text>回收指南</text>
            </view>
        </view>

        <view @click="undone" class="integral">
            <view>
                <image
                    src="https://img.sporeblockchain.cn/static/home/home_icon_mall@3x.png"
                />
                <text>积分商城</text>
                <text>环保积分兑换好礼</text>
            </view>
            <view>
                <text>去兑换</text>
            </view>
        </view>

        <view v-if="phoneNumber == ''" class="login" @click="login">
            <text>登录 / 注册</text>
        </view>
        <view
            v-else
            class="recycle_card"
            @click="jumpRouter_detection('/pages/home/map/recycling_map')"
        >
            <view class="recycle_tab picture_text_layout">
                <image
                    class="small_icon"
                    src="https://img.sporeblockchain.cn/static/home/index/order_icon_address@3x.png"
                />
                <view>
                    <text class="font_weight_black1_32">{{
                        address.place_name
                    }}</text>
                    <text>
                        距离当前位置
                        <text class="font_green1_24 uniText_inline">{{
                            address.distance
                        }}</text>
                    </text>
                </view>
                <image
                    class="small_icon"
                    src="https://img.sporeblockchain.cn/static/home/index/icon_next@3x.png"
                />
            </view>
            <view class="recycle_content">
                <view class="row" v-for="(i,index) of list" :key="index">
                    <view class="recycle_content_row">
                        <view
                            :class="{ background_iamge_red:i.state == '已满', background_iamge_yellow:i.state == '故障'}"
                        ></view>
                        <image :src="i.src" />
                        <text>{{i.title}}</text>
                    </view>
                </view>
            </view>
        </view>
        <tabBar></tabBar>
        <phonePopup v-if="phone_show"></phonePopup>
    </view>
</template>

<script>
import tabBar from "@/component/tabBar/index";
import public_mixin from "@/mixins/public.js";
import garbage_delivery from "@/mixins/garbage_delivery.js";
import map_mixin from "@/mixins/map.js";
import { getStorage } from "@/utils/storage.js";
import { getPeripheral } from "@/api/api_mapi";

import phone_popup from "@/component/phone_popup/index";
import { tr } from "date-fns/locale";

export default {
    name: "home",
    data() {
        return {
            sitezh_state: false,
            address: {},
            swiper_list: [
                {
                    image:
                        "https://img.sporeblockchain.cn/static/home/knowledgeQuiz/entrance.png",
                    title: "",
                },
                {
                    image:
                        "https://img.sporeblockchain.cn/static/home/home_banner@3x.png",
                    title: "",
                },
            ],
            list: [
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_plastic@3x.png",
                    title: "塑料",
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
                        "https://img.sporeblockchain.cn/static/home/home_icon_metal@3x.png",
                    title: "金属",
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
                        "https://img.sporeblockchain.cn/static/home/qita@3x.png",
                    title: "其他",
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
                        "https://img.sporeblockchain.cn/static/home/home_icon_glass@3x(1).png",
                    title: "玻璃",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_glass@3x.png",
                    title: "厨余垃圾",
                    state: "",
                },
                {
                    src:
                        "https://img.sporeblockchain.cn/static/home/home_icon_harmful@3x.png",
                    title: "有害垃圾",
                    state: "",
                },
            ],
            address_list: {},
        };
    },
    components: {
        tabBar,
        phonePopup: phone_popup,
    },
    mixins: [public_mixin, map_mixin, garbage_delivery],
    onLoad(option) {
        this.init(option);
        this.monitor();

        
    },
    onShow() {
        // this.send(this.sendType("selectBox")).then((res) => {
        //     uni.closeSocket();
        // });
    },
    methods: {
        get_position() {
            //获取用户当前地理位置
            let _this = this;
            wx.getLocation({
                type: "gcj02", //返回可以用于wx.openLocation的经纬度
                success: function (res) {
                    let latitude = res.latitude;
                    let longitude = res.longitude;
                    _this.address = _this.nearDistance(
                        _this.address_list,
                        latitude,
                        longitude
                    );
                },
                fail: function (res) {
                    console.log(res);
                },
            });
        },
        init(option) {
            this.$store.commit("garbageListFun", []);
            this.$store.commit("tabBarFun", "home");
            getStorage("phoneNumber")
                .then((res) => {
                    this.$store.commit("phoneNumberFun", res);
                })
                .catch((err) => {
                    console.log(err);
                });
            getStorage("privateKey")
                .then((res) => {
                    this.$store.commit("privateKeyFun", res);
                })
                .catch((err) => {
                    console.log(err);
                });
            getStorage("account")
                .then((res) => {
                    this.$store.commit("accountFun", res);
					//只有初始化帐号完成之后才能进行socket通讯
					this.router_callback(option);
                })
                .catch((err) => {
                    console.log(err);
                });
            getStorage("nickName")
                .then((res) => {
                    this.$store.commit("nickNameFun", res);
                })
                .catch((err) => {
                    console.log(err);
                });
            getStorage("avatar")
                .then((res) => {
                    this.$store.commit("avatarFun", res);
                })
                .catch((err) => {
                    console.log(err);
                });

            let data = {
                applets: this.$store.state.account.account,
                latitude: 22,
                longitude: 22,
            };
            getPeripheral(data)
                .then((res) => {
                    console.log(res);
                    if (JSON.stringify(res.data.list) == "[]") {
                    } else {
                        this.address_list = res.data.list[0];
                        this.list[0].state =
                            res.data.list[0].list.plastic;
                        this.list[1].state = res.data.list[0].list.paper;
                        this.list[2].state = res.data.list[0].list.metal;
                        this.list[3].state = res.data.list[0].list.beverage_bottle;
                        this.list[4].state = res.data.list[0].list.other;
                        this.list[5].state = res.data.list[0].list.fabric;
                        this.list[6].state = res.data.list[0].list.glass;
                        this.list[7].state = res.data.list[0].list.kitchen_waste;
                        this.list[8].state = res.data.list[0].list.harmful;
                        this.get_position();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
                this.version();
        },
        router_callback(option) {
			try{
				if (option.data != undefined) {
					if(this.$store.state.account.account == ''){
						uni.showToast({
							icon: "none",
							title: "请先授权登录",
						});
						return;
					}
					
					let data = JSON.parse(option.data);
					if (data.router == "delivery_details") {
						this.jumpRouter("/pages/my/order/delivery_details", {
							id: data.transaction_id,
							violation: false,
						});
					} else if (data.router == "recycle") {
						uni.showLoading({
							title: "正在建立通讯",
							icon: "loading",
							mask: true
						});
						setTimeout(function () {
							uni.hideLoading();
						}, 6000);

						this.$store.commit("deviceNumberFun", data.id);
						this.$store.commit("publicKeyFun", data.public_key);
						this.$store.commit("randomKeyFun", data.random_key);

						this.send(this.sendType("selectRecycle"))
							.then((res) => {
							})
							.catch((err) => {
								console.log(err);
								this.connectionSocket();
							})
					}
				}
			}catch(err){
				console.log(err);
			}
        },
        login() {
            this.$store.commit("phoneShowFun", true);
        },
        swiper_callback(index) {
            if (index == 0) {
                this.jumpRouter("/pages/home/knowledgeQuiz/game_start/index");
            }
        },
        undone() {
            uni.showToast({
                icon: "none",
                title: "功能未上线,敬请期待",
            });
        },
        version(){
            const updateManager = uni.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log(res.hasUpdate)
            })
            updateManager.onUpdateReady(function () {
                uni.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启小程序',
                    success(res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate()
                        }
                    }
                })
            })
            updateManager.onUpdateFailed(function () {
                // 新版本下载失败
                uni.showToast({
                    icon: "none",
                    title: "新版本更新失败,请重新启动小程序",
                });
            })
            
        }
    },
    computed: {
        phone_show() {
            return this.$store.state.public.phone_show;
        },
        phoneNumber() {
            return this.$store.state.account.phoneNumber;
        },
    },
};
</script>
<style lang="scss">
@import "@/common/layout.scss";
@import "@/common/variable.scss";
@import "@/common/public.scss";

.home {
    width: 100%;
    height: 100%;
    position: relative;
}
.swiper {
    width: 90%;
    height: 270upx;
    margin: 30upx auto 0 auto;
    display: block;
    border-radius: 10upx;
}
.features {
    font-size: $font-size-1;
    margin-top: 50upx;
    view {
        width: 148upx;
        height: 160upx;
        background: #F8FAF9;
        border-radius: 24upx;
        image {
            width: 39upx;
            height: 39upx;
            margin: 40upx auto 30upx auto;
        }
        text {
            text-align: center;
            font-size: $font-size-3;
        }
    }
}
.integral {
    width: 90%;
    height: 160upx;
    background: url("https://img.sporeblockchain.cn/static/home/index/home_bg_integral.png")
        no-repeat;
    background-size: 100%;
    margin: 40upx auto;
    padding: 0 30upx 0 90upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    view:nth-child(1){
        image{
            width: 48upx;
            height: 48upx;
            position: absolute;
            left: -50upx;
        }
        text{
            text-align: left;
        }
        text:nth-child(2){
            color: #FFFFFF;
            font-size: 36upx;
        }
        text:nth-child(3){
            font-size: 28upx;
            color: rgba(255, 255, 255, 0.8);
        }
    }
    view:nth-child(2){
        width: 159upx;
        height: 64upx;
        background: #FFFFFF;
        border-radius: 31upx;
        text{
            line-height: 64upx;
            text-align: center;
            font-size: 28upx;
            font-weight: 500;
            color: #00B075;
        }
    }


}



.recycle_card {
    width: 90%;
    margin: 0 auto 50upx auto;
    height: 495upx;
    background: linear-gradient(
        to top right,
        #ffffff,
        #ffffff 0%,
        RGB(223, 236, 230)
    );
    border-radius: 10px;
}
.recycle_tab {
    width: 90%;
    margin: 0 auto;
    padding-top: 30upx;
    image:nth-child(1) {
        display: inline-block;
        width: 50upx;
        height: 50upx;
        margin: 0 10upx;
    }
    image:nth-child(3) {
        width: 50upx;
        height: 50upx;
        position: absolute;
        right: 10%;
    }
}
.recycle_content{
    .row {
        width: 20%;
        height: 45%;
        display: inline-block;
        vertical-align: top;
        .recycle_content_row {
            vertical-align: top;
            height: 100%;
            padding-top: 15upx;
            .background_iamge_red {
                background: url("https://img.sporeblockchain.cn/static/home/man@3x.png")
                    no-repeat;
                box-shadow: 0px 4px 10px #f1485b;
            }
            .background_iamge_yellow {
                box-shadow: 0px 4px 10px #fbd239;
                background: url("https://img.sporeblockchain.cn/static/home/guzhang@3x.png")
                    no-repeat;
                background-size: 100%;
            }
            view:nth-child(1) {
                color: #ffffff;
                border-radius: 10upx;
                width: 64upx;
                height: 39upx;
                margin: 0upx auto 15upx auto;
                background-size: 100%;
                text {
                    font-size: 24upx;
                }
            }
            image {
                width: 70upx;
                height: 70upx;
                margin: 0 auto;
            }
            text:nth-child(3) {
                font-size: 24upx;
            }
        }
    }
}
.login{
    width: 90%;
    margin: 0 auto 50upx auto;
    background: RGB(223, 236, 230);
    border-radius: 24upx;
    height: 100upx;
    text{
        line-height: 100upx;
        color: #242424;
        font-size: 28upx;
        font-weight: 500;
    }
}
</style>
