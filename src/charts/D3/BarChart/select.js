import * as d3 from 'd3';
import { getStackedData, getSeries, getAggregatedRows } from './helper';
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (props) => {
    let selectingParameter = props.selectingParameter;
    let selectType = selectingParameter.type;
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset -40;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get Encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding) || _.isEmpty(encoding.x) || _.isEmpty(encoding.y)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg;
    }
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);;

    // Process Data
    let data = props.data;
    let seriesKeys;
    let seriesData;
    let stackedData = [];
    if (hasSeries) {
        seriesData = getSeries(data, encoding);
        seriesKeys = Object.keys(seriesData);
        stackedData = getStackedData(data, encoding);
    } else {
        data = getAggregatedRows(data, encoding);
    }

    // X channel
    let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .padding(0.2);

    // Y channel
    let y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else {
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);
    }

    // Color channel
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // Bars
    if (hasSeries) {
        const layer = svg.selectAll('layer')
            .data(stackedData)
            .enter()
            .append('g')
            .attr('class', 'layer')
            .style('fill', (d, i) => color(i))
        
        if (selectType === 'series') {
            // Select Series
            layer.on("mouseover", function(d, i) {
                d3.select(this).style('fill', 'yellow');
            })
            .on("mouseout", function(d, i) {
                d3.select(this).style('fill', color(i));
            })
            .on('click', function(d, i) {
                let animation = props.selectedAnimation;
                animation.spec[selectingParameter.key] = d.key.toString();
                props.modifyChartAnimation(props.selectedAnimationIndex, animation);
                props.selectChartElement(false, {});
            })
        }

        layer.selectAll('rect')
            .data(d => d.map(x => {
                x.series = d.key.toString();
                return x;
            }))
            .enter()
            .append('rect')
            .attr('x', d => x(d.data.x))
            .attr('y', d => y(d[1]))
            .attr('height', d => y(d[0]) - y(d[1]))
            .attr('width', x.bandwidth() - 1)
            .style('stroke-width', '0')
        
        if (selectType === 'category') {
            // Select Category
            layer.selectAll('rect')
            .on("mouseover", function(d0, i) {
                layer.selectAll('rect')
                    .style('fill', (d, i) => {
                        if (d.data.x.toString() === d0.data.x.toString()) {
                            return 'yellow';
                        } else {
                            let index = seriesKeys.indexOf(d.series);
                            return color(index);
                        }
                    });
            })
            .on("mouseout", function(d, i) {
                layer.selectAll('rect')
                    .style('fill', (d, i) => {
                        let index = seriesKeys.indexOf(d.series);
                        return color(index);
                    });
            })
            .on('click', function(d, i) {
                let animation = props.selectedAnimation;
                animation.spec[selectingParameter.key] = d.data.x.toString();
                props.modifyChartAnimation(props.selectedAnimationIndex, animation);
                props.selectChartElement(false, {});
            })
        } else if (selectType === 'value') {
            // Select Value
            layer.selectAll('rect')
            .on("mouseover", function(d, i) {
                d3.select(this).style('fill', 'yellow');
            })
            .on("mouseout", function(d, i) {
                let index = seriesKeys.indexOf(d.series);
                d3.select(this).style('fill', color(index));
            })
            .on('click', function(d, i) {
                let animation = props.selectedAnimation;
                animation.spec[selectingParameter.key1] = d.series.toString();
                animation.spec[selectingParameter.key2] = d.data.x.toString();
                props.modifyChartAnimation(props.selectedAnimationIndex, animation);
                props.selectChartElement(false, {});
            })
        }

    } else {
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .style('stroke-width', '0')
            .attr("x", function (d) { return x(d[encoding.x.field]); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d[encoding.y.field]); })
            .attr("y", function (d) { return y(d[encoding.y.field]); })
            .style('fill', color(0));

        if (selectType === 'category') {
            // Select Value & Category
            svg.selectAll('rect')
            .on("mouseover", function(d, i) {
                d3.select(this).style('fill', 'yellow');
            })
            .on("mouseout", function(d, i) {
                d3.select(this).style('fill', color(0));
            })
            .on('click', function(d, i) {
                let animation = props.selectedAnimation;
                animation.spec.category = d[encoding.y.field].toString();
                props.modifyChartAnimation(props.selectedAnimationIndex, animation);
                props.selectChartElement(false, {});
            })
        }
    }

    // Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    svg.append("g").call(d3.axisLeft(y));

    return svg;
}

export default draw;