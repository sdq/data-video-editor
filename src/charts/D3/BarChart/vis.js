import * as d3 from 'd3';
import {getMinRows, getMaxRows} from './helper';
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (props) => {
    // console.log('draw')
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }

    // console.log(data);
    const margin = {top: 10, right: -10, bottom: 40, left: 40};
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // get encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding) || _.isEmpty(encoding.x) || _.isEmpty(encoding.y) ) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg;
    }

    // Process Data
    const data = props.data;
    //const data = getMaxRows(props.data, encoding);

    // X channel
    let x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d[encoding.x.field]; }))
            .padding(0.2);
    
    // Y channel
    let y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d[encoding.y.field]; })])
            .range([ height, 0]);

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .style('stroke-width','0')
        .attr("x", function(d) { return x(d[encoding.x.field]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[encoding.y.field]); }) 
        .attr("y", function(d) { return y(d[encoding.y.field]); })
        .attr("fill", "pink");

    // Color channel: Not necessary
    if ('color' in encoding) {
        let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        let color = colorScale.domain(data.map(function (d){ return d[encoding.color.field]; }));
        svg.selectAll("rect")
            .data(data)
            .attr("fill", function (d){ return color(d[encoding.color.field]); });
    }

    // Style
    const style = props.spec.style;
    if (!_.isEmpty(style)) {
        if (style.showAxisX) {
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style('stroke-width','1')
                .style("text-anchor", "end");
        }
        if (style.showAxisY) {
            svg.append("g").call(d3.axisLeft(y));
        }
    }

    return svg;
}

export default draw;