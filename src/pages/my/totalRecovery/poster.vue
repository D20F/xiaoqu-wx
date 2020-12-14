<template>
    <view class="box">
        <view class="space"></view>
        <canvas class="poster" canvas-id="my-canvas"></canvas>
        <view class="tabbar">
            <view class="wx">
                <button open-type="share"></button>
                <text>微信</text>
            </view>
            <view class="xc" @click="saveImage">
                <view></view>
                <text>相册</text>
            </view>
        </view>
    </view>
</template>

<script>
import btnGreen from "@/component/btnGreen/index";
import public_mixin from "@/mixins/public.js";

export default {
    name: "delivery_details",
    components: {
        btnGreen,
    },
    data() {
        return {
            rubbish: {},
            canvasW: 0,
            canvasH: 0,
            ctx: null,
            isShow: false,
            qrcode: "https://oss.zhangyubk.com/cmqrcode.jpg",
        };
    },
    mixins: [public_mixin],
    methods: {
        async init() {
            this.ctx = uni.createCanvasContext("my-canvas", this);
            this.canvasW = uni.upx2px(622);
            this.canvasH = uni.upx2px(965);
            let background = await this.getImageInfo(
                "https://img.sporeblockchain.cn/static/my/share_bg@3x.png"
            );
            this.drawImage(background, 0, 0, 622, 965);
            let avatar = "";
            if (this.account.avatar == "") {
                avatar = await this.getImageInfo("https://img.sporeblockchain.cn/static/my/img_default_head@3x.png");
                    
            } else {
				try{
					avatar = await this.getImageInfo(this.account.avatar);
				}catch(err){
					console.error(err);
				}
            }
            this.drawImage(avatar, 45, 40, 88, 88);
            this.drawFont(this.account.nickName, 150, 100, 36, "#FFFFFF");
            this.ctx.setTextAlign("left");
            this.drawFont(this.rubbish.total, 45, 310, 64, "#FFFFFF");
            this.ctx.setTextAlign("left");
            this.drawFont("公斤", 260, 310, 24, "#FFFFFF");

            this.ctx.setTextAlign("right");
            this.drawFont(
                this.rubbish.environmental.trees,
                125,
                630,
                36,
                "#FFFFFF"
            );
            this.ctx.setTextAlign("left");
            this.drawFont("棵", 140, 630, 26, "#FFFFFF");
            this.ctx.setTextAlign("right");
            this.drawFont(
                this.rubbish.environmental.sewage,
                320,
                630,
                36,
                "#FFFFFF"
            );
            this.ctx.setTextAlign("left");
            this.drawFont("公斤", 340, 630, 26, "#FFFFFF");
            this.ctx.setTextAlign("right");
            this.drawFont(
                this.rubbish.environmental.carbonEmission,
                520,
                630,
                36,
                "#FFFFFF"
            );
            this.ctx.setTextAlign("left");
            this.drawFont("千克", 540, 630, 26, "#FFFFFF");
        },
        drawImage(src, x, y, w, h) {
            let wx = uni.upx2px(x);
            let wy = uni.upx2px(y);
            let ww = uni.upx2px(w);
            let wh = uni.upx2px(h);
            this.ctx.drawImage(src, wx, wy, ww, wh);
            this.ctx.draw(true);
        },
        drawFont(content, x, y, size, color) {
            let wx = uni.upx2px(x);
            let wy = uni.upx2px(y);
            let wsize = uni.upx2px(size);
            this.ctx.setFontSize(wsize);
            this.ctx.setFillStyle(color);
            this.ctx.fillText(content, wx, wy);
            this.ctx.draw(true);
        },
        //保存图片到相册
        saveImage() {
            //判断用户授权
            uni.getSetting({
                success(res) {
                    console.log("获取用户权限", res.authSetting);
                    if (Object.keys(res.authSetting).length > 0) {
                        //判断是否有相册权限
                        if (
                            res.authSetting["scope.writePhotosAlbum"] ==
                            undefined
                        ) {
                            //打开设置权限
                            uni.openSetting({
                                success(res) {
                                    console.log("设置权限", res.authSetting);
                                },
                            });
                        } else {
                            if (!res.authSetting["scope.writePhotosAlbum"]) {
                                //打开设置权限
                                uni.openSetting({
                                    success(res) {
                                        console.log(
                                            "设置权限",
                                            res.authSetting
                                        );
                                    },
                                });
                            }
                        }
                    } else {
                        return;
                    }
                },
            });
            var that = this;
            uni.canvasToTempFilePath(
                {
                    canvasId: "my-canvas",
                    quality: 1,
                    complete: (res) => {
                        console.log("保存到相册", res);
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success(res) {
                                uni.showToast({
                                    title: "已保存到相册",
                                    icon: "success",
                                    duration: 2000,
                                });
                                setTimeout(() => {
                                    that.isShow = false;
                                }, 2000);
                            },
                        });
                    },
                },
                this
            );
        },
        getImageInfo(imgSrc) {
            return new Promise((resolve, reject) => {
                uni.getImageInfo({
                    src: imgSrc,
                    success: (image) => {
                        resolve(image.path);
                        console.log("获取图片成功", image);
                    },
                    fail: (err) => {
                        reject(err);
                        console.log("获取图片失败", err);
                    },
                });
            });
        },
    },
    onShareAppMessage(res) {
        if (res.from === "button") {
            console.log(res.target);
        }
        return {
            title: "小蛐环保小程序",
            path: "/pages/my/totalRecovery/poster",
        };
    },
    mounted() {
        this.init();
    },
    onLoad(option) {
        let data = JSON.parse(option.data);
        this.rubbish = data;
        console.log(this.rubbish);
    },
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
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
.space {
    width: 200upx;
    height: 30upx;
}
.poster {
    width: 622upx;
    height: 965upx;
    margin: 0 auto;
}
.tabbar {
    width: 80%;
    margin: 60upx auto 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wx {
        uni-button:after {
            border: 0px;
        }
        button {
            width: 104upx;
            height: 104upx;
            border: 0px;
            background: url("https://img.sporeblockchain.cn/static/my/share_icon_wx@3x.png")
                no-repeat;
            background-size: 100% 100%;
        }
        text {
            font-size: $font-size-3;
        }
    }
    .xc {
        view {
            width: 104upx;
            height: 104upx;
            border: 0px;
            background: url("https://img.sporeblockchain.cn/static/my/share_icon_photo@3x.png")
                no-repeat;
            background-size: 100% 100%;
        }
        text {
            font-size: $font-size-3;
        }
    }
}
</style>
