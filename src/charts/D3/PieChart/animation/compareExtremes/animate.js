import * as d3 from 'd3';
import {  getCategories, getAggregatedRows } from '../../helper';
import _ from 'lodash';

const draw = (animation, props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-piechart > *').remove();
        a = '.vis-piechart';
    }

    const margin = {top: 100, right: 100, bottom: 100, left: 100};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    let svg = d3.select(a)
                .append("center")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let legendSvg = svg
    //在svg之前添加center元素以保证svg居中显示
    // .append("center")    
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", "translate(0,-60)");

    //Get Encoding
    const encoding = props.spec.encoding;
    if(_.isEmpty(encoding) || !('size' in encoding) || _.isEmpty(encoding.size) ){
        svg.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", height / 2)
            .attr("fill", "pink");
        return svg;
    }

    // Process Data
    let data = props.data;
    data = getAggregatedRows(data, encoding);
    data.sort(function(a, b){return b[encoding.size.field] - a[encoding.size.field]});

    let extreme1Category = animation.spec.extreme1 === "max" ? data[0][encoding.size.field] : data[data.length - 1][encoding.size.field];
    let extreme2Category = animation.spec.extreme2 === "max" ? data[0][encoding.size.field] : data[data.length - 1][encoding.size.field];

    //Get categories
    let dataCategories = getCategories(data, encoding);
    let categories = Object.keys(dataCategories);

    //Color channel
    let color;
    if('color' in encoding) {
        let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        color = colorScale.domain(data.map(function(d){ return d[encoding.color.field]; }));
    }

    //Compute the position of each group on the pie
    let pie = d3.pie()
        .value(function(d){ return d[encoding.size.field]; });
    let pieData = pie(data);

    //Build the pie chart
    let arc = d3.arc() //弧生成器
				.innerRadius(0) //设置内半径
                .outerRadius(height/2); //设置外半径
    
    let arcs = svg.selectAll("g")
        .data(pieData)
        .enter()
        .append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
    
    arcs.append("path")
    .attr("fill", function(d){ return(color(d.data[encoding.color.field])); })
    .attr("d", function(d,i){
        return arc(d);
    });

    //draw text-label
    arcs.append("text")
    .attr('transform', function(d, i){
        var x = arc.centroid(d)[0] * 2.5;
        var y = arc.centroid(d)[1] * 2.5;
        return 'translate(' + x + ', ' + y + ')';
    })
    .attr('text-anchor', 'middle')
    .attr("opacity","0")
    .text(function(d){
    var percent = Number(d.value) / d3.sum(pieData, function(d){
        return d.value;
    }) * 100;
    return percent.toFixed(1) + '%';
    });
    
    //draw text-line
    arcs.append('line')
        .attr('stroke', 'black')
        .attr('x1', function(d){ return arc.centroid(d)[0] * 2; })
        .attr('y1', function(d){ return arc.centroid(d)[1] * 2; })
        .attr('x2', function(d, i){
        return arc.centroid(d)[0] * 2.3;
        })
        .attr('y2', function(d, i){
        return arc.centroid(d)[1] * 2.3;
        })
        .attr("opacity","0");
   
    //draw legend
    legendSvg.selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill",function(d){ return(color(d)); })
        .attr("transform", function(d,i){
            let offset = 100 * i + 70;
            return "translate(" + offset + "," + 445 + ")";
        })
        .attr("z-index",99999);

    legendSvg.selectAll("text")
        .data(categories)
        .enter()
        .append("text")
        .text(function(d, i){ return d; })
        .attr("transform", function(d,i){
            let offset = 100 * i + 100;
            return "translate(" + offset + "," + 460 + ")";
        });
    
    
    if(animation.spec.effect === "juxtaposition") {
        // filter animation
        svg.selectAll("g")
            .transition()
            .duration(animation.duration)
            .attr("transform",function(d,i) {
                if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
                    let angle = Math.PI / 2 - (d.endAngle + d.startAngle) / 2;
                    let change = 10;
                    let changeX = change * Math.cos(angle);
                    let changeY = - change * Math.sin(angle);
                    d.changeX = changeX + width / 2;
                    d.changeY = changeY + height / 2;                   
                } else {                    
                    d.changeX = width / 2;
                    d.changeY = height / 2;
                }
                return "translate(" + d.changeX + "," + d.changeY + ")";
            })
            .attr("stroke", "yellow")
            .attr("stroke-width", function (d, i){  
                if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
                    return 5;
                } else {
                    return 0;
                }
            })
            .attr("fill-opacity", function (d, i){  
                if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
                    return 1;
                } else {
                    return 0.5;
                }
            });

        svg.selectAll("g")
            .selectAll("text")
            .attr("stroke-width", "0")
            .transition()
            .duration(animation.duration)
            .attr("opacity", function (d, i){  
                if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
                    return 1;
                } else {
                    return 0;
                }
            });
        svg.selectAll("g")
            .selectAll("line")
            .attr("stroke-width", "1")
            .transition()
            .duration(animation.duration)
            .attr("opacity", function (d, i){  
                if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
                    return 1;
                } else {
                    return 0;
                }
            });

    } else{
        // filter animation
        svg.selectAll("g")
            .transition()
            .duration(animation.duration)
            .attr("transform",function(d,i) {
                if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
                    let angle = Math.PI / 2 - (d.endAngle + d.startAngle) / 2;
                    let change = 10;
                    let changeX = change * Math.cos(angle);
                    let changeY = - change * Math.sin(angle);
                    d.changeX = changeX + width / 2;
                    d.changeY = changeY + height / 2;                   
                } else {                    
                    d.changeX = width / 2;
                    d.changeY = height / 2;
                }
                return "translate(" + d.changeX + "," + d.changeY + ")";
            })
            .attr("stroke", "yellow")
            .attr("stroke-width", function (d, i){  
                if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
                    return 5;
                } else {
                    return 0;
                }
            });

        // svg.selectAll("g")
        //     .selectAll("text")
        //     .attr("stroke-width", "0")
        //     .transition()
        //     .duration(animation.duration)
        //     .attr("opacity", function (d, i){  
        //         if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
        //             return 1;
        //         } else {
        //             return 0;
        //         }
        //     });
        // svg.selectAll("g")
        //     .selectAll("line")
        //     .attr("stroke-width", "1")
        //     .transition()
        //     .duration(animation.duration)
        //     .attr("opacity", function (d, i){  
        //         if (d.data[encoding.size.field] === extreme1Category || d.data[encoding.size.field] === extreme2Category) {
        //             return 1;
        //         } else {
        //             return 0;
        //         }
        //     });
    }

    
}

export default draw;