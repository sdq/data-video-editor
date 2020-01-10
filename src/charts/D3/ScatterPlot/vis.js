import * as d3 from 'd3';
import { getSeries } from './helper';
import _ from 'lodash';

const offset = 20; 

const config = {
    "legend-text-color": "#666"
}

const draw = (props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-scatterplot > *').remove();
        a = '.vis-scatterplot';
    }

    const margin = {top: 10, right: 10, bottom: 60, left: 60};
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    let svg = d3.select(a)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append('g')
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get Encoding
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

    // Encoding
    const chartWidth = width,
        chartHeight = height - 60;//plus legend height
    
    svg.append('defs')
        .append('clipPath')
        .attr("id", 'clip-rect')
        .append('rect')
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    let chart = svg.append("g").attr("class", "chart"),
        axis = chart.append("g")
            .attr("class", "axis"),
        content = chart.append("g")
            .attr("class", "content")
            .attr("chartWidth", chartWidth)
            .attr("chartHeight", chartHeight)
            .attr("clip-path", "url(#clip-rect)"),
        legend = svg.append("g")
            .attr("transform", `translate(0, ${chartHeight + 60})`);

    // X channel
    const xScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => parseFloat(d[encoding.x.field])))])//d3.extent(data.map(d=>d[encoding.x.field]))
            .range([0, chartWidth])
            .nice();
    // Y channel
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => parseFloat(d[encoding.y.field])))])//d3.extent(data.map(d=>d[encoding.y.field]))
        .range([chartHeight, 0])
        .nice();

    let axisX = d3.axisBottom(xScale)
        .ticks(10)
        .tickPadding(5);

    let axisY = d3.axisLeft(yScale)
        .ticks(10)
        .tickPadding(5);

    let axis_x = axis.append("g")
        .attr("class", "axis_x")
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(axisX);

    let axis_y = axis.append("g")
        .attr("class", "axis_y")
        .call(axisY);
    
    /* draw points */
    let points = content.append("g")
        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "data-item")
        .attr("r", 8)//size
        .attr("stroke", "#FFF")
        .attr("stroke-width", 0)
        .attr("fill-opacity", 0.5)
        .attr("cx", d => xScale(d[encoding.x.field]))
        .attr("cy", d => yScale(d[encoding.y.field]));
    
    //Color channel
    if(('color' in encoding) && !_.isEmpty(encoding.color)){
        if(encoding.color.type === "quantitative"){
            // const colorLinear = ["LightBlue", "Blue"];

            // let color = d3.interpolate(d3.rgb(colorLinear[0]), d3.rgb(colorLinear[1]));
            // let extent = d3.extent(data, d=>d[encoding.color.field]);
            // let linear = d3.scaleLinear()
            //     .domain(extent)
            //     .range([0, 1]);
            // points.attr("fill", d => color(linear(d[encoding.color.field])));

            // /** show legend **/
            // const gradientW = 100,
            //     gradientH = 10;

            // let linearLegend = legend.append("g")
            //     .attr('transform', `translate(${(chartWidth - gradientW) / 2}, 0)`);

            // let defs = linearLegend.append('defs');
            // let linearGradient = defs.append('linearGradient')
            //     .attr('id', 'linearColor')
            //     .attr('x1', '0%')
            //     .attr('y1', '0%')
            //     .attr('x2', '100%')
            //     .attr('y2', '0%');
            // linearGradient.append('stop')
            //     .attr('offset', '0%')
            //     .style('stop-color', colorLinear[0]);
            // linearGradient.append('stop')
            //     .attr('offset', '100%')
            //     .style('stop-color', colorLinear[1]);
            // linearLegend.append('rect')
            //     .attr('width', gradientW)
            //     .attr('height', gradientH)
            //     .attr("opacity", 0.8)
            //     .style('fill', 'url(#' + linearGradient.attr('id') + ')');
            // linearLegend.append('text')
            //     .attr('class', 'valueText')
            //     .attr('dy', '-0.4em')
            //     .style('fill', config["legend-text-color"])
            //     .style('text-anchor', "middle")
            //     .text(extent[0]);
            // linearLegend.append('text')
            //     .attr('class', 'valueText')
            //     .attr('x', gradientW)
            //     .attr('dy', '-0.4em')
            //     .style('fill', config["legend-text-color"])
            //     .style('text-anchor', "middle")
            //     .text(extent[1]);
        }else{
            points.attr("fill", d => color(d[encoding.color.field]));
            
            /** show legend **/
            var colorSet = getSeries(data, encoding);
            var legends = legend.selectAll("legend_color")
                .data(colorSet)
                .enter().append("g")
                .attr("class", "legend_color")
                .attr('transform', (d, i) =>`translate(${i * 80 + (chartWidth - 80 * colorSet.length)/2}, 0)`);
            legends.append("circle")
                .attr("fill", d => color(d))
                .attr("r", 6)
                .attr("cy", -5);
            legends.append("text")
                .attr("fill", config["legend-text-color"])
                .attr("x", 12)
                .text(d => d);
        }
    }else{
        points.attr("fill", color(0))//color
    }

    //Size channel
    if(('size' in encoding) && !_.isEmpty(encoding.size)){
        let size = d3.scaleLinear()
            .domain(d3.extent(data, d=>d[encoding.size.field]))
            .range([6, 10]);
        points.attr("r", d => size(d[encoding.size.field]));
    }

    // Style
    // const style = props.spec.style;
    axis_x.selectAll('line')
        .attr("opacity", 0.4)
        .attr("y2", -chartHeight)
        .attr("stroke-dasharray","5,5");

    axis_y.select('path')
        .attr("opacity", 0.4)
        .attr("stroke-dasharray","5,5");
    axis_y.selectAll('line')
        .attr("opacity", 0.4)
        .attr("x2", chartWidth)
        .attr("stroke-dasharray","5,5");

    return svg;
}

export default draw;