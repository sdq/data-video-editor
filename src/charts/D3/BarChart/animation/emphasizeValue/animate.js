import * as d3 from 'd3';
import { getStackedData, getAggregatedRows, getSeries, getCategories, getWidth } from '../../helper';
import _ from 'lodash';

const config = {
    "legend-text-color": "#666"
}
//const offset = 20; // To show whole chart

const draw = (animation, props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - 20;
    const height = props.height - margin.top - margin.bottom - 20 - 40;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 40)
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
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);

    // Process Data
    let data = props.data;
    let stackedData = [];
    if (hasSeries) {
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
    let layer;
    if (hasSeries) {
        layer = svg.selectAll('layer')
            .data(stackedData)
            .enter()
            .append('g')
            .attr('class', 'layer')
            .style('fill', (d, i) => color(i))

        layer.selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect')
            .attr('x', d => x(d.data.x))
            .attr('y', d => y(d[1]))
            .attr('height', d => y(d[0]) - y(d[1]))
            .attr('width', x.bandwidth() - 1)
            .style('stroke-width', '0')
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
            .attr("fill", color(0));
    }

    // Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    svg.append("g").call(d3.axisLeft(y));

    // Animation
    if (hasSeries) {
        let dataSeries = getSeries(props.data, encoding);
        let series = Object.keys(dataSeries);
        let selectedSeries = animation.spec.series ? animation.spec.series : series[0];
        let dataCategories = getCategories(props.data, encoding);
        let categories = Object.keys(dataCategories);
        let selectedCategory = animation.spec.category ? animation.spec.category : categories[0];
        if (animation.spec.effect === 'flicker') {
            // flicker animation
            layer.selectAll('rect')
                .data(d => {
                    if (d.key.toString() === selectedSeries) {
                        return d;
                    } else {
                        return [];
                    }
                })
                .transition()
                .duration(animation.duration / 3)
                .style("stroke", "yellow")
                .style("stroke-width", function (d, i) {
                    if (d.data.x.toString() === selectedCategory.toString()) {
                        return 5;
                    } else {
                        return 0;
                    }
                })
                .transition()
                .duration(animation.duration / 3)
                .style("stroke-width", 0)
                .transition()
                .duration(animation.duration / 3)
                .style("stroke-width", function (d, i) {
                    if (d.data.x.toString() === selectedCategory.toString()) {
                        return 5;
                    } else {
                        return 0;
                    }
                });
        } else {
            // filter animation
            layer.selectAll('rect')
                .data(d => {
                    if (d.key.toString() !== selectedSeries) {
                        return d;
                    } else {
                        return [];
                    }
                })
                .transition()
                .duration(animation.duration)
                .style("fill", (d, i) => {
                    return "lightgray";
                });
            layer.selectAll('rect')
                .data(d => {
                    if (d.key.toString() === selectedSeries) {
                        return d;
                    } else {
                        return [];
                    }
                })
                .transition()
                .duration(animation.duration)
                .style("fill", (d, i) => {
                    if (d.data.x.toString() !== selectedCategory.toString()) {
                        return "lightgray";
                    }
                })
                .style("stroke", "yellow")
                .style("stroke-width", function (d, i) {
                    if (d.data.x.toString() === selectedCategory.toString()) {
                        return 5;
                    } else {
                        return 0;
                    }
                });
        }
    }
    let dataSeries = [];
    let series = [];
    if (hasSeries) {
        dataSeries = getSeries(data, encoding);
        series = Object.keys(dataSeries);
    }
    // legend
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    // legend
    const legend = svg.append("g")
    //.attr("transform", `translate(0, ${height + 60})`);


    var legends = legend.selectAll("legend_color")
        .data(series)
        .enter()
        .append("g")
        .attr("class", "legend_color")
        .attr('transform', (d, i) => `translate(${-15}, 0)`);//i * (80 + 10) + (width - (categories.length * 80 + (categories.length - 1) * 10)) / 2

    legends.append("rect")
        .attr("fill", d => colorScale(d))
        .attr('x', 15)
        .attr('y', -10)
        .attr("width", '10px')
        .attr('height', '10px')
        .attr("rx", 1.5)
        .attr("ry", 1.5)
    // .attr("cy", -5);
    legends.append("text")
        .attr("fill", config["legend-text-color"])
        .attr("x", 35)
        .text(d => d);

    let legend_nodes = legends.nodes();
    let before = legend_nodes[0];
    let current;
    let offset = -15;

    for (let i = 1; i < legend_nodes.length; i++) {
        current = legend_nodes[i];
        if (d3.select(before).select("text").node().getComputedTextLength()) {
            offset += d3.select(before).select("text").node().getComputedTextLength();
        } else {
            offset += getWidth(series[i - 1])
        }
        //console.log("offset1", offset)
        d3.select(current)
            .attr('transform', `translate(${i * 30 + offset}, 0)`);
        before = current;
    }
    if (legend.node().getBBox().width) {
        legend.attr("transform", `translate(${(width - legend.node().getBBox().width) / 2}, ${height + 60})`);
    } else {
        offset += getWidth(series[series.length - 1]);
       // console.log("offset2", offset)
        legend.attr("transform", `translate(${(width - offset - 30 * series.length + 20) / 2}, ${height + 60})`);
    }
    return svg;
}

export default draw;