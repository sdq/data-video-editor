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

    let series = getSeriesValue(data, encoding);
    let seriesIndex = series.indexOf(animation.spec.series)
    let duration = animation.duration;

    let hasSeries = 'color' in encoding;
    let stackedData = [];
    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
    }
    //Y轴        
    var y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);


    if (animation.spec.effect === "flicker") {
        const tick = 12;

        if (animation.spec.series !== "all") {

            areaPath = areaG.selectAll('#series_' + seriesIndex)

            // let lastArray = [areaPath['_groups'][0][0].__data__.slice(-1)[0][0], areaPath['_groups'][0][0].__data__.slice(-1)[0][1]]
            // TODO: tooltip position
            let firstArray = [stackedData[seriesIndex][0][0], stackedData[seriesIndex][0][1]]
            let middleX = 0
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
                .text(animation.spec.series)
                .attr('text-anchor', 'middle')
                .attr("font-size", 14)
                .attr("fill", "black");
        }

        areaPath.attr("stroke", "yellow")
            .attr("stroke-width", 2.5)
            .attr("stroke-opacity", 0)
            .transition()
            .duration(animation.duration / tick)
            .attr("stroke-opacity", 1);



        let count = 0;
        let timeid = setInterval(function () {
            count++;
            if (count % 2) {
                areaPath.attr("fill-opacity", 1)
                    .transition()
                    .duration(animation.duration / tick * 2)
                    .attr("fill-opacity", 0);
            } else {
                areaPath.attr("fill-opacity", 0)
                    .transition()
                    .duration(animation.duration / tick * 2)
                    .attr("fill-opacity", 1);
            }
            if (count === 4) clearInterval(timeid);
        }, animation.duration / tick * 2);
        setTimeout(function () {
            areaPath
                .transition()
                .duration(animation.duration / tick)
                .attr("stroke-width", 0);
            // text.remove();
            d3.selectAll('.animation')
                .transition()
                .duration(duration / tick)
                .attr('opacity', 0)
                .remove()
        }, animation.duration / tick * (tick - 1));

    } else if (animation.spec.effect === "filter") {
        const tick = 8;
        if (animation.spec.series === "all") {

        } else {
            let left = areaG.selectAll("path").filter(d => d.key !== animation.spec.series)
                .attr("fill-opacity", 1);

            left.attr("fill-opacity", 1)
                .transition()
                .duration(animation.duration / tick * 5)
                .attr("fill-opacity", 0.1);

            areaPath = areaG.selectAll('#series_' + seriesIndex)
            areaPath.attr("stroke", "yellow")
                .attr("stroke-width", 5)
                .attr("stroke-opacity", 0)
                .transition()
                .duration(animation.duration / tick * 5)
                .attr("stroke-opacity", 0.6);


            // tooltip
            // let lastArray = [areaPath['_groups'][0][0].__data__.slice(-1)[0][0], areaPath['_groups'][0][0].__data__.slice(-1)[0][1]]
            let firstArray = [stackedData[seriesIndex][0][0], stackedData[seriesIndex][0][1]]
            let middleX = 0
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
                .text(animation.spec.series)
                .attr('text-anchor', 'middle')
                .attr("font-size", 14)
                .attr("fill", "black");

            setTimeout(function () {
                left
                    .transition()
                    .duration(animation.duration / tick)
                    .attr("fill-opacity", 1);

                areaPath
                    .transition()
                    .duration(animation.duration / tick)
                    .attr("stroke-width", 0);

                d3.selectAll('.animation')
                    .transition()
                    .duration(duration / tick)
                    .attr('opacity', 0)
                    .remove()
                // text.remove();
            }, animation.duration / tick * (tick - 1));

        }
    }
    return svg;
}

export default draw;