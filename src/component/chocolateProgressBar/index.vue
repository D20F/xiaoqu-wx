<template>
    <view class="progress_box">
        <canvas class="progress_bg" canvas-id="cpbg"></canvas>
        <canvas class="progress_bar" canvas-id="cpbar"></canvas>
        <view class="progress_txt">
            <view class="progress_info font_green_4">{{ progress }}%</view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        progress_txt: {
            //不设置从0开始
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            progress: 0,
			interval: null
        };
    },
    mounted() {
        this.progress = this.progress_txt;
        this.drawProgressbg();
        this.interval = setInterval(() => {
            this.progress = this.progress + 20;
            this.drawCircle(this.progress); //参数为1-100
            if (this.progress == 100) {
                clearInterval(this.interval);
            }
        }, 1000);
    },
    methods: {
        drawProgressbg: function () {
            // 自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/>
            var ctx = uni.createCanvasContext("cpbg", this);
            console.log(ctx);
            ctx.setLineWidth(8); // 设置圆环的宽度
            ctx.setStrokeStyle("#E9E9E9"); // 设置圆环的颜色
            ctx.setLineCap("round"); // 设置圆环端点的形状
            ctx.beginPath(); //开始一个新的路径
            // ctx.arc(110, 110, 70, 0.75 * Math.PI, 0.25 * Math.PI, false);
            ctx.arc(75, 75, 70, 0 * Math.PI, 2 * Math.PI, false);
            //设置一个原点(110,110)，半径为100的圆的路径到当前路径
            ctx.stroke(); //对当前路径进行描边
            ctx.draw();
        },
        drawCircle: function (step) {
            var ctx = uni.createCanvasContext("cpbar", this);
            // 进度条的渐变(中心x坐标-半径-边宽，中心Y坐标，中心x坐标+半径+边宽，中心Y坐标)
            var gradient = ctx.createLinearGradient(75, 0, 75, 75);
            gradient.addColorStop("0", "#00B075");
            gradient.addColorStop("1.0", "#FBD239");
            ctx.setLineWidth(8);
            ctx.setStrokeStyle(gradient);
            ctx.setLineCap("round");
            ctx.beginPath();
            // 参数step 为绘制的百分比
            // step = 0.015 * step + 0.75;
            // if (step >= 2) {
            //     step = step % 2;
            // }
            // ctx.arc(110, 110, 70, 0.75 * Math.PI, step * Math.PI, false);
            step = 0.02 * step;
            ctx.arc(75, 75, 70, 0, step * Math.PI, false);
            ctx.stroke();
            ctx.draw();
        },
    },
};
</script>

<style lang="scss">
@import "@/common/variable.scss";

.progress_box {
    position: relative;
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.progress_bg {
    position: absolute;
    width: 150px;
    height: 150px;
}
.progress_bar {
    width: 150px;
    height: 150px;
    transform: rotateZ(270deg);
}
.progress_txt {
    position: absolute;
    font-size: 28upx;
    color: #999999;
}
.progress_info {
    font-size: 36upx;
    padding-left: 16upx;
    letter-spacing: 2upx;
    font-size: $font-size-5;
}
.progress_dot {
    width: 16upx;
    height: 16upx;
    border-radius: 50%;
    background-color: #fb9126;
}
</style>
