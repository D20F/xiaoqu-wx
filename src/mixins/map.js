
import { Decimal } from "decimal.js"

var public_component = {
    data() {
        return {

        }
    },
    onLoad() {

    },
    methods: {
        // 计算所有垃圾桶最近的距离
        AllNearDistance(array, centerLatitude, centerLongitude) {
            for (let i = 0, l = array.length; i < l; i++) {
                const element = array[i];
                let d = this.distanceFun(
                    element.latitude,
                    element.longitude,
                    centerLatitude,
                    centerLongitude
                );
                d = new Decimal(d).mul(1000)
                let ds = this.unitConversion(d);
                array[i].distance = ds;
            }
        },        
        // 两点间距离
        distanceFun(la1, lo1, la2, lo2) {
            var La1 = (la1 * Math.PI) / 180.0;
            var La2 = (la2 * Math.PI) / 180.0;
            var La3 = La1 - La2;
            var Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0;
            var s =
                2 *
                Math.asin(
                    Math.sqrt(
                        Math.pow(Math.sin(La3 / 2), 2) +
                        Math.cos(La1) *
                        Math.cos(La2) *
                        Math.pow(Math.sin(Lb3 / 2), 2)
                    )
                );
            s = s * 6378.137; //地球半径
            s = Math.round(s * 10000) / 10000;
            return s;
        },
        // 单个距离
        nearDistance(array, centerLatitude, centerLongitude) {
            // for (let i = 0, l = array.length; i < l; i++) {
            let element = array;
            let d = this.distanceFun(
                element.latitude,
                element.longitude,
                centerLatitude,
                centerLongitude
            );
            d = new Decimal(d).mul(1000);
            let ds = this.unitConversion(d);
            array.distance = ds;
            // }
            // let arr = array.sort((a, b) => {
            //     return a.distance - b.distance
            // })
            // console.log(array)
            return array;
        },
        // 单位自动转换
        unitConversion(data) {
            let distance = "";
            let datas = data +"";
            // console.log(data)
            // console.log(datas)
            if(datas.split(".")[0] < 1000){
                distance = datas + " M"
            }else{
                let val = new Decimal(datas.split(".")[0]).div(1000).toNumber().toFixed(2);
                distance = val + " KM"
            }
            return distance
        }
    },



}
export default public_component;



