import * as d3 from 'd3';

const draw = (animation, props) => {
    const data = props.data;
    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content'),
        chartWidth = content.attr("chartWidth"),
        chartHeight = content.attr("chartHeight");
    let items = content.selectAll(".data-item");

    //because of hovering
    items.attr("stroke-width", 0);
    //because of datatrend
    svg.select(".chart").attr("opacity", 1);
    svg.selectAll(".temporal-content").remove();

    let superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
        formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };

    let xScale, axisX;
    
    if(animation.spec.from === "log"){
        xScale = d3.scaleLog()
            .base(Math.E)
            .domain(d3.extent(data.map(d=> parseFloat(d[encoding.x.field]))))
            .range([0, chartWidth])
            .nice();
        
        axisX = d3.axisBottom(xScale)
            .ticks(10)
            .tickPadding(5)
            .tickFormat(function(d) { return "e" + formatPower(Math.round(Math.log(d))); });;
    } else if(animation.spec.from === "linear"){
        xScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d=> parseFloat(d[encoding.x.field])))])//d3.extent(data.map(d=>d[encoding.x.field]))
            .range([0, chartWidth])
            .nice();

        axisX = d3.axisBottom(xScale)
            .ticks(10)
            .tickPadding(5);
    } else {//power
        xScale = d3.scalePow()
            .exponent(1.6)
            .domain([0, d3.max(data.map(d=> parseFloat(d[encoding.x.field])))])//d3.extent(data.map(d=>d[encoding.x.field]))
            .range([0, chartWidth])
            .nice();

        axisX = d3.axisBottom(xScale)
            .ticks(10)
            .tickPadding(5);
    }

    svg.select("g.axis_x")
        .call(axisX)
        .selectAll('line')
        .attr("opacity", 0.4)
        .attr("y2", -chartHeight)
        .attr("stroke-dasharray","5,5");
    items.attr("cx", d => xScale(d[encoding.x.field]));

    if(animation.spec.to === "log"){
        xScale = d3.scaleLog()
            .base(Math.E)
            .domain(d3.extent(data.map(d=> parseFloat(d[encoding.x.field]))))
            .range([0, chartWidth])
            .nice();
        
        axisX = d3.axisBottom(xScale)
            .ticks(10)
            .tickPadding(5)
            .tickFormat(function(d) { return "e" + formatPower(Math.round(Math.log(d))); });;
    } else if(animation.spec.to === "linear"){
        xScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d=> parseFloat(d[encoding.x.field])))])//d3.extent(data.map(d=>d[encoding.x.field]))
            .range([0, chartWidth])
            .nice();

        axisX = d3.axisBottom(xScale)
            .ticks(10)
            .tickPadding(5);
    } else {//power
        xScale = d3.scalePow()
            .exponent(1.6)
            .domain([0, d3.max(data.map(d=> parseFloat(d[encoding.x.field])))])//d3.extent(data.map(d=>d[encoding.x.field]))
            .range([0, chartWidth])
            .nice();

        axisX = d3.axisBottom(xScale)
            .ticks(10)
            .tickPadding(5);
    }

    svg.select("g.axis_x")
        .transition()
        .duration(animation.duration)
        .call(axisX)
        .selectAll('line')
        .attr("opacity", 0.4)
        .attr("y2", -chartHeight)
        .attr("stroke-dasharray","5,5");
    items.transition()
        .duration(animation.duration)
        .attr("cx", d => xScale(d[encoding.x.field]));
    return svg;
}

export default draw;