import * as d3 from 'd3';
import { getSeriesValue, getStackedData } from '../../helper';

const draw = (animation, props) => {

    const data = props.data,
        encoding = props.spec.encoding;
    const svg = d3.select('.vis-areachart svg');
    const areaG = svg.select('.areaG')
    let areaPath = areaG.selectAll("path")

    const offset = 20;
    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    // const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset -40;
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);
    let stackedData = [];
    
    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
    } 
    let series = getSeriesValue(data, encoding);
    animation.spec.series1 = animation.spec.series1 && animation.spec.series1 !== "all" ? animation.spec.series1:series[0];
    animation.spec.series2 = animation.spec.series2 && animation.spec.series2 !== "all" ? animation.spec.series2:series[1];
   
    let compareIndex1 = series.indexOf(animation.spec.series1),
        compareIndex2 = series.indexOf(animation.spec.series2)
    let duration = animation.duration;
    let tick = 12;
    //Y轴        
    var y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);


    if (hasSeries && animation.spec.effect === "superposition") {
        // 隐藏其他没被选中的path      
        areaPath
            .attr('opacity', 1)
            .transition()
            .duration(duration / tick * 2)
            .attr('opacity', function () {
                if (d3.select(this)['_groups'][0][0].id !== 'series_' + compareIndex1 && d3.select(this)['_groups'][0][0].id !== 'series_' + compareIndex2)
                    return 0.1;
            })
            .attr("stroke", "yellow")
            .attr("stroke-width", 3)
            .attr("stroke-opacity", 0)
            .transition()
            .duration(duration / tick * 2)
            .attr("stroke-opacity", function () {
                if (d3.select(this)['_groups'][0][0].id === 'series_' + compareIndex1 || d3.select(this)['_groups'][0][0].id === 'series_' + compareIndex2)
                    return 0.6;
            })
        // tooltip 1

        let compareArray = new Array(2);
        let comparePath = new Array(2);
        let compareIndex = [compareIndex1,compareIndex2]
        compareArray[0] = animation.spec.series1
        compareArray[1] = animation.spec.series2
        comparePath[0] = areaG.select('#series_' + compareIndex1)
        comparePath[1] = areaG.select('#series_' + compareIndex2)
        compareIndex.forEach((s, i) => {
            // let lastArray = [comparePath[i]['_groups'][0][0].__data__.slice(-1)[0][0], areaPath['_groups'][0][0].__data__.slice(-1)[0][1]]
            let middleX = 0
            let firstArray = [stackedData[s][0][0],stackedData[s][0][1]]
            let middleY = (y(firstArray[0]) + y(firstArray[1])) / 2
            let tooltip = areaG.append('line')
                .attr('class', 'animation')
                .attr('x1', middleX)
                .attr('y1', middleY)
                .attr("x2", middleX)
                .attr("y2", middleY)
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("opacity", 1);
            tooltip
                .transition()
                .delay(animation.duration / tick * 2)
                .duration(duration / tick * 2)
                .attr("x2", middleX + 20)
                .attr("y2", middleY);
            let tooltipText = areaG.append('text')
                .attr('class', 'animation')
                .attr("font-size", 0)
                .attr('x', middleX + 45)
                .attr('y', middleY + 5);
            tooltipText.transition()
                .delay(duration / tick * 4)
                .duration(duration / tick * 2)
                .text(compareArray[i])
                .attr('text-anchor', 'middle')
                .attr("font-size", 14)
                .attr("fill", "black");

        })

        // let lastArray = [comparePath1['_groups'][0][0].__data__.slice(-1)[0][0], areaPath['_groups'][0][0].__data__.slice(-1)[0][1]]
        // let middleX = width - 30
        // let middleY = (y(lastArray[0]) + y(lastArray[1])) / 2
        // let tooltip = svg.append('line')
        //     .attr('class', 'animation')
        //     .attr('x1', middleX)
        //     .attr('y1', middleY)
        //     .attr("x2", middleX)
        //     .attr("y2", middleY)
        //     .attr("stroke-width", 2)
        //     .attr("stroke", "black")
        //     .attr("opacity", 1);
        // tooltip
        //     .transition()
        //     .delay(animation.duration / tick * 2)
        //     .duration(duration / tick * 2)
        //     .attr("x2", middleX + 20)
        //     .attr("y2", middleY);
        // let tooltipText = svg.append('text')
        //     .attr('class', 'animation')
        //     .attr("font-size", 0)
        //     .attr('x', middleX + 45)
        //     .attr('y', middleY + 5);
        // tooltipText.transition()
        //     .delay(duration / tick * 4)
        //     .duration(duration / tick * 2)
        //     .text(animation.spec.series1)
        //     .attr('text-anchor', 'middle')
        //     .attr("font-size", 14)
        //     .attr("fill", "black");


        // areaG.select("#series_" + compareIndex1)
        //     .attr('opacity', 0)
        //     .transition()
        //     .duration(duration / tick * 2)
        //     .attr('opacity', 1);
        // areaG.select("#series_" + compareIndex2)
        //     .attr('opacity', 0)
        //     .transition()
        //     .duration(duration / tick * 2).attr('opacity', 1);


        // // 显示第一个信息
        // [animation.spec.series1, animation.spec.series2].forEach((s, i)=> {
        //     let lastCircle = d3.selectAll('circle.series_'+s).nodes().slice(-1);
        //     lastCircle = d3.select(lastCircle[0]);
        //     const x = parseFloat(lastCircle.attr('cx')),
        //           y = parseFloat(lastCircle.attr('cy'));
        //     content.append('line')
        //             .attr('class', 'animation')
        //             .attr('x1', x + 5)
        //             .attr('y1', y)
        //             .attr("x2", x + 5)
        //             .attr("y2", y)
        //             .attr("stroke-width", 2)
        //             .attr("stroke", "black")
        //             .attr("opacity", 1)
        //             .transition()
        //             .delay(duration / tick * (2 * i + 1)) // 1 3
        //             .duration(duration / tick)
        //             .attr("x2", x + 15)
        //             .attr("y2", y);
        //     content.append('text')
        //             .attr('class', 'animation')
        //             .attr('x', x + 20)
        //             .attr('y', y)
        //             .transition()
        //             .delay(duration / tick * (2 * (i+1))) // 2 4
        //             .duration(duration / tick)
        //             .text(s)
        //             .attr('text-anchor', 'start')
        //             .attr("font-size", 12)
        //             .attr("fill", "black")
        //             .attr("dominant-baseline", "middle")
        // })
        setTimeout(() => {
            areaPath.selectAll('.animation')
                .transition()
                .duration(duration / tick)

                .attr('opacity', 0)
                .remove();
            // for tooltip
            svg.selectAll('.animation')
                .transition()
                .duration(duration / tick)
                .attr('opacity', 0)
                .remove();
            //TODO: 没被compare的pathopacity过渡变成1 不平滑
            areaPath
                // .transition()
                // .duration(duration / tick)
                .attr("stroke-width", 0)
                .attr('opacity', 1)

            // areaPath
            //     .transition()
            //     .duration(duration / tick).attr('opacity', function () {
            //         if (d3.select(this)['_groups'][0][0].id != 'series_' + compareIndex1 && d3.select(this)['_groups'][0][0].id != 'series_' + compareIndex2)
            //             return 0.1;
            //     })

        }, duration / tick * (tick - 1))
    }
    return svg;
}

export default draw;