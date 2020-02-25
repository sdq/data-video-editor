import * as d3 from 'd3';
import chinaData from './geo/chinaGeo';
import worldData from './geo/worldGeo';
import usStateData from './geo/usStateGeo';
import { getData, getMapType } from './helper';
import _ from 'lodash';

const mapParams = {
    "ChinaMap": {
        geoData: chinaData,
    },
    "WorldMap": {
        geoData: worldData,
    },
    "USMap": {
        geoData: usStateData,
    },

}
//legend宽高位置 
const rectWidth = 340; //矩形的宽度
const rectHight = 20;//矩形的高度
const rectMarginBottom = 90;//距离底部90

const draw = (props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-map > *').remove();
        a = '.vis-map';
    }

    // Get Encoding
    const encoding = props.spec.encoding;
    // Process Data
    let parseData = props.data;

    //  获取地图类型
    let chartType = getMapType(parseData, encoding);
    let mapdata = {};
    let projection = d3.geoMercator();    // 默认地图投影
    if (!chartType) { //默认中国 
        mapdata = mapParams.ChinaMap
    } else {
        if (chartType === 'ChinaMap') {
            mapdata = mapParams.ChinaMap
        } else if (chartType === 'WorldMap') {
            mapdata = mapParams.WorldMap
        } else if (chartType === 'USMap') {
            mapdata = mapParams.USMap
            projection = d3.geoAlbersUsa(); //美国地图投影
        } else { //默认中国地图
            mapdata = mapParams.ChinaMap
        }
    }
    projection.fitSize([props.width, props.height - rectMarginBottom - rectHight], mapdata.geoData) //地图根据屏幕自适配 

    let svg = d3.select(a)
        .append("svg")
        .attr("width", props.width)
        .attr("height", props.height)
        .append("g")

    if (_.isEmpty(encoding) || !('area' in encoding) || _.isEmpty(encoding.area)) {
        svg.append("rect")
            .attr("width", props.width)
            .attr("height", props.height)
            .attr("fill", "pink");
        return svg;
    }

    let encodingData = getData(parseData, encoding);
    //中英文地区值判断
    let isEnLanguage = encodingData.isEN;
    //将读取到的数据存到数组values，令其索引号为各省的名称
    let values = encodingData.values;
    let encodingValue = Object.values(values);

    //求最大值和最小值
    let maxValue = 0;
    let minValue = 0;
    if (!_.isEmpty(encoding.color)) {
        maxValue = d3.max(encodingValue);
        minValue = d3.min(encodingValue);
    }

    //定义最小值和最大值对应的颜色
    let blueColor = d3.rgb(31, 72, 233);
    let whiteColor = d3.rgb(255, 255, 255);
    let redColor = d3.rgb(192, 86, 36);

    let scale;
    let isLogScale = false;
    let computeColor;
    if (minValue >= 0) { //如果都是大于0的数，就直接从白到红即可，不需要蓝色
        computeColor = d3.interpolate(whiteColor, redColor);
        let logScale = d3.scaleLog().domain([1, maxValue]); //默认值域range是[0, 1]
        scale = logScale;
        isLogScale = true;
    } else if (minValue < 0 && maxValue >= 0) { //如果数据中有负数，有正数，取绝对值最大的值最大值，取相反数为最小值；负数为蓝，正数为红, 零为白色
        computeColor = d3.interpolate(blueColor, redColor);
        maxValue = Math.abs(minValue) >= maxValue ? Math.abs(minValue) : maxValue
        minValue = -maxValue;
        scale = d3.scaleLinear().domain([minValue, maxValue]);
    } else {
        computeColor = d3.interpolate(blueColor, redColor);
        scale = d3.scaleLinear().domain([minValue, maxValue]);
        //console.log("数值全负数。。。")
    }

    // 定义地理路径生成器
    const path = d3.geoPath()
        .projection(projection);

    //路径的分组元素
    svg.selectAll('path')
        .data(mapdata.geoData.features)
        .enter()
        .append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('fill', function (d, i) {
            let value;
            if (chartType === 'USMap') {
                value = values[d.properties.name]
            } else {
                value = isEnLanguage ? values[d.properties.enName] : values[d.properties.name]; //中国与世界地图做中英文适配
            }
            if (!value) return 'rgb(227, 228, 229)' //不存在数据的国家，显示灰色
            //设定各省份的填充色
            let color = computeColor(scale(value));
            //console.log("logScale", d.properties.name,value,scale(value),color)
            return color.toString()
        })
        .attr('d', path)


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
            .style("stop-color", computeColor(scale(minValue)));

        if (!isLogScale) {
            linearGradient.append("stop")
                .attr("offset", '50%')
                .style("stop-color", whiteColor);
        }

        linearGradient.append("stop")
            .attr("offset", "100%")
            .style("stop-color", computeColor(scale(maxValue)));

        //添加一个矩形，并应用线性渐变
        svg.append("rect")
            .attr("x", (props.width - rectWidth) / 2)
            .attr("y", props.width - rectMarginBottom)
            .attr("width", rectWidth)
            .attr("height", rectHight)
            .style("fill", "url(#" + linearGradient.attr("id") + ")");

        //添加文字
        svg.append("text")
            .attr("class", "valueText")
            .attr("x", (props.width - rectWidth) / 2 - 10) //字离左侧矩形往左偏移10
            .attr("y", props.width - rectMarginBottom + 50) //字离下侧矩形偏移50
            .attr("dy", "-0.3em")
            .text(function () {
                return minValue;
            });

        if (isLogScale) {
            //中间是1,10,100...
            let middleCount = 0;
            let firstText = 1;
            let countMin = minValue;
            while (countMin >= 1) { //找第一个点
                firstText *= 10;
                countMin /= 10;
            }
            if (firstText > 1 && minValue !== 1) {
                middleCount++;
            }

            let afterFirstText = firstText;
            while (afterFirstText < maxValue) {
                afterFirstText *= 10;
                middleCount++;
            }

            //绘制中间的数值
            let totalCount = middleCount + 1;//将矩形的宽度totalCount等分
            let currentCount = 1;
            let textValue = firstText;
            while (middleCount--) {
                let posX = (props.width - rectWidth) / 2 + (currentCount / totalCount) * rectWidth - 10;//字离中间矩形往左偏移10
                let posY = props.width - rectMarginBottom + 50;//字离下侧矩形偏移50
                drawMiddleText(svg, posX, posY, textValue);
                currentCount++;
                textValue *= 10
            }
        } else {
            //零的位置
            svg.append("text")
                .attr("class", "valueText")
                .attr("x", (props.width / 2) - 10) //字离中间矩形往左偏移10
                .attr("y", props.width - rectMarginBottom + 50) //字离下侧矩形偏移50
                .attr("dy", "-0.3em")
                .text(function () {
                    return 0;
                });
        }
        svg.append("text")
            .attr("class", "valueText")
            .attr("x", ((props.width - rectWidth) / 2 + rectWidth) - 10) //字离右侧矩形往左偏移10
            .attr("y", props.width - rectMarginBottom + 50) //字离下侧矩形偏移50
            .attr("dy", "-0.3em")
            .text(function () {
                return maxValue;
            });
    }
    return svg;
}
function drawMiddleText(svg, posX, posY, text) {
    svg.append("text").attr("class", "valueText")
        .attr("x", posX)
        .attr("y", posY)
        .attr("dy", "-0.3em")
        .text(function () {
            return text;
        });
}

export default draw;