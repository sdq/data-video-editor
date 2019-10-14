import * as d3 from 'd3';
import canvg from 'canvg';
import './style.css';

const fakeWidth = 400;
const fakeHeight = 400;

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
    const margin = {top: 10, right: 30, bottom: 10, left: 30};
    const width = fakeWidth - margin.left - margin.right;
    const height = fakeHeight - margin.top - margin.bottom;
    let svg = d3.select(a).append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
        d.age = +d.age;
    });

    // Scale the range of the data in the domains
    let x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
    let y = d3.scaleLinear()
          .range([height, 0]);
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.age; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.age); })
        .attr("height", function(d) { return height - y(d.age); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // console.log(svg.node());

    if (props.onCanvas) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var source = svg.node().parentNode.innerHTML;
        canvg(canvas, source);

        return canvas.toDataURL('image/png');
    } else {
        return svg.node().parentNode.innerHTML;
    }
}

export default draw;