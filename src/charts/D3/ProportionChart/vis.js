import * as d3 from 'd3';
import {
    getCategories,
    getAggregatedRows,
    getSize,
    getWidth
} from './helper';
import _ from 'lodash';

const offset = 20;

const config = {
    "legend-text-color": "#666"
}

const draw = (props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-proportionchart > *').remove();
        a = '.vis-proportionchart';
    }

    const margin = {
        top: 10,
        right: 10,
        bottom: 40,
        left: 40
    };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Encoding
    // Get Encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('size' in encoding) || !('color' in encoding) || _.isEmpty(encoding.size) || _.isEmpty(encoding.color)) {
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
        .attr("class", "content")
        .attr("width", chartWidth)
        .attr("height", chartHight),
        legend = svg.append("g")
        .attr("transform", `translate(0, ${chartHight + 60})`);


    //Size channels
    let size = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return Math.sqrt(d[encoding.size.field] / Math.PI);
        })])
        .range([0, chartWidth / (categories.length * 2.5)]);
    // .range([ 0 , chartHight/6 ]);




    // //x
    // let x = d3.scaleBand()
    //         .range([ 75, chartWidth ])
    //         .domain(data.map(function(d) { return d[encoding.color.field]; }))
    //         .padding(0);


    // Color channel
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let color = colorScale.domain(data.map(function (d) {
        return d[encoding.color.field];
    }));

    // Draw Circles  
    let proportionAreas = content
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style('stroke-width', '0')
        .attr("class", "data-item")
        .attr("size", function (d) {
            return d[encoding.size.field];
        })
        .attr("color", function (d) {
            return d[encoding.color.field];
        })
        .attr("r", function (d) {
            return size(Math.sqrt(d[encoding.size.field] / Math.PI));
        })
        .attr("cx", function (d) {
            var inner = 0;
            for (var j = 0; j < categories.length; j++) {
                inner = inner + size(Math.sqrt(sizes[j] / Math.PI));
            }
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field].toString() === categories[i]) {
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all = 0;
                    var space = 15;
                    for (var t = 0; t < i; t++) {
                        size_all = size_all + 2 * size(Math.sqrt(sizes[t] / Math.PI));
                        if (t >= 0) {
                            size_all = size_all + space;
                        }
                    }
                    size_all = size_all + size(Math.sqrt(sizes[i] / Math.PI))
                    return size_all + (chartWidth - 2 * inner - space * (categories.length - 1)) / 2;
                }
            }
        })
        .attr("cy", chartHight / 2);
    // .attr('transform', (d, i) =>`translate(${i * chartHight/3 + (chartWidth - chartHight/3 * (categories.length-1))/2}, 0)`);
    // .attr('transform', (d, i) =>`translate(${i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2}, 0)`);

    // svg.selectAll(".circle")
    //     .data(data)
    //     .enter()
    //     .append("circle")
    //     .style('stroke-width','0')
    //     .attr("size", function(d) { return d[encoding.size.field]; })
    //     .attr("color", function(d) { return d[encoding.color.field]; })
    //     // .attr("r", function(d) { return Math.sqrt( size(d[encoding.size.field]) / Math.PI ); })
    //     .attr("r", function(d) { return size(Math.sqrt(d[encoding.size.field]/Math.PI)); })
    //     .attr("cx", function(d) {return x(d[encoding.color.field]); })
    //     .attr("cy", height/2)

    //Fill Color 

    // svg.selectAll("circle")
    //     .data(data)
    //     .attr("fill", function (d){ return color(d[encoding.color.field]); });

    proportionAreas.attr("fill", d => color(d[encoding.color.field]));

    var text = content.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("align", "center")
        .attr("dy", function (d) {
            return chartHight / 2 - size(Math.sqrt(d[encoding.size.field] / Math.PI)) - 20
        })
        .attr("dx", function (d) {
            // for (var i=0; i<categories.length; i++){
            //     if(selectedCategory.toString() === categories[i]){
            //         return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2 - chartWidth/(categories.length*2.5*3);
            //     }
            // }
            var inner = 0;
            for (var j = 0; j < categories.length; j++) {
                inner = inner + size(Math.sqrt(sizes[j] / Math.PI));
            }
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field].toString() === categories[i]) {
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all = 0;
                    var space = 15;
                    for (var t = 0; t < i; t++) {
                        size_all = size_all + 2 * size(Math.sqrt(sizes[t] / Math.PI));
                        if (t >= 0) {
                            size_all = size_all + space;
                        }
                    }
                    size_all = size_all + size(Math.sqrt(sizes[i] / Math.PI))
                    // return size_all + (chartWidth - 2 * inner - space * (categories.length - 1) * 2.7) / 2;
                    return size_all + (chartWidth - 2 * inner - space * (categories.length - 1)) / 2;
                }
            }
        })
        .text(function (d) {
            return parseFloat(d[encoding.size.field]).toFixed(2);
            // return animation.spec.value.toFixed(2);
        });

        var offset_t;
        var dif = 10;
        if(text.node().getComputedTextLength()){
            offset_t = text.node().getComputedTextLength();
            text.attr('transform', `translate(${-((offset_t)/2)}, 0)`);
        }else{
            offset_t = getWidth(parseFloat(sizes[0]).toFixed(2).toString());
            text.attr('transform', `translate(${-((offset_t + dif)/2)}, 0)`);
        } 

        
    // text.attr('transform', `translate(${-((offset_t)/2)}, 0)`);

    

    //Show Legend
    // var dataCategories = getCategories(data, encoding);
    // var legends = legend.selectAll("legend_color")
    //             .data(data)
    //             .enter().append("g")
    //             .attr("class", "legend_color")
    //             // .attr('transform', (d, i) =>`translate(${i * 80 + (chartWidth - 80 * (categories.length))/2}, 0)`);
    //             // .attr('transform',(d,i) => `translate(${i*70 + (i-1)*10 +(chartWidth-categories.length*70-(categories.length-1)*10)/2},0)`);
    //             .attr('transform', (d, i) =>`translate(${i*(80 + 10) + (chartWidth - (categories.length * 80 + (categories.length - 1) * 10)) / 2}, 0)`);
    //             // .attr('transform',(d) => `translate(${(chartWidth-categories.length*70-(categories.length-1)*10)/2},0)`);


    // legends.append("rect")
    //             .attr("fill", d => color(d[encoding.color.field]))
    //             // .attr("width", 10)
    //             // .attr("height", 10)
    //             // .attr("y",-15);
    //             // // .attr("r", 6)
    //             // // .attr("cy", -5);
    //             .attr('x', 15)
    //             .attr('y', -10)
    //             .attr("width", '10px')
    //             .attr('height', '10px')
    //             .attr("rx", 1.5)
    //             .attr("ry", 1.5);


    // legends.append("text")
    //             // .attr("x", 12)
    //             // .attr("y",-5)
    //             .attr("fill", 'black')
    //             .attr("x", 35)
    //             .text(d => d[encoding.color.field]);


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


    // Style
    // const style = props.spec.style;

    return svg;
}

export default draw;