import * as d3 from 'd3';

const draw = (animation, props) => {
    
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

    let xScale,axisX,yScale,axisY;
    if(animation.spec.rangeX || animation.spec.rangeY){
        xScale = d3.scaleLinear()
            .domain(animation.spec.rangeX)
            .range([0, chartWidth])
            .nice();

        axisX = d3.axisBottom(xScale)
            .ticks(10)
            .tickPadding(5);

        yScale = d3.scaleLinear()
            .domain(animation.spec.rangeY)
            .range([chartHeight, 0])
            .nice();

        axisY = d3.axisLeft(yScale)
            .ticks(10)
            .tickPadding(5);

        svg.select("g.axis_x")
            .transition()
            .duration(animation.duration)
            .call(axisX)
            .selectAll('line')
            .attr("opacity", 0.4)
            .attr("y2", -chartHeight)
            .attr("stroke-dasharray","5,5");

        svg.select("g.axis_y")
            .transition()
            .duration(animation.duration)
            .call(axisY)
            .selectAll('line')
            .attr("opacity", 0.4)
            .attr("x2", chartWidth)
            .attr("stroke-dasharray","5,5");

        items.transition()
            .duration(animation.duration)
            .attr("cx", d => xScale(d[encoding.x.field]))
            .attr("cy", d => yScale(d[encoding.y.field]));
    }

    return svg;
}

export default draw;