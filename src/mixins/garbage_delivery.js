
var garbage_delivery = {
    data() {
        return {

        }
    },
    onLoad() {

    },
    methods: {
        connectionSocket() {    //连接socket
            let socketUrl = 'wss://ws.sporeblockchain.cn';
            // let socketUrl = 'ws://192.168.2.230:8001';
            const socketTask = uni.connectSocket({
                url: socketUrl,
                success: () => { console.log('成功') },
                fail: () => { 
					console.log('失败') 
					this.errTip();
				},
            });
            uni.onSocketOpen((res) => {
                console.log('WebSocket连接已打开！', res);
                this.$store.commit("socketTaskFun", socketTask);
                this.send(this.sendType("selectRecycle")).then((res) => {
                    // uni.navigateTo({
                    //     url: "/pages/recycle/recycle",
                    // });
                }).catch((err)=>{
					this.errTip();
				})
            });
            uni.onSocketError((res) => {
				this.errTip();
                console.log('WebSocket连接打开失败，请检查！', res);
            });
        },
		errTip(){
			uni.hideLoading();
			uni.showToast({
			    title: "建立通讯失败,请重试！",
			    icon: "none",
			    duration: 2000,
			});
		},
        sendType(type, index) {     //选择发送类型
            let data;
            switch (type) {
                case 'selectRecycle': // 选择回收类型页面, index为点击继续投递的时候会当前板号进行复查
                    data = { router: "selectRecycle", index };
                    break;
                case 'unboxing': // 发送开锁,index为0~9
                    data = { router: "unboxing", index: index };
                    break;
                case 'deliveryWin': // 完成投递,index为0~9
                    data = { router: "deliveryWin", index: index };
                    break;
                case 'deliveryEnd': // 结束投递
                    data = { router: "deliveryEnd" };
                    break;
                case 'selectBox': // 退出返回到扫描页
                    data = { router: "selectBox" };
                    break;
            }
            return data
        },
        send(msg) {     //发送
            return new Promise((resolve, reject) => {
                let data = {
                    to: this.$store.state.account.deviceNumber,//设备号
                    uid: this.$store.state.account.account,//账号名
                    random_key: this.$store.state.account.randomKey,//随机key 保证唯一
                    role: "mini_app",
                    msg: JSON.stringify(msg),
                }
                data = JSON.stringify(data)
                uni.sendSocketMessage({
                    data: data,
                    success: function (res) {
                        console.log('成功', res)
                        resolve(res)
                    },
                    fail: function (err) {
                        console.log('失败', err)
                        reject(err)
                    },
                });
            })
        },
        close() {      //关闭socket连接
            uni.closeSocket();
        },
        monitor() {     //监控服务
            this.accept();
            this.closeEnd();
        },
        accept() {      //接受信息
            uni.onSocketMessage((res) => {
                console.log('收到服务器内容：' + res.data);

                let msg = JSON.parse(JSON.parse(res.data).msg);

                if (msg.error) {
					this.errTip();
                    this.jumpRouter_reLaunch("/pages/home/home");
                    return;
                }

                if (msg.router == 'unboxing') {
                    this.$store.commit("setUnboxing", true);
                } else if (msg.router == 'unboxed') {
                    this.$store.commit("setUnboxing", false);
                    let data = {
                        data: this.conver_slogan(msg.index),
                        index: msg.index,
                    };
                    this.jumpRouter_reLaunch("/pages/recycle/recycle_completed", data);
                } else if (msg.router == 'deliveryWin') {
                    // this.jumpRouter_reLaunch(
                    //     "/pages/recycle/delivery_details", this.conver_slogan(msg.index)
                    // );
                } else if (msg.name == 'deliveryWin') {
                    // 替换小程序logo
                    msg.data.forEach(item => {
                        item.src = this.conver_slogan(item.index).src;
                    })
                    this.$store.commit("garbageListFun", msg.data);
                    this.jumpRouter_reLaunch(
                        "/pages/recycle/delivery_details", this.conver_slogan(msg.index)
                    );
                } else if (msg.router == 'deliveryEnd') {
                    this.$store.commit("setPacking", true);
                } else if (msg.name == 'deliveryEnd') {
                    this.$store.commit("setPacking", false);
                    this.jumpRouter_reLaunch("/pages/recycle/delivery_completed", msg.data);
                } else if (msg.router == 'selectBox') {
					let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
					let curRoute = routes[routes.length - 1].route;
					if(curRoute == "pages/recycle/recycle"){
						this.jumpRouter_reLaunch("/pages/home/home");
					}
                } else if (msg.router == 'selectRecycle') {
					uni.hideLoading();
					this.$store.commit("updateBasketState", msg.state);
                    this.jumpRouter_reLaunch("/pages/recycle/recycle");
                } else if (msg.name == 'basket_state') {
                    this.$store.commit("updateBasketState", msg.data);
                } else if (msg.name == 'getting_weight') {
                    this.$store.commit("weightTipFun", msg.data);
                }


            });
        },
        closeEnd() {    //关闭连接回调
            uni.onSocketClose((res) => {
                console.log('WebSocket 已关闭！', res);
				
                // this.connectionSocket();
            });
        },
        conver_slogan(index) {
            let data = {};
            switch (index) {
                case 4:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/home_icon_plastic@3x.png",
                        title: "塑料",
                        state: 0,
                        weight_unit: "公斤",
                        price: 0.2,
                        currency_unit: "环保金",
                    }
                    break;
                case 2:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/home_icon_paper@3x.png",
                        title: "纸类",
                        state: 2,
                        weight_unit: "公斤",
                        price: 0.4,
                        currency_unit: "环保金",
                    }
                    break;
                case 1:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/home_icon_bottles@3x.png",
                        title: "饮料瓶",
                        state: 1,
                        weight_unit: "个",
                        price: 0.03,
                        currency_unit: "环保金",
                    }
                    break;
                case 5:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/home_icon_fabric@3x.png",
                        title: "纺织物",
                        state: 0,
                        weight_unit: "公斤",
                        price: 0.1,
                        currency_unit: "环保金",
                    }
                    break;
                case 3:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/home_icon_metal@3x.png",
                        title: "金属",
                        state: 0,
                        weight_unit: "公斤",
                        price: 0.2,
                        currency_unit: "环保金",
                    }
                    break;
                case 6:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/home_icon_glass@3x(1).png",
                        title: "玻璃",
                        state: 0,
                        weight_unit: "公斤",
                        price: 0.1,
                        currency_unit: "环保金",
                    }
                    break;
                case 0:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/home_icon_glass@3x.png",
                        title: "厨余垃圾",
                        state: 0,
                        weight_unit: "公斤",
                        price: 1.00,
                        currency_unit: "积分",
                    }
                    break;
                case 8:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/home_icon_harmful@3x.png",
                        title: "有害垃圾",
                        state: 0,
                        weight_unit: "公斤",
                        price: 0.1,
                        currency_unit: "积分",
                    }
                    break;
                case 7:
                    data = {
                        src:
                            "https://img.sporeblockchain.cn/static/home/qita@3x.png",
                        title: "其他",
                        state: 0,
                        weight_unit: "公斤",
                        price: 0.1,
                        currency_unit: "积分",
                    }
                    break;
                default:
                    break;
            }
            return data;
        }

    },
    computed: {
        socketTask() {
            return this.$store.state.account.socketTask;
        },

    }



}
export default garbage_delivery;



