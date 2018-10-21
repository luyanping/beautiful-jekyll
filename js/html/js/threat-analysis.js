(function ($) {
    function Page(option) {
        this.init();
    }

    Page.prototype = {
        //初始化
        init: function () {
            this.initChinaMapData();
        },
        //事件相关处理
        initEvent: function () {
            var self = this;
        },
        initChinaMapData: function () {
            var self = this;
            var ele = document.getElementById('china_map');
            var myChart = echarts.getInstanceByDom(ele);
            if (myChart) {
                myChart.dispose();
                myChart = null;
            }
            self.getChinaMapData();
            self.mapTimer1 = setInterval(function () {
                if (self.request) {
                    self.request.abort();
                }
                self.getChinaMapData();
            }, 2000);
        },
        getChinaMapData: function () {
            var self = this;
            var ele = document.getElementById('china_map');
            var timer;
            clearInterval(timer);
            var geoCoordMap = {
                '安徽': [117.17, 31.52],
                '北京': [116.24, 39.55],
                '重庆': [106.54, 29.59],
                '福建': [119.18, 26.05],
                '甘肃': [103.51, 36.04],
                '广东': [113.14, 23.08],
                '广西': [108.19, 22.48],
                '贵州': [106.42, 26.35],
                '海南': [110.20, 20.02],
                '河北': [114.30, 38.02],
                '河南': [113.40, 34.46],
                '黑龙江': [128.36, 45.44],
                '湖北': [112.27, 30.15],
                '湖南': [112.59, 28.12],
                '吉林': [125.19, 43.54],
                '江苏': [118.46, 32.03],
                '江西': [115.55, 28.40],
                '辽宁': [123.25, 41.48],
                '内蒙古': [108.41, 40.48],
                '宁夏': [106.16, 38.27],
                '青海': [101.48, 36.38],
                '山东': [118.00, 36.40],
                '山西': [112.33, 37.54],
                '陕西': [108.57, 34.17],
                '上海': [121.29, 31.14],
                '海南': [108.77, 19.10],
                '四川': [104.04, 30.40],
                '天津': [117.12, 39.02],
                '西藏': [91.08, 29.39],
                '新疆': [87.36, 43.45],
                '云南': [102.42, 25.04],
                '浙江': [120.10, 30.16],
                '澳门': [115.07, 21.33],
                '台湾': [121.21, 23.53],
                '香港': [114.15, 22.15],
                '福州': [119.4543, 25.9222],
            };
            var geoArray = ['安徽', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '海南', '四川', '天津', '西藏', '新疆', '云南', '浙江', '澳门', '台湾', '香港', '福州'];
            var myChart = echarts.getInstanceByDom(ele);

            var dataList = [{"sourceIP":"139.212.221.62","dangerLevel":"1","ruleType":"缓冲区溢出","country":"中国","province":"吉林","city":"长春","createTime":"2018-10-21 15:42:17.0"},{"sourceIP":"139.212.221.62","dangerLevel":"1","ruleType":"缓冲区溢出","country":"中国","province":"吉林","city":"长春","createTime":"2018-10-21 15:42:17.0"},{"sourceIP":"223.104.1.242","dangerLevel":"1","ruleType":"缓冲区溢出","country":"中国","province":"广东","city":"","createTime":"2018-10-21 15:42:18.0"},{"sourceIP":"223.104.1.242","dangerLevel":"1","ruleType":"缓冲区溢出","country":"中国","province":"广东","city":"","createTime":"2018-10-21 15:42:18.0"}];
            if (!myChart) {
                self.initChinaMapChart(ele);
            } else {
                var i = -1;
                var zr = myChart.getZr();
                timer = setInterval(doani, 300)
            }

            function doani() {
                i++;
                var seriesModel = myChart.getModel().getSeries()[0];
                var coordSys = seriesModel.coordinateSystem;
                var color = 'aqua';
                if (i < dataList.length && !($.inArray(dataList[i].province, geoArray) == -1)) {

                    if (dataList[i].dangerLevel == 2) {
                        color = 'yellow';
                    } else if (dataList[i].dangerLevel == 3) {
                        color = '#ff3333';
                    }
                    var province = dataList[i].province;
                    var geo = geoCoordMap[province];
                    var point1 = coordSys.dataToPoint(geo);
                    var point3 = coordSys.dataToPoint(geo);
                    var point2 = coordSys.dataToPoint([119.4543, 25.9222]);
                    // var t = Math.random()*1000;
                    var t = Math.floor(Math.random() * (2000 - 1000) + 1000)
                    // var r = Math.floor(Math.random() * (100 - 50) + 50)
                    //尾巴的相关设置
                    var circle = new echarts.graphic.Circle({
                        position: point1,
                        scale: [1, 1],
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 2
                        },
                        style: {
                            fill: color
                        },
                        zlevel: 3
                    });
                    //圆环的相关设置
                    var circle2 = new echarts.graphic.Circle({
                        position: point2,
                        scale: [1, 1],
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 0
                        },
                        style: {
                            fill: 'none',
                            stroke: '#fe4f16',
                            opacity: 1,
                        },
                        zlevel: 3
                    });
                    var circle3 = new echarts.graphic.Circle({
                        position: point3,
                        scale: [1, 1],
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 0
                        },
                        style: {
                            fill: 'none',
                            stroke: color,
                            opacity: 1,
                        },
                        zlevel: 3
                    });
                    var text = new echarts.graphic.Text({
                            position: point3,
                            style: {
                                text: province,
                                fill: color,
                                textAlign: 'left',
                            }
                        }
                    );

                    /*动态模糊*/
                    zr.configLayer(3, {
                        motionBlur: true,
                        lastFrameAlpha: 0.8,
                    });

                    /*动画部分*/
                    circle3.animateTo({
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 30
                        },
                        style: {
                            fill: 'none',
                            stroke: color,
                            opacity: 0,
                        },
                    }, t, 'cubicOut');
                    text.animateTo({
                        style: {
                            opacity: 0,
                        },
                    }, 5000, 'cubicOut');
                    circle.animate('', false)
                        .when(t, {
                            position: point2
                        })
                        .start()
                        .done(function () {
                            zr.remove(circle);
                            circle2.animateTo({
                                shape: {
                                    cx: 0,
                                    cy: 0,
                                    r: 20
                                },
                                style: {
                                    fill: 'none',
                                    stroke: '#fe4f16',
                                    opacity: 0,
                                },
                            }, t, 'cubicOut')
                        });
                    zr.add(circle2);
                    zr.add(circle);
                    zr.add(circle3);
                    zr.add(text);
                } else {
                    clearInterval(timer);
                }
            }

        },
        initChinaMapChart: function(ele){
            var self = this;
            var BJData = [];
            var series = [
                {
                    type: 'map',
                    map: 'china',
                    geoIndex: 1,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: true, // 存在legend时显示
                    zlevel: -1,
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            // show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: 'tansparent',
                            borderColor: '#1773c3',
                            // borderWidth: 1,
                            shadowColor: '#7696C7',
                            shadowBlur: 20
                        },
                        emphasis: {
                            areaColor: 'transparent'
                        }
                    }
                }
            ];
            [
                ['福州', BJData]
            ].forEach(function(item, i) {
                series.push(
                    //被攻击点
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            brushType: 'stroke',
                            scale: 4
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                //			                offset:[5, 0],

                                color: '#00ffff',
                                formatter: '{b}',
                                textStyle: {
                                    color: "#00ffff"
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'pin',
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#9966cc'
                            }
                        },
                        data: [{
                            name: '福州',
                            value: [119.4543, 25.9222, 3],
                        }],
                    }
                );
            });

            var option = {
                visualMap: {
                    type: 'piecewise',
                    splitNumber: 3,
                    pieces: [{
                        min: 0,
                        max: 1,
                        label:'低',
                        color: 'aqua'
                    }, {
                        min: 1,
                        max: 2,
                        label:'中',
                        color: 'yellow'
                    }, {
                        min: 3,
                        max: 3,
                        label:'高',
                        color: '#ff3333'
                    }],
                    left: '160',
                    bottom: '250',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    },
                },
                geo: {
                    map: 'china',
                    label: {
                        // normal: {
                        //   show: true,
                        //   textStyle: {
                        //     color: "#557DC2"
                        //   }
                        // },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    // zlevel: 0,
                    roam: true,
                    // layoutCenter: ['50%', '53%'],
                    // layoutSize: "108%",
                    itemStyle: {
                        normal: {
                            color: '#171856',
                            borderColor: 'rgba(100,149,237,1)'
                        },
                        emphasis: {
                            // color: 'rgba(51, 69, 89, .5)'
                            color: 'rgba(37, 43, 61, .5)'
                        }
                    }
                },

                series: series
            };
            var myChart = echarts.init(ele);
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            window.onresize = function() {
                myChart.resize();
            }
        },
        initWorldMapData: function () {
            var self = this;
            var ele = document.getElementById('world_map');
            var myChart = echarts.getInstanceByDom(ele);
            if (myChart) {
                myChart.dispose();
                myChart = null;
            }
            self.getWorldMapData();
            self.mapTimer2 = setInterval(function () {
                if (self.worldRequest) {
                    self.worldRequest.abort();
                }
                self.getWorldMapData();
            }, 2000);

        },
        getWorldMapData: function () {
            var self = this;
            var ele = document.getElementById('world_map');
            var myChart = echarts.getInstanceByDom(ele);
            var timer;
            clearInterval(timer);
            var geoCoordMap = worldCountry;
            var dataList = [{dangerLevel: 1, country: '也门'}, {dangerLevel: 2, country: '南非'}, {
                dangerLevel: 3,
                country: '瓦努阿图'
            }];
            if (!myChart) {
                self.initWorldMapChart(ele);
            } else {
                var i = -1;
                var zr = myChart.getZr();
                timer = setInterval(doani, 300)
            }

            function doani() {
                i++;
                var seriesModel = myChart.getModel().getSeries()[0];
                var coordSys = seriesModel.coordinateSystem;
                var color = 'aqua';
                if (i < dataList.length) {
                    if (dataList[i].dangerLevel == 2) {
                        color = 'yellow';
                    } else if (dataList[i].dangerLevel == 3) {
                        color = '#ff3333';
                    }
                    var province = dataList[i].country;
                    var geo = geoCoordMap[province];
                    var point1 = coordSys.dataToPoint(geo);
                    var point3 = coordSys.dataToPoint(geo);
                    var point2 = coordSys.dataToPoint([104.195397, 35.86166]);
                    // var t = Math.random()*1000;
                    var t = Math.floor(Math.random() * (2000 - 1000) + 1000);
                    // var r = Math.floor(Math.random() * (100 - 50) + 50)
                    //尾巴的相关设置
                    var circle = new echarts.graphic.Circle({
                        position: point1,
                        scale: [1, 1],
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 2
                        },
                        style: {
                            fill: color
                        },
                        zlevel: 3
                    });
                    //圆环的相关设置
                    var circle2 = new echarts.graphic.Circle({
                        position: point2,
                        scale: [1, 1],
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 0
                        },
                        style: {
                            fill: 'none',
                            stroke: '#fe4f16',
                            opacity: 1,
                        },
                        zlevel: 3
                    });
                    var circle3 = new echarts.graphic.Circle({
                        position: point3,
                        scale: [1, 1],
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 0
                        },
                        style: {
                            fill: 'none',
                            stroke: color,
                            opacity: 1,
                        },
                        zlevel: 3
                    });
                    var text = new echarts.graphic.Text({
                            position: point3,
                            style: {
                                text: province,
                                fill: color,
                                textAlign: 'left',
                            }
                        }
                    );

                    /*动态模糊*/
                    zr.configLayer(3, {
                        motionBlur: true,
                        lastFrameAlpha: 0.8,
                    });

                    /*动画部分*/
                    circle3.animateTo({
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 30
                        },
                        style: {
                            fill: 'none',
                            stroke: color,
                            opacity: 0,
                        },
                    }, t, 'cubicOut');
                    text.animateTo({
                        style: {
                            opacity: 0,
                        },
                    }, 5000, 'cubicOut');
                    circle.animate('', false)
                        .when(t, {
                            position: point2
                        })
                        .start()
                        .done(function () {
                            zr.remove(circle);
                            circle2.animateTo({
                                shape: {
                                    cx: 0,
                                    cy: 0,
                                    r: 20
                                },
                                style: {
                                    fill: 'none',
                                    stroke: '#fe4f16',
                                    opacity: 0,
                                },
                            }, t, 'cubicOut')
                        });
                    zr.add(circle2);
                    zr.add(circle);
                    zr.add(circle3);
                    zr.add(text);
                } else {
                    clearInterval(timer);
                }
            }
        },
        initWorldMapChart: function (ele) {

            var self = this;
            var BJData = [];
            var series = [];
            [
                ['中国', BJData]
            ].forEach(function (item, i) {
                series.push(
                    //被攻击点
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            brushType: 'stroke',
                            scale: 4
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                //offset:[5, 0],
                                color: '#00ffff',
                                formatter: '{b}',
                                textStyle: {
                                    color: "#00ffff"
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'pin',
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#9966cc'
                            }
                        },
                        data: [{
                            name: '中国',
                            value: [104.195397, 35.86166, 3],
                        }],
                    }
                );
            });

            var option = {
                visualMap: {
                    type: 'piecewise',
                    splitNumber: 3,
                    pieces: [{
                        min: 0,
                        max: 1,
                        label: '低',
                        color: 'aqua'
                    }, {
                        min: 1,
                        max: 2,
                        label: '中',
                        color: 'yellow'
                    }, {
                        min: 3,
                        max: 3,
                        label: '高',
                        color: '#ff3333'
                    }],
                    left: '40',
                    bottom: '300',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    },
                },
                geo: {
                    map: 'world',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true, //是否允许缩放
                    layoutCenter: ['50%', '50%'], //地图位置
                    layoutSize: "140%",
                    itemStyle: {
                        normal: {
                            color: 'rgba(51, 69, 89, .5)', //地图背景色
                            borderColor: 'rgba(100,149,237,1)' //省市边界线
                        },
                        emphasis: {
                            color: 'rgba(37, 43, 61, .5)' //悬浮背景
                        }
                    }
                },

                series: series
            };
            var myChart = echarts.init(ele);
            myChart.setOption(option);
            window.onresize = function () {
                myChart.resize();
            }
        }


    };

    $(document).ready(function () {
        var page = new Page();
    });

})(jQuery);