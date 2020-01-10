import * as d3 from 'd3';
import {getAggregatedRows, getCategories} from '../../helper';
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (animation, props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-proportionchart > *').remove();
        a = '.vis-proportionchart';
    }

    const margin = {top: 10, right: 10, bottom: 40, left: 40};
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

    let hasTrend = ('time' in encoding) && ('field' in encoding.time);
    
    // Process Data
    let data = props.data;

    // Get categories
    let dataCategories = getCategories(data, encoding);
    let categories = Object.keys(dataCategories);
    // for (var i=0;i<categories.length;i++){
    //     var c=categories[i];
    //     var s=encoding.size.field;
    // }

    // data = getAggregatedRows(data, encoding);

    let trendData = []
    if (hasTrend) {
        let time = [...new Set(data.map(d => d[encoding.time.field]))];
        if (animation.spec.range === 'customize' && animation.spec.rangeScope.length > 0) {
            time = time.filter(d => (d >= animation.spec.rangeScope[0] && d <= animation.spec.rangeScope[1]));
        }
        time.forEach(timePoint => {
            let td = data.filter(d => d[encoding.time.field] === timePoint);
            let subCategories = td.map(d => d[encoding.color.field]);
            let missCategories = categories.filter(x => subCategories.indexOf(x)===-1);
            missCategories.forEach(missCategory => {
                let color = {};
                color[encoding.color.field] = missCategory;
                color[encoding.size.field] = 0;
                color[encoding.time.field] = timePoint;
                td.push(color)
            });
            td = getAggregatedRows(td, encoding);
            trendData.push(td);
        });
        data = getAggregatedRows(data, encoding);
    } else {
        data = getAggregatedRows(data, encoding);
    }

    // data = getAggregatedRows(data, encoding);

    let dataValues = {}
    for (let i = 0; i < data.length; i++) {
        dataValues[data[i][encoding.color.field]] = data[i][encoding.size.field];
    }

    console.log(dataValues);


    const chartWidth = width,
        chartHight = height - 60;

    let content = svg.append("g")
                .attr("class","content")
                .attr("chartWidth",chartWidth)
                .attr("chartHight", chartHight),
        legend = svg.append("g")
                    .attr("transform",`translate(0, ${chartHight + 60})`);


    //Size channels
    let size = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){ 
                    return Math.sqrt(d[encoding.size.field]/Math.PI); })])
                .range([ 0 , width/(categories.length*2.5) ]);

    //x
    // let x = d3.scaleBand()
    //         .range([ 75, chartWidth ])
    //         .domain(data.map(function(d) { return d[encoding.color.field]; }))
    //         .padding(0);


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
    .attr("cy", chartHight/2)
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

    //Show Legend
    // var dataCategories = getCategories(data, encoding);
    var legends = legend.selectAll("legend_color")
                .data(data)
                .enter().append("g")
                .attr("class", "legend_color")
                .attr('transform', (d, i) =>`translate(${i * 80 + (chartWidth - 80 * categories.length)/2}, 0)`);


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

    // // Animation
    // TODO: choose aggregation
    let aggregatedDS1 = data.concat();  //不能改变原始data
    if (animation.spec.extreme1 === 'max') {
        aggregatedDS1.sort(function(a, b){return b[encoding.size.field] - a[encoding.size.field]});
    } else {
        aggregatedDS1.sort(function(a, b){return a[encoding.size.field] - b[encoding.size.field]}); // min
    }
    let extremeCategory1 = aggregatedDS1[0][encoding.color.field];

    let aggregatedDS2 = data.concat();  //不能改变原始data
    if (animation.spec.extreme2 === 'max') {
        aggregatedDS2.sort(function(a, b){return b[encoding.size.field] - a[encoding.size.field]});
    } else {
        aggregatedDS2.sort(function(a, b){return a[encoding.size.field] - b[encoding.size.field]}); // min
    }
    let extremeCategory2 = aggregatedDS2[0][encoding.color.field];

    if (animation.spec.effect === 'juxtaposition') {
        // juxtaposition animation
                content.selectAll('circle')
                    .data(data)
                    .transition()
                    .duration(animation.duration)
                    .style("fill", (d, i) => {
                        return "lightgray";
                    });
                content.selectAll('circle')
                    .data(data)
                    .transition()
                    .duration(animation.duration)
                    .style("fill", (d) => {
                        if ((d[encoding.color.field].toString() !== extremeCategory1.toString()) && (d[encoding.color.field].toString() !== extremeCategory2.toString())) {
                            return "lightgray";
                        }
                    })
                    .style("stroke", "yellow")
                    .style("stroke-width", function (d){  
                        if ((d[encoding.color.field].toString() === extremeCategory1.toString()) || (d[encoding.color.field].toString() === extremeCategory2.toString())) {
                            return 5;
                        } else {
                            return 0;
                        }
                    });
                content.append("text")
                    .data(data)
                    .attr("dy", function(d){return chartHight/2 - size(Math.sqrt(dataValues[extremeCategory1]/Math.PI)) - 20})
                    .attr("dx", function(d) {
                        for (var i=0; i<categories.length; i++){
                            if(extremeCategory1.toString() === categories[i]){
                                return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2 - chartWidth/(categories.length*2.5*3);
                            }
                        }
                    })
                    .text(function(d){
                        return dataValues[extremeCategory1].toFixed(2);
                    });
                content.append("text")
                    .data(data)
                    .attr("dy", function(d){return chartHight/2 - size(Math.sqrt(dataValues[extremeCategory2]/Math.PI)) - 20})
                    .attr("dx", function(d) {
                        for (var i=0; i<categories.length; i++){
                            if(extremeCategory2.toString() === categories[i]){
                                return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2 - chartWidth/(categories.length*2.5*3);
                            }
                        }
                    })
                    .text(function(d){
                        return dataValues[extremeCategory2].toFixed(2);
                    });
    }
    return svg;
}

export default draw;