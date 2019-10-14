import * as d3 from 'd3';
import './style.css';

const offset = 20; // To show whole chart

// const defaultSpec = {
//     "type": "barchart",
//     "encoding": {
//         "x": {},
//         "y": {}
//     }
// }

const draw = (props) => {
    // console.log('draw')
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }
    const data = props.demodata;
    // console.log(data);
    const margin = {top: 10, right: 0, bottom: 10, left: 30};
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
        d.age = +d.age;
    });

    // X axis
    let x = d3.scaleBand()
                .range([ 0, width ])
                .domain(data.map(function(d) { return d.name; }))
                .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    let y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return d.age; })])
                .range([ height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        .attr("height", function(d) { return height - y(d.age); }) 
        .attr("y", function(d) { return y(d.age); });

    return svg.node().parentNode.innerHTML;
}

export default draw;