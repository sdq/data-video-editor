import * as d3 from 'd3';
import { getCategories, getAggregatedRows } from './helper';
import _ from 'lodash';

const offset = 20;

const draw = (props) => {
    // TODO: Get selecting parameter
    // let selectingParameter = props.selectingParameter;
    // let selectType = selectingParameter.type;

    // TODO: modify chart animation
    // props.modifyChartAnimation(props.selectedAnimationIndex, animation);

    // TODO: unselect
    // props.selectChartElement(false, {});
    
    //console.log(props.selectingParameter);
    let selectingParameter = props.selectingParameter;
    let selectType = selectingParameter.type;
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-proportionchart > *').remove();
        a = '.vis-proportionchart';
    }

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get Encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('size' in encoding) || !('color' in encoding) || _.isEmpty(encoding.size) || _.isEmpty(encoding.color) ) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg;
    }

    // Process Data
    let data = props.data;

    // Get categories
    let dataCategories = getCategories(data, encoding);
    let categories = Object.keys(dataCategories);
    // for (var i=0;i<categories.length;i++){
    //     var c=categories[i];
    //     var s=encoding.size.field;
    // }

    data = getAggregatedRows(data, encoding);

    const chartWidth = width,
        chartHight = height - 60;

    let content = svg.append("g")
            .attr("class","content")
            .attr("width",chartWidth)
            .attr("height", chartHight),
        legend = svg.append("g")
            .attr("transform",`translate(0, ${chartHight + 60})`);

    //Size channels
    let size = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){ 
                    return Math.sqrt(d[encoding.size.field]/Math.PI); })])
                .range([ 0 , chartWidth/(categories.length*2.5) ]);

    // Color channel
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let color = colorScale.domain(data.map(function (d){ 
            return d[encoding.color.field]; }));
    
    
    // Draw Circles  
    let proportionAreas = content
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style('stroke-width','0')
        .attr("class", "data-item")
        .attr("size", function(d) { return d[encoding.size.field]; })
        .attr("color", function(d) { return d[encoding.color.field]; })
        .attr("r", function(d) { return size(Math.sqrt(d[encoding.size.field]/Math.PI)); })
        .attr("cx", function(d) {
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field] === categories[i]){
                    return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                }
            }
        })
        .attr("cy", chartHight/2);
    //Color 
    proportionAreas.attr("fill", d => color(d[encoding.color.field]));

    var legends = legend.selectAll("legend_color")
                .data(data)
                .enter().append("g")
                .attr("class", "legend_color")
                .attr('transform', (d, i) =>`translate(${i * 80 + (chartWidth - 80 * (categories.length))/2}, 0)`);


    legends.append("rect")
                .attr("fill", d => color(d[encoding.color.field]))
                .attr("width", 10)
                .attr("height", 10)
                .attr("y",-15);
                // .attr("r", 6)
                // .attr("cy", -5);

    legends.append("text")
                .attr("x", 12)
                .attr("y",-5)
                .text(d => d[encoding.color.field]);

    //Select
    if (selectType === 'value') {
        // Select Value
        content.selectAll('circle')
        .on("mouseover", function(d, i) {
            d3.select(this).style('fill', 'yellow');
        })
        .on("mouseout", function(d, i) {
            d3.select(this).style('fill', color(d[encoding.color.field]));
        })
        .on('click', function(d, i) {
            let animation = props.selectedAnimation;
            animation.spec[selectingParameter.key2] = d[encoding.color.field];
            //console.log(selectingParameter);
            props.modifyChartAnimation(props.selectedAnimationIndex, animation);
            props.selectChartElement(false, {});
        })
    }


}

export default draw;