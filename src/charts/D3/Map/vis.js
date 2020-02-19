import * as d3 from 'd3';
import chinaData from '@/datasets/map/chinaGeo';
import worldData from '@/datasets/map/worldGeo';
import usStateData from '@/datasets/map/usStateGeo';
import { getData, getMapType} from './helper';
import _ from 'lodash';


const draw = (props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-map > *').remove();
        a = '.vis-map';
    }

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    // Get Encoding
    const encoding = props.spec.encoding;
    //console.log("map encoding", encoding)
    // Process Data
    let parseData = props.data;

    //  获取地图类型
    let chartType = getMapType(parseData, encoding);
    //console.log("parseData...chartType", chartType)
    let geoFeatures;
    let center;
    let scale;
    if (!chartType) { //默认中国 
        geoFeatures = chinaData.features
        center = [102, 35];
        scale = 550;
    } else {
        //console.log("chartType...", chartType)
        if (chartType === 'ChinaMap') { //中国地图
            //console.log("ChinaMap...")
            geoFeatures = chinaData.features
            center = [102, 35];
            scale = 550;
        } else if (chartType === 'WorldMap') { //世界地图
            //console.log("WorldMap...")
            //
            geoFeatures = worldData.features;
            center = [0, 30];
            scale = 80;
        } else if (chartType === 'USMap') { //美国地图
            //console.log("USMap...")
            geoFeatures = usStateData.features;
            center = [487.5, 305];
            scale = 550;
        } else { //默认中国地图
            //console.log("else...")
            geoFeatures = chinaData.features;
            center = [102, 35];
            scale = 550;
        }
    }

    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", props.height + margin.top + margin.bottom - 60)
        .append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (_.isEmpty(encoding) || !('area' in encoding) || _.isEmpty(encoding.area)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg;
    }

    let encodingData = getData(parseData, encoding);
    //中英文地区值判断
    let isEnLanguage = encodingData.isEN;
    //将读取到的数据存到数组values，令其索引号为各省的名称
    let values = encodingData.values;
    let encodingValue = Object.values(values);
    //console.log("encodingValue",encodingValue)

    //求最大值和最小值
    let maxValue = 0;
    let minValue = 0;
    if (!_.isEmpty(encoding.color)) {
        maxValue = d3.max(encodingValue);
        minValue = d3.min(encodingValue);
        //console.log("encoding.color.field ", isEnLanguage,encoding.color.field, "parseData ", parseData, " values ", values)
    }
    //console.log("maxValue", maxValue, typeof maxValue, minValue, typeof minValue)
    let middleValue = (parseInt(maxValue) + parseInt(minValue)) / 2;
    //console.log("maxValue", maxValue)
    //定义一个线性比例尺，将最小值和最大值之间的值映射到[0, 1]
    let linear = d3.scaleLinear().domain([minValue, maxValue]).range([0, 1]);

    //定义最小值和最大值对应的颜色
    let minColorValue = d3.rgb(31, 72, 233);  //蓝色
    let maxColorValue = d3.rgb(192, 86, 36);    //黄色
    //let color = d3.interpolate(minColorValue, maxColorValue);        //颜色插值函数
    //颜色插值函数
    let computeColor = d3.interpolate(minColorValue, maxColorValue);


    // 定义地图投影
    const projection = d3.geoMercator()
        .center(center)
        .scale(scale)
        .translate([width / 2, height / 2]);
    // 定义地理路径生成器
    const path = d3.geoPath()
        .projection(projection);

    //包含中国各省路径的分组元素
    svg.selectAll('path')
        .data(geoFeatures)
        .enter()
        .append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('fill', function (d, i) {
            let value;
            if (chartType === 'USMap') { //
                value = values[d.properties.name]
               // console.log("USMap...",d.properties.name,values[d.properties.name])
            } else {
                value = isEnLanguage ? values[d.properties.enName] : values[d.properties.name]; //中国与世界地图做中英文适配
            }
            //console.log("设定各省份的填充色", d.properties.name, d.properties.enName, "数据", values[d.properties.enName])
            if (!value) return 'rgb(227, 228, 229)' //不存在数据的国家，显示灰色
            //设定各省份的填充色
            let t = linear(value);
            let color = computeColor(t);
            //console.log('设定各省份的填充色',d.properties.name,color)
            return color.toString()
        })
        .attr('d', path)
    // .on("mouseover", function (d, i) {
    //     d3.select(this)
    //         .attr("fill", "yellow");
    // })
    // .on("mouseout", function (d, i) {
    //     //恢复各省份的填充色
    //     let value = values[d.properties.name]
    //     if (!value) {
    //         d3.select(this)
    //             .attr("fill", 'rgb(227, 228, 229)');//不存在数据的国家，显示灰色
    //     } else {
    //         let t = linear(values[d.properties.name]);
    //         let color = computeColor(t);
    //         d3.select(this)
    //             .attr("fill", color.toString());
    //     }
    // });


    //console.log("encoding.color", !_.isEmpty(encoding.color))
    if (!_.isEmpty(encoding.color)) {
        //定义一个线性渐变
        var defs = svg.append("defs");

        var linearGradient = defs.append("linearGradient")
            .attr("id", "linearColor")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        linearGradient.append("stop")
            .attr("offset", "0%")
            .style("stop-color", minColorValue.toString());

        linearGradient.append("stop")
            .attr("offset", "50%")
            .style("stop-color", 'rgb(255, 255, 255)');

        linearGradient.append("stop")
            .attr("offset", "100%")
            .style("stop-color", maxColorValue.toString());

        //添加一个矩形，并应用线性渐变
        let rectWidth = 340; //矩形的宽度
        let rectHight = 20;//矩形的高度
        let rectMarginBottom = 90;//具体底部60
        svg.append("rect")
            .attr("x", (props.width - rectWidth) / 2)
            .attr("y", props.width - rectMarginBottom)
            .attr("width", rectWidth)
            .attr("height", rectHight)
            .style("fill", "url(#" + linearGradient.attr("id") + ")");

        //添加文字
        svg.append("text")
            .attr("class", "valueText")
            .attr("x", (props.width - rectWidth) / 2 - 20) //字离左侧矩形往左偏移20
            .attr("y", props.width - rectMarginBottom + 50) //字离下侧矩形偏移50
            .attr("dy", "-0.3em")
            .text(function () {
                return minValue;
            });

        svg.append("text")
            .attr("class", "valueText")
            .attr("x", (props.width / 2) - 20) //字离中间矩形往左偏移20
            .attr("y", props.width - rectMarginBottom + 50) //字离下侧矩形偏移50
            .attr("dy", "-0.3em")
            .text(function () {
                return middleValue;
            });

        svg.append("text")
            .attr("class", "valueText")
            .attr("x", ((props.width - rectWidth) / 2 + rectWidth) - 20) //字离右侧矩形往左偏移20
            .attr("y", props.width - rectMarginBottom + 50) //字离下侧矩形偏移50
            .attr("dy", "-0.3em")
            .text(function () {
                return maxValue;
            });
    }
    return svg;
}

export default draw;