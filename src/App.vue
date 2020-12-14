<script>
export default {
    onLaunch: function() {
        // console.log("App Launch");
    },
    onShow: function() {
        // console.log("App Show");
    },
    onHide: function() {
        // console.log("App Hide");
    }
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import "./common/variable.scss";

page {
    display: flex;
    min-height: 100%;
    /* background-color: #EFEFEF; */
    background-color: RGB(255, 254, 255);
}
template {
    display: flex;
    flex: 1;
}
text {
    font-family: Alibaba;
}
@font-face {
    font-family: Alibaba;
    src: url("https://img.sporeblockchain.cn/static/Alibaba.ttf") format("truetype");
}
.uni-input-placeholder {
    color: $gray-2;
}
.uni-input-input {
    color: $black-1;
}
image {
    display: block;
}
text {
    display: block;
    text-align: center;
    color: $black-1;
    // font-size: 25upx;
}
view {
    position: relative;
}
</style>
