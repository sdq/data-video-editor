import * as d3 from 'd3';
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (props) => {
    // console.log('draw')
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }
    const data = props.data;
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
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg.node().parentNode.innerHTML;
    }

    // X axis
    let x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d[encoding.x.field]; }))
            .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    // Y axis
    let y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d[encoding.y.field]; })])
            .range([ height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d[encoding.x.field]); })
        .attr("width", x.bandwidth())
        .attr("fill", "pink")
        .attr("height", function(d) { return height - y(d[encoding.y.field]); }) 
        .attr("y", function(d) { return y(d[encoding.y.field]); });

    return svg.node().parentNode.innerHTML;
}

export default draw;