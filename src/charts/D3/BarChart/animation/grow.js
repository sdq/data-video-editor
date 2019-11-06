import * as d3 from 'd3';
import {getMinRows, getMaxRows} from '../helper';
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }

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

    // Process Data
    //const data = props.data;
    const data = getMaxRows(props.data, encoding);

    // X channel
    let x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d[encoding.x.field]; }))
            .padding(0.2);
    
    // Y channel
    let y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d[encoding.y.field]; })])
            .range([ height, 0]);

    // Color channel
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let color = colorScale.domain(data.map(function (d){ return d[encoding.color.field]; }));

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d[encoding.x.field]); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d[encoding.y.field]); })
        .attr("height", function(d) { return height - y(d[encoding.y.field]); })
        .attr("fill", function (d){ return color(d[encoding.color.field]); });

    // Style Configure
    const configure = props.spec.configure;
    if (!_.isEmpty(configure)) {
        if (configure.showAxisX) {
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
        }
        if (configure.showAxisY) {
            svg.append("g").call(d3.axisLeft(y));
        }
    }

    // Animation
    svg.selectAll("rect")
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); }) 
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d[encoding.y.field]); })
        .attr("height", function(d) { return height - y(d[encoding.y.field]); })
        .delay(function(d,i){ return(i*600)} )
}

export default draw;