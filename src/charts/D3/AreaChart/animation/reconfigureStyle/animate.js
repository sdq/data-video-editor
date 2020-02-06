import * as d3 from 'd3';
import { getStackedData, getAggregatedRows } from '../../helper';
// import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (animation, props) => {
    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset -40;

    let data = props.data,
        encoding = props.spec.encoding;
    const svg = d3.select('.vis-areachart svg');
    const areaG = svg.select('.areaG')
    // let areaPath = areaG.selectAll("path")

    let hasSeries = ('color' in encoding) && ('field' in encoding.color);

    // Process Data
    let stackedData = [];
    // let dataSeries = [];
    // let series = [];
    if (hasSeries) {
        // dataSeries = getSeries(data, encoding);
        stackedData = getStackedData(data, encoding);
        // series = Object.keys(dataSeries);
    } else {
        data = getAggregatedRows(data, encoding);
        return svg;
    }

    var x = d3.scalePoint()
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .rangeRound([0, width]);
    var y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    }


    // Color channel
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // stacked area
    var stacked_area_generator = d3.area()
        .x(d => x(d.data.x))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))

    // 100% stacked area
    let totalDict = {};
    stackedData[stackedData.length - 1].forEach(d => {
        totalDict[d.data.x] = d[1];
    });
    var percent_area_generator = d3.area()
        .x(d => x(d.data.x))
        .y0(d => {
            let total = totalDict[d.data.x];
            return y(d[0] / total);
        })
        .y1(d => {
            let total = totalDict[d.data.x];
            return y(d[1] / total);
        })

    // Animation
    if (hasSeries) {
        // let n = series.length;
        if (animation.spec.startLayout === "stacked" && animation.spec.endLayout === "percent") {
            areaG.selectAll("path").remove();

            areaG.selectAll("path")
                .data(stackedData)
                .join("path")
                .attr('id', ({ index }) => 'series_' + index)
                .attr('clip-path', ({ index }) => 'url(#clip_' + index + ')').attr('class', 'areaG')
                .attr('class', 'areaPath')
                .attr("fill", ({ key }) => colorScale(key))
                .attr("d", stacked_area_generator)

            let totalDict = {};
            stackedData[stackedData.length - 1].forEach(d => {
                totalDict[d.data.x] = d[1];
            });
            y.domain([0, 1]);
            areaG.selectAll("path")
                .transition()
                .duration(animation.duration)
                .attr("d", percent_area_generator)

                svg.selectAll(".y.axis").transition()
            .duration(animation.duration)
            .call(d3.axisLeft(y))
        } 


        if (animation.spec.startLayout === "percent" && animation.spec.endLayout === "stacked") {
            areaG.selectAll("path").remove();
            y.domain([0, 1]);

            areaG.selectAll("path")
                .data(stackedData)
                .join("path")
                .attr('id', ({ index }) => 'series_' + index)
                .attr("fill", ({ key }) => colorScale(key))
                .attr("d", percent_area_generator)

            y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice();
            areaG.selectAll("path")
            .transition()
                .duration(animation.duration)
                .attr("d", stacked_area_generator)

                svg.selectAll(".y.axis").transition()
            .duration(animation.duration)
            .call(d3.axisLeft(y))
        }
    }

    return svg;
}

export default draw;