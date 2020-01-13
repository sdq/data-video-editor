import * as d3 from 'd3';
import { getStackedData } from '../../helper';
// import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (animation, props) => {
    const margin = { top: 10, right: 80, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;

    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-areachart svg');

    //TODO: percent and basic

    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    let hasSeries = 'color' in encoding;
    let data = props.data;
    let stackedData = [];
    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
    }

    var x = d3.scalePoint()
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .range([0, width]);
    var y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    }

    // var stacked_area_generator = d3.area()
    //     .x(d => x(d.data.x))
    //     .y0(d => y(d[0]))
    //     .y1(d => y(d[1]))

    var stacked_area_generator = (rangeY, rangeX) => {
        //console.log(rangeY)
        let x0 = rangeX[0];
        let x1 = rangeX[1];
        let scale = (x1 - x0) / 100;
        //TODO: 第三个条件是为了zoom out
        if (!rangeY || rangeY.length === 0 || rangeY.toString() === [0, d3.max(stackedData[stackedData.length - 1], d => d[1])].toString()) {
            y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
        } else {
            y.domain(rangeY);
        }
        var stacked_area_generator = d3.area()
            .x(d => ((x(d.data.x) - width * (x0 / 100)) / scale))
            // .x(d => x(d.data.x))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]))
        return stacked_area_generator;
    }
    // Animation
    let rangeY = animation.spec.rangeY
    let rangeX = animation.spec.rangeX ? animation.spec.rangeX : [0, 100];

    if (animation.spec.effect === "zoom in") {

        let x0 = rangeX[0];
        let x1 = rangeX[1];
        let scale = (x1 - x0) / 100;
        svg.selectAll('g').remove();
        let areaLayer = svg.append("g").attr('id', 'areaLayer')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        areaLayer.append('defs').append('clipPath')
            .attr('id', 'clip')
            .append('rect')
            .attr('width', width)
            .attr('height', height)

        const areaG = areaLayer.append('g').attr('clip-path', 'url(#clip)').attr('class', 'areaG')


        // Axis
        areaLayer.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr('transform', 'translate(37,28) rotate(30)')
            .style("text-anchor", "end")
        // .attr('clip-path', 'url(#clip)');
        areaLayer.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y))
        // .attr('clip-path', 'url(#clip)');

        areaG.append("g")
            .selectAll("path")
            .data(stackedData)
            .join("path")
            .attr('id', ({ index }) => 'series_' + index)
            .attr("fill", ({ key }) => colorScale(key))
            .attr("d", stacked_area_generator(y.domain(), [0, 100]))
            .transition()
            .duration(animation.duration)
            .attr("d", stacked_area_generator(rangeY, rangeX))


        if (animation.spec.rangeY || animation.spec.rangeX) {
            if (animation.spec.rangeY) {
                y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
                //console.log(y.domain())
                areaLayer.selectAll(".y.axis")
                    .call(d3.axisLeft(y));
                y.domain(rangeY)
                areaLayer.selectAll(".y.axis")
                    .transition()
                    .duration(animation.duration)
                    .call(d3.axisLeft(y));
            }
            if (animation.spec.rangeX) {
                x = d3.scalePoint()
                    .domain(data.map(function (d) { return d[encoding.x.field]; }))
                    .range([0, width]);
                areaLayer.selectAll(".x.axis")
                    .call(d3.axisBottom(x));

                x.range([0 - (width * x0 / 100) / scale, width + (width * (100 - x1) / 100) / scale]);
                areaLayer.selectAll(".x.axis")
                    .transition()
                    .duration(animation.duration)
                    .call(d3.axisBottom(x));
            }
        }

    } else if (animation.spec.effect === "zoom out") {
        //console.log('out')
        let x0 = rangeX[0];
        let x1 = rangeX[1];
        let scale = (x1 - x0) / 100;

        const areaLayer = svg.select('#areaLayer')
        const areaG = svg.select('.areaG')
        if (animation.spec.rangeY || animation.spec.rangeX) {
            areaG.selectAll('path').remove()

            y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
                
            areaG.append("g")
            .selectAll("path")
            .data(stackedData)
            .join("path")
            .attr('id', ({ index }) => 'series_' + index)
            .attr("fill", ({ key }) => colorScale(key))
            .attr("d", stacked_area_generator(rangeY, rangeX))
            .transition()
            .duration(animation.duration)
            .attr("d", stacked_area_generator([0, d3.max(stackedData[stackedData.length - 1], d => d[1])], [0, 100]))
            //console.log(y.domain())
            if (animation.spec.rangeY) {
                y.domain(rangeY)
                areaLayer.selectAll(".y.axis")
                    .call(d3.axisLeft(y));
                y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
                areaLayer.selectAll(".y.axis")
                    .transition()
                    .duration(animation.duration)
                    .call(d3.axisLeft(y));
            }
            if (animation.spec.rangeX) {
                x.range([0 - (width * x0 / 100) / scale, width + (width * (100 - x1) / 100) / scale]);
                areaLayer.selectAll(".x.axis")
                    .call(d3.axisBottom(x));
                x.range([0, width]);

                areaLayer.selectAll(".x.axis")
                    .transition()
                    .duration(animation.duration)
                    .call(d3.axisBottom(x));
            }
        }

    }


    return svg;
}

export default draw;