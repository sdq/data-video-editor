import * as d3 from 'd3';
import { getStackedData, getMaxRows} from './helper';

const draw = (props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-areachart > *').remove();
        a = '.vis-areachart';
    }
    const offset = 20;
    const margin = { top: 10, right: 80, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Encoding
    const encoding = props.spec.encoding;
    //console.log(encoding)

    let hasSeries = 'color' in encoding;
    let layout = 'stacked';// basic/stacked/percent 

    // Process Data
    let data = props.data;



    let stackedData = [];
    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
    }

    data = getMaxRows(data, encoding);
    //console.log(data)

    // Style
    // const style = props.spec.style;
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    //Scale
    //X轴

    // for numeric
    // var x = d3.scaleLinear()
    //     .domain(d3.extent(data, function (d) { return d[encoding.x.field]; }))
    //     .range([0, width]);

    // for categorical
    var x = d3.scalePoint()
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .range([0, width]);
    // rangeRound使它产生空隙，改成range就好了

    //Y轴        
    var y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);

    // basic area
    var area_generator = d3.area()
        .x(function (d) {
            return x(d[encoding.x.field]);
        })
        .y0(height)
        .y1(function (d) {
            return y(d[encoding.y.field]);
        })
    // .curve(d3.curveMonotoneX)

    // stacked area
    var stacked_area_generator = d3.area()
        .x(d => x(d.data.x))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))

    // var stacked_area_generator = function (datum, boolean) {
    //     return d3.area()
    //         .y0(d => y(d[0]))
    //         .y1(d => y(d[1]))
    //         .x(function (d) { return boolean ? x(d.data.x) : 0; })
    //         (datum);
    // }

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

    let areaLayer = svg.append("g").attr('id', 'areaLayer')


    areaLayer.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr("width", width)
        .attr('height', height)

    const areaG = areaLayer.append('g')
        .attr('clip-path', 'url(#clip)').attr('class', 'areaG')

    if (hasSeries && layout === 'stacked') {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
        areaG.selectAll("path")
            .data(stackedData)
            .join("path")
            .attr('id', ({ index }) => 'series_' + index)
            .attr('clip-path', ({ index }) => 'url(#clip_' + index + ')').attr('class', 'areaG')
            .attr('class', 'areaPath')
            .attr("fill", ({ key }) => colorScale(key))
            .attr("d", stacked_area_generator)

        d3.select("#clip rect").attr("width", width);

    } else if (hasSeries && layout === 'percent') {
        y.domain([0, 1]);
        areaG.selectAll("path")
            .data(stackedData)
            .join("path")
            .attr('id', ({ index }) => 'series_' + index)
            .attr("fill", ({ key }) => colorScale(key))
            .attr("d", percent_area_generator)
    } else {
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);
        areaG.append("path")
            .style("fill", colorScale(0))
            .attr("d", area_generator(data))
        // .style('stroke', colorScale(0))
        // .style('fill-opacity', 0.5);
    }

    let rotate = false
    let tickText = areaLayer.append("g")
        .attr("class", "x axis")
        .call(d3.axisBottom(x))
        .attr("transform", "translate(0," + height + ")")
        // .attr("stroke-dasharray","5,5")
        .selectAll('.tick text')
        .each(function (d) {
            if (this.getComputedTextLength() > 20)
                rotate = true
        })
    if (rotate)
        tickText.attr('transform', 'translate(14,14) rotate(30)')
    areaLayer.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
    // .attr("stroke-dasharray","5,5");

    //y轴文字
    // svg.append("text")
    //     .text("Displacement")
    //     .attr("transform", "rotate(-90)")
    //     .attr("dy", "1em")
    //     .attr("text-anchor", "end")

    return svg;
}

export default draw;