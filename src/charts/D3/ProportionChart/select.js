import * as d3 from 'd3';
import { getCategories, getAggregatedRows, getSize, getWidth} from './helper';
import _ from 'lodash';

const offset = 20;

const config = {
    "legend-text-color": "#666"
}

const draw = (props) => {
    // TODO: Get selecting parameter
    // let selectingParameter = props.selectingParameter;
    // let selectType = selectingParameter.type;

    // TODO: modify chart animation
    // props.modifyChartAnimation(props.selectedAnimationIndex, animation);

    // TODO: unselect
    // props.selectChartElement(false, {});
    
    // console.log(props.selectingParameter);
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
    let dataSize = getSize(data, encoding);
    let sizes = Object.keys(dataSize);

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
            var inner = 0;
            for (var j=0; j<categories.length; j++){
                inner = inner + size(Math.sqrt(sizes[j]/Math.PI));
            }
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field].toString() === categories[i]){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all=0;
                    var space = 15;
                    for(var t=0; t<i; t++){
                        size_all = size_all + 2*size(Math.sqrt(sizes[t]/Math.PI));
                        if (t>=0){
                            size_all = size_all + space;
                        }
                    } 
                    size_all = size_all + size(Math.sqrt(sizes[i]/Math.PI))
                    return size_all + (chartWidth - 2*inner - space*(categories.length-1))/2;
                }
            }
        })
        .attr("cy", chartHight/2);
    //Color 
    proportionAreas.attr("fill", d => color(d[encoding.color.field]));

    var colorSet = categories;
    var legends = legend.selectAll("legend_color")
        .data(colorSet)
        .enter().append("g")
        .attr("class", "legend_color")
        .attr('transform', (d, i) => `translate(${10}, 0)`); //i * 80 + (chartWidth - 80 * colorSet.length)/2

    legends.append("rect")
        .attr("fill", d => color(d))
        .attr('x', -5)
        .attr('y', -10)
        .attr("width", '10px')
        .attr('height', '10px')
        .attr("rx", 1.5)
        .attr("ry", 1.5);

    legends.append("text")
        .attr("fill", config["legend-text-color"])
        .attr("x", 10)
        .text(d => d)
        .style('font-family', 'Arial');
    let legend_nodes = legends.nodes();
    let before = legend_nodes[0];
    let current;
    let offset1 = 10;

    for (let i = 1; i < legend_nodes.length; i++) {
        current = legend_nodes[i];
        if (d3.select(before).select("text").node().getComputedTextLength()) {
            offset1 += d3.select(before).select("text").node().getComputedTextLength();
        } else {
            offset1 += getWidth(colorSet[i - 1])
        }
        d3.select(current)
            .attr('transform', `translate(${i*30 + offset1}, 0)`);
        before = current;
    }
    if (legend.node().getBBox().width) {
        legend.attr("transform", `translate(${(chartWidth - legend.node().getBBox().width)/2}, ${chartHight + 60})`);
    } else {
        offset1 += getWidth(colorSet[colorSet.length - 1]);
        legend.attr("transform", `translate(${(chartWidth - offset1 - 30 * colorSet.length + 20)/2}, ${chartHight + 60})`);
    }

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
            // console.log(selectingParameter);
            props.modifyChartAnimation(props.selectedAnimationIndex, animation);
            props.selectChartElement(false, {});
        })
    }


}

export default draw;