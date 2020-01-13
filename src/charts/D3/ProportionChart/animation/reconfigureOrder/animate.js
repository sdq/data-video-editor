import * as d3 from 'd3';
import {
    getAggregatedRows,
    getCategories
} from '../../helper';
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (animation, props) => {
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

    data = getAggregatedRows(data, encoding);

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
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field] === categories[i]) {
                    return i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
                }
            }
        })
        .attr("cy", chartHight / 2);

    proportionAreas.attr("fill", d => color(d[encoding.color.field]));

    //Show Legend
    // var dataCategories = getCategories(data, encoding);
    var legends = legend.selectAll("legend_color")
        .data(data)
        .enter().append("g")
        .attr("class", "legend_color")
        .attr('transform', (d, i) => `translate(${i * 80 + (chartWidth - 80 * (categories.length))/2}, 0)`);


    legends.append("rect")
        .attr("fill", d => color(d[encoding.color.field]))
        .attr("width", 10)
        .attr("height", 10)
        .attr("y", -15);
    // .attr("r", 6)
    // .attr("cy", -5);

    legends.append("text")
        .attr("x", 12)
        .attr("y", -5)
        .text(d => d[encoding.color.field]);

    // Animation
    // let originPosition = _.cloneDeep(data[0].map(function (d) {
    //     return d[encoding.color.field]
    // }));
    // let newX;
    // let odata = data[data.length - 1];
    // if (animation.spec.order === 'ascending') {
    //     newX = odata.sort(function (a, b) {
    //         return a[1] - b[1];
    //     }).map(function (d) {
    //         return d.data.x;
    //     })
    // } else {
    //     newX = odata.sort(function (a, b) {
    //         return b[1] - a[1];
    //     }).map(function (d) {
    //         return d.data.x;
    //     })
    // }

    // let originPosition = _.cloneDeep(data.map(function (d) {
    //     return d[encoding.color.field]
    // }));
    let newX;
    if (animation.spec.order === 'ascending') {
        newX = data.sort(function (a, b) {
            return a[encoding.size.field] - b[encoding.size.field];
        }).map(function (d) {
            return d[encoding.color.field];
        })
    } else {
        newX = data.sort(function (a, b) {
            return b[encoding.size.field] - a[encoding.size.field];
        }).map(function (d) {
            return d[encoding.color.field];
        })
    }
    //console.log(newX);

    if (animation.spec.effect === 'switch'){
        svg.selectAll("circle")
        .transition()
        .duration(animation.duration)
        .delay(function (d, i) {
            return i * 50;
        })
        .attr("cx", function (d) {
            for (var i = 0; i < newX.length; i++) {
                if (d[encoding.color.field] === newX[i]) {
                    return i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
                }
            }
        })
    }
    else if (animation.spec.effect === 'pull'){
        svg.selectAll("circle")
        .transition()
        .duration(animation.duration/3)
        .ease(d3.easeLinear)
        .delay(function (d, i) {
            return i * 0;
        })
        .attr("cy", function (d){
            var start,end;
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field] === categories[i]) {
                    start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
                }
            }
            for (i = 0; i < newX.length; i++) {
                if (d[encoding.color.field] === newX[i]) {
                    end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
                }
            }
            if (start < end){
                return chartHight/2 -((end - start) * Math.sqrt(3)) / 4;
            }
            else if (start > end){
                return chartHight/2 +((start - end) * Math.sqrt(3)) / 4;
            }
            else{
                return chartHight / 2;
            }
            
        })
        .attr("cx", function (d) {
            var start,end;
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field] === categories[i]) {
                    start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
                }
            }
            for (i = 0; i < newX.length; i++) {
                if (d[encoding.color.field] === newX[i]) {
                    end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
                }
            }
            return (3*start + end)/4;
        })
        .transition()
        .duration(animation.duration/6)
        .ease(d3.easeLinear)
        .delay(function (d, i) {
            return i * 0;
        })
        .attr("cy", function (d){
            var start,end;
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field] === categories[i]) {
                    start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
                }
            }
            for (i = 0; i < newX.length; i++) {
                if (d[encoding.color.field] === newX[i]) {
                    end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
                }
            }
            if (start < end){
                // return chartHight / 4;
                return chartHight / 2 - (end - start) /2;
            }
            else if (start > end){
                // return (chartHight *3) / 4;
                return chartHight / 2 + (start - end) /2;
            }
            else{
                return chartHight / 2;
            }
            
        })
        .attr("cx", function (d) {
            var start,end;
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field] === categories[i]) {
                    start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
                }
            }
            for (i = 0; i < newX.length; i++) {
                if (d[encoding.color.field] === newX[i]) {
                    end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
                }
            }
            return (start + end)/2;
        })
        .transition()
        .duration(animation.duration/6)
        .ease(d3.easeLinear)
        .delay(function (d, i) {
            return i * 0;
        })
        .attr("cy", function (d){
            var start,end;
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field] === categories[i]) {
                    start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
                }
            }
            for (i = 0; i < newX.length; i++) {
                if (d[encoding.color.field] === newX[i]) {
                    end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
                }
            }
            if (start < end){
                // return (chartHight * (4-Math.sqrt(3))) / 8;
                return chartHight/2 -((end - start) * Math.sqrt(3)) / 4;
            }
            else if (start > end){
                // return (chartHight * (4+Math.sqrt(3))) / 8;
                return chartHight/2 +((start - end) * Math.sqrt(3)) / 4;
            }
            else{
                return chartHight / 2;
            }
            
        })
        .attr("cx", function (d) {
            var start,end;
            for (var i = 0; i < categories.length; i++) {
                if (d[encoding.color.field] === categories[i]) {
                    start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
                }
            }
            for (i = 0; i < newX.length; i++) {
                if (d[encoding.color.field] === newX[i]) {
                    end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
                }
            }
            return (start + end*3)/4;
        })
        .transition()
        .duration(animation.duration/3)
        .ease(d3.easeLinear)
        .delay(function (d, i) {
            return i * 0;
        })
        .attr("cy", chartHight / 2)
        .attr("cx", function (d) {
            for (var i = 0; i < newX.length; i++) {
                if (d[encoding.color.field] === newX[i]) {
                    return i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
                }
            }
        })

    }
    


    return svg;
}

export default draw;