import * as d3 from 'd3';
import { getStackedData, getSeries, getAggregatedRows, getWidth } from './helper';
import _ from 'lodash';

const config = {
    "legend-text-color": "#666"
}
//const offset = 20; // To show whole chart

const draw = (props) => {
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
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);;

    // Process Data
    let data = props.data;
    let stackedData = [];
    let dataSeries = [];
    let series = [];
    if (hasSeries) {
        dataSeries = getSeries(data, encoding);
        stackedData = getStackedData(data, encoding);
        series = Object.keys(dataSeries);
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
        let n = series.length;
        let layer = svg.selectAll('layer')
            .data(stackedData)
            .enter()
            .append('g')
            .attr('class', 'layer')
            .style('fill', (d, i) => color(i))

        let rect = layer.selectAll('rect')
            .data(d => {
                return d.map(x => {
                    x.series = d.key.toString();
                    return x;
                });
            })
            .enter()
            .append('rect');

        let style = props.spec.style;
        if (style.layout === "stacked") {
            y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice();
            rect.style('stroke-width', '0')
                .attr('x', d => x(d.data.x))
                .attr('width', x.bandwidth() - 1)
                .attr('y', d => y(d[1]))
                .attr('height', d => y(d[0]) - y(d[1]));
        } else if (style.layout === "percent") {
            let totalDict = {};
            stackedData[stackedData.length - 1].forEach(d => {
                totalDict[d.data.x] = d[1];
            });
            y.domain([0, 1]);
            rect.style('stroke-width', '0')
                .attr('x', d => x(d.data.x))
                .attr('width', x.bandwidth() - 1)
                .attr('y', d => {
                    let total = totalDict[d.data.x];
                    return y(d[1] / total);
                })
                .attr('height', d => {
                    let total = totalDict[d.data.x];
                    return y(d[0] / total) - y(d[1] / total);
                });
        } else {
            // grouped
            let max = 0;
            stackedData.forEach(ds => {
                ds.forEach(d => {
                    if ((d[1] - d[0]) > max) {
                        max = d[1] - d[0];
                    }
                });
            });
            y.domain([0, max]).nice();
            rect.style('stroke-width', '0')
                .attr('x', d => {
                    return x(d.data.x) + (x.bandwidth() - 1) / n * series.indexOf(d.series);
                })
                .attr('width', (x.bandwidth() - 1) / n)
                .attr('y', d => {
                    return y(0) - (y(d[0]) - y(d[1]))
                })
                .attr('height', d => y(d[0]) - y(d[1]))
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
    }

    // Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    svg.append("g").call(d3.axisLeft(y));

    // legend
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    // legend
    const legend = svg.append("g")
    //.attr("transform", `translate(0, ${height + 60})`);

    //console.log("series",series)
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