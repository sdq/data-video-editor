import * as d3 from 'd3';
import { getSeriesValue, getStackedData, getAggregatedRows } from '../../helper';

const draw = (animation, props) => {
    let data = props.data,
        encoding = props.spec.encoding;
    const svg = d3.select('.vis-areachart svg');
    const areaG = svg.select('.areaG')
    let areaPath = areaG.selectAll("path")

    const offset = 20;
    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset - 40;

    let hasSeries = ('color' in encoding) && ('field' in encoding.color);
    // Process Data
    let stackedData = [];
    let series;
    let seriesIndex; // 所选中的series 或者 all里面的极大值极小值所对应的series 
    let duration = animation.duration
    let seriesData = [];
    let extremeIndex; // 在单个series里面极值的index
    let extremeValue;// 在单个series里面极值的value
    let vLine;// 往下划的那条竖线的两端位置值 e.g. [0,455] [455, 600]

    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
        series = getSeriesValue(data, encoding);
    } else {
        data = getAggregatedRows(data, encoding);
    }

    //X轴
    var x = d3.scalePoint()
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .rangeRound([0, width]);

    //Y轴        
    var y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).nice().range([height, 0]);

    function getMaxIndex(array) {
        return d3.scan(array, function (a, b) {
            if (a && b)
                return b - a;
        });
    }

    function getMinIndex(array) {
        return d3.scan(array, function (a, b) {
            if (a && b)
                return a - b;
        });
    }

    if (animation.spec.effect === "filter") {
        const tick = 8;
        // all
        if (animation.spec.series === "all") {
            let mData = [],
                mDataIndex = [];
            if (animation.spec.value === 'min') {
                if (hasSeries) {
                    stackedData.forEach((d, i) => {
                        let temp = []
                        d.forEach(ds => {
                            temp.push(ds[1] - ds[0])
                        });
                        mData.push(d3.max(temp))
                        mDataIndex.push(getMinIndex(temp))
                    })
                    extremeValue = d3.min(mData)
                    seriesIndex = getMinIndex(mData)
                    extremeIndex = mDataIndex[seriesIndex]
                    vLine = stackedData[seriesIndex][extremeIndex]
                } else {
                    let dataArr = data.map((d) => d[encoding.y.field])
                    extremeIndex = getMinIndex(dataArr)
                    extremeValue = d3.min(dataArr)
                    vLine = [0, d3.min(dataArr)]
                }
            } else if (animation.spec.value === 'max') {
                if (hasSeries) {
                    stackedData.forEach((d, i) => {
                        let temp = []
                        d.forEach(ds => {
                            temp.push(ds[1] - ds[0])
                        });
                        mData.push(d3.max(temp))
                        mDataIndex.push(getMaxIndex(temp))
                    })
                    extremeValue = d3.max(mData)
                    seriesIndex = getMaxIndex(mData)
                    extremeIndex = mDataIndex[seriesIndex]
                    vLine = stackedData[seriesIndex][extremeIndex]
                } else {
                    let dataArr = data.map((d) => d[encoding.y.field])
                    extremeIndex = getMaxIndex(dataArr)
                    extremeValue = d3.max(dataArr)
                    vLine = [0, d3.max(dataArr)]
                }
            }


        } else {
            // a series
            seriesIndex = series.indexOf(animation.spec.series)

            let left = areaG.selectAll("path").filter(d => d.key !== animation.spec.series)
                .attr("fill-opacity", 1);

            left.attr("fill-opacity", 1)
                .transition()
                .duration(duration / tick * 5)
                .attr("fill-opacity", 0.1);

            areaPath = areaG.selectAll('#series_' + seriesIndex)
            areaPath.attr("stroke", "yellow")
                .attr("stroke-width", 5)
                .attr("stroke-opacity", 0)
                .transition()
                .duration(duration / tick * 5)
                .attr("stroke-opacity", 0.6);

            setTimeout(function () {
                left
                    .transition()
                    .duration(duration / tick)
                    .attr("fill-opacity", 1);

                areaPath
                    .transition()
                    .duration(duration / tick)
                    .attr("stroke-width", 0);

                // text.remove();
            }, duration / tick * (tick - 1));


            stackedData[seriesIndex].forEach(d => {
                seriesData.push(d[1] - d[0])
            });

            if (animation.spec.value === 'min') {
                extremeIndex = getMinIndex(seriesData)
            } else if (animation.spec.value === 'max') {
                extremeIndex = getMaxIndex(seriesData)
            }
            extremeValue = seriesData[extremeIndex]
            vLine = stackedData[seriesIndex][extremeIndex] // 一个数组
        }

        areaG.selectAll('line').remove()
        // vLine
        areaG.append('line')
            .attr('class', 'animation')
            .attr('x1', x(x.domain()[extremeIndex]))
            .attr('y1', y(vLine[1]))
            .attr('x2', x(x.domain()[extremeIndex]))
            .attr('y2', y(vLine[1]))
            .attr('stroke', '#000')
            .attr("stroke-width", 2)
            .transition()
            .duration(duration / tick)
            .attr('y2', y(vLine[0]))

        // 第一条虚线
        areaG.append('line')
            .attr('class', 'animation')
            .attr('x1', x(x.domain()[extremeIndex]))
            .attr('y1', y(vLine[1]))
            .attr('x2', x(x.domain()[extremeIndex]))
            .attr('y2', y(vLine[1]))
            .attr('stroke', '#000')
            .attr("stroke-dasharray", "5,5")
            .attr("stroke-width", 2)
            .transition()
            .delay(duration / tick)
            .duration(duration / tick)
            .attr('x2', 0)

        // 第二条虚线
        areaG.append('line')
            .attr('class', 'animation')
            .attr('x1', x(x.domain()[extremeIndex]))
            .attr('y1', y(vLine[0]))
            .attr('x2', x(x.domain()[extremeIndex]))
            .attr('y2', y(vLine[0]))
            .attr('stroke', '#000')
            .attr("stroke-dasharray", "5,5")
            .attr("stroke-width", 2)
            .transition()
            .delay(duration / tick)
            .duration(duration / tick)
            .attr('x2', 0)

        svg.append('text')
            .attr('class', 'animation')
            .text(extremeValue)
            .attr("x", 10)
            .attr("y", (y(vLine[0]) + y(vLine[1])) / 2 + 16)
            .attr("font-size", 12)
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .attr('opacity', 0)
            .transition()
            .delay(duration / tick)
            .duration(duration / tick)
            .attr('opacity', 1);

        // 结束清除
        setTimeout(function () {
            d3.selectAll('.animation')
                .transition()
                .duration(duration / tick)
                .attr('opacity', 0)
                .remove()
        }, duration / tick * (tick - 1))
    }
    return svg;
}

export default draw;