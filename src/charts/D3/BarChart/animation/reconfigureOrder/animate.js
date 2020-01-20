import * as d3 from 'd3';
import { getAggregatedRows, getStackedData, getSeries } from '../../helper';
import _ from 'lodash';

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
        let originPosition = _.cloneDeep(stackedData[0].map(function (d) { return x(d.data.x) }));
        let selectedSeries = animation.spec.series;
        let newX;
        if (selectedSeries === "") {
            // sort all
            let data = stackedData[stackedData.length - 1];
            if (animation.spec.order === 'ascending') {
                newX = data.sort(function (a, b) { return a[1] - b[1]; }).map(function (d) { return d.data.x; })
            } else {
                newX = data.sort(function (a, b) { return b[1] - a[1]; }).map(function (d) { return d.data.x; })
            }
        } else {
            let data = stackedData[stackedData.length - 1];
            stackedData.forEach(d => {
                if (d.key === selectedSeries) {
                    data = d;
                }
            });
            if (animation.spec.order === 'ascending') {
                newX = data.sort(function (a, b) { return (a[1] - a[0]) - (b[1] - b[0]); }).map(function (d) { return d.data.x; })
            } else {
                newX = data.sort(function (a, b) { return (b[1] - b[0]) - (a[1] - a[0]); }).map(function (d) { return d.data.x; })
            }
        }
        x.domain(newX);
        layer.selectAll("rect")
            .transition()
            .duration(animation.duration)
            .delay(function (d, i) { return i * 50; })
            .attr("transform", function (d, i) {
                let offset = x(d.data.x) - originPosition[i];
                return "translate(" + offset + ",0)";
            });

    } else {
        let originPosition = _.cloneDeep(data.map(function (d) { return x(d[encoding.x.field]); }))
        let newX;
        if (animation.spec.order === 'ascending') {
            newX = data.sort(function (a, b) { return a[encoding.y.field] - b[encoding.y.field]; }).map(function (d) { return d[encoding.x.field]; })
        } else {
            newX = data.sort(function (a, b) { return b[encoding.y.field] - a[encoding.y.field]; }).map(function (d) { return d[encoding.x.field]; })
        }
        x.domain(newX);
        svg.selectAll("rect")
            .transition()
            .duration(animation.duration)
            .delay(function (d, i) { return i * 50; })
            .attr("transform", function (d, i) {
                let offset = x(d[encoding.x.field]) - originPosition[i];
                return "translate(" + offset + ",0)";
            });
    }
    let dataSeries = [];
    let series = [];
    if (hasSeries) {
        dataSeries = getSeries(data, encoding);
        series = Object.keys(dataSeries);
    }
    // legend
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const legend = svg.append("g")
        .attr("transform", `translate(0, ${height + 60})`);
    var legends = legend.selectAll("legend_color")
        .data(series)
        .enter()
        .append("g")
        .attr("class", "legend_color")
        .attr('transform', (d, i) => `translate(${i * (80 + 10) + (width - (series.length * 80 + (series.length - 1) * 10)) / 2}, 0)`);
    legends.append("rect")
        .attr("fill", d => colorScale(d))
        .attr('y', -9)
        .attr("width", '10px')
        .attr('height', '10px')
        .attr("rx", 1.5)
        .attr("ry", 1.5)
    // .attr("cy", -5);
    legends.append("text")
        .attr("fill", 'black')
        .attr("x", 15)
        .text(d => d);
    return svg;
}

export default draw;