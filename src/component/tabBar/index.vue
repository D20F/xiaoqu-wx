<template>
    <view class="tab">
        <view @click="selectRouter('home')">
            <image
                v-show="tabBar == 'home'"
                src="https://img.sporeblockchain.cn/static/home/tab_icon_home_selected@3x.png"
            />
            <image
                v-show="tabBar !== 'home'"
                src="https://img.sporeblockchain.cn/static/home/tab_icon_home_disabled@3x.png"
            />
            <text :class="{font_black_1:tabBar == 'home',font_gray_2:tabBar !== 'home'}">首页</text>
        </view>
        <view class="scan" @click="scan">
            <image class="scan_img" src="https://img.sporeblockchain.cn/static/home/tab_icon_scan@3x.png" />
        </view>
        <view @click="selectRouter('my')">
            <image
                v-show="tabBar == 'my'"
                src="https://img.sporeblockchain.cn/static/home/tab_icon_my_selected@3x.png"
            />
            <image
                v-show="tabBar !== 'my'"
                src="https://img.sporeblockchain.cn/static/home/tab_icon_my_default@3x.png"
            />
            <text :class="{font_black_1:tabBar == 'my',font_gray_2:tabBar !== 'my'}">我的</text>
        </view>
    </view>
</template>
<script>
import public_mixin from "@/mixins/public.js";
import garbage_delivery from "@/mixins/garbage_delivery.js";
import { getStorage } from "@/utils/storage.js";

export default {
    name: "tabBar",
    data() {
        return {
        };
    },    
    mixins: [public_mixin, garbage_delivery],
    components: {
    },
    onLoad() {},
    methods: {
        scan() {
            //扫一扫
            let that = this;
            getStorage("phoneNumber").then(() => {
                uni.scanCode({
                    onlyFromCamera: true,
                    success: function (res) {
                        console.log("条码类型：" + res.scanType);
                        console.log("条码内容：" + res.result);
                        try {
                            if (res.scanType == "QR_CODE") {
                                if( res.result.split("?")[0] == "https://h5.sporeblockchain.cn/" ){
                                    let temp = res.result.split("?")[1];
                                    let data = JSON.parse(temp.split("=")[1]);
                                    
                                    if(data.router == 'delivery_details'){
                                        that.jumpRouter('/pages/my/order/delivery_details', {id: data.transaction_id, violation: false})
                                    }else if(data.router == 'recycle'){
										uni.showLoading({
										    title: "正在建立通讯",
										    icon: "loading",
											mask: true
                                        });
                                        setTimeout(function () {
                                            uni.hideLoading();
                                        }, 6000);
                                        
                                        that.$store.commit("deviceNumberFun", data.id);
                                        that.$store.commit("publicKeyFun", data.public_key);
                                        that.$store.commit("randomKeyFun", data.random_key);                    
										
										that.send(that.sendType("selectRecycle"))
										    .then((res) => {
										    })
										    .catch((err) => {
										        console.log(err);
										        that.connectionSocket();
										    })
                                    }
                                }else if( res.result.split("?")[0] == "https://gouwoo.com/mvending/" ){
                                    let data = res.result.split("?")[1].split("=")[1];
                                    that.jumpRouter("/pages/pointsMall/vendingMachine/index",data);
                                }
                            } else {
                                console.log("条码类型错误");
                            }
                        } catch (err) {
                            console.log(err);
                            uni.showToast({
                                title: "扫码出错,请重新扫码",
                                icon: "none",
                                duration: 2000,
                            });
                        }
                    },
                });
            })
            .catch((err) => {
                this.$store.commit("phoneShowFun", true);
            });
        },
        selectRouter(data) {
            if(this.tabBar == data){
                return
            }
            if (data == "home") {
                uni.reLaunch({
                    url: "/pages/home/home"
                });
                this.$store.commit("tabBarFun", data);
            } else if (data == "my") {
                uni.reLaunch({
                    url: "/pages/my/my"
                });
                this.$store.commit("tabBarFun", data);
            }
        }
    },
    computed: {
        tabBar() {
            return this.$store.state.public.tabBar;
        }
    }
};
</script>
<style lang='scss'>
@import "@/common/variable.scss";

.tab {
    // z-index: 10;
    position: fixed;
    display: flex;
    width: 100%;
    height: 120upx;
    bottom: 0;
    background: #ffffff;
    justify-content: space-around;
    align-items: center;
    image {
        width: 50upx;
        height: 50upx;
    }
    view {
        text {
            text-align: center;
            font-size: $font-size-2;
        }
    }
}
.scan {
    background: #00b075;
    width: 150upx;
    height: 150upx;
    border-radius: 50%;
    top: -30upx;
    display: block;
    .scan_img {
        display: block;
        margin: 35upx auto 0 auto;
        width: 80upx;
        height: 80upx;
    }
}
</style>