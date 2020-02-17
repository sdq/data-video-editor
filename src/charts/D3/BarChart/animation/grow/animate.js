import * as d3 from 'd3';
import { getMaxRows, getWidth } from '../../helper';
import _ from 'lodash';

const config = {
    "legend-text-color": "#666"
}
const offset = 20; // To show whole chart

const draw = (animation, props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset - 40;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 40)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // get encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg.node().parentNode.innerHTML;
    }

    // Process Data
    //const data = props.data;
    const data = getMaxRows(props.data, encoding);

    // X channel
    let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .padding(0.2);

    // Y channel
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })])
        .range([height, 0]);

    // Color channel
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let color = colorScale.domain(data.map(function (d) { return d[encoding.color.field]; }));

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d[encoding.x.field]); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d[encoding.y.field]); })
        .attr("height", function (d) { return height - y(d[encoding.y.field]); })
        .attr("fill", function (d) { return color(d[encoding.color.field]); });

    // Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    svg.append("g").call(d3.axisLeft(y));

    // Animation
    svg.selectAll("rect")
        .attr("y", function (d) { return y(0); })
        .attr("height", function (d) { return height - y(0); })
        .transition()
        .duration(800)
        .attr("y", function (d) { return y(d[encoding.y.field]); })
        .attr("height", function (d) { return height - y(d[encoding.y.field]); })
        .delay(function (d, i) { return (i * 600) })

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
}

export default draw;