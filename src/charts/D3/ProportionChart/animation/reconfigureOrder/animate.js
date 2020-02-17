import * as d3 from 'd3';
import {getCategories, getAggregatedRows, getSize, getWidth} from '../../helper';
import _ from 'lodash';

const offset = 20; // To show whole chart

const config = {
    "legend-text-color": "#666"
}

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
        .range([0, chartWidth / (categories.length * 2.7)]);

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
            // for (var i = 0; i < categories.length; i++) {
            //     if (d[encoding.color.field] == categories[i]) {
            //         return i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
            //     }
            // }
            var inner = 0;
            for (var j=0; j<categories.length; j++){
                inner = inner + size(Math.sqrt(sizes[j]/Math.PI));
            }
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field].toString() ===categories[i].toString()){
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
        .attr("cy", chartHight / 2);

    proportionAreas.attr("fill", d => color(d[encoding.color.field]));
    
    var text = content.selectAll("text")
    .data(data)
    .enter()
    .append("text")
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
                return size_all + (chartWidth - 2 * inner - space * (categories.length - 1)) / 2;
            }
        }
    })
    .text(function (d) {
        return parseFloat(d[encoding.size.field]).toFixed(2);
        // return animation.spec.value.toFixed(2);
    });
    // var offset_t = text.node().getComputedTextLength();
    // text.attr('transform',`translate(${-((offset_t)/2)}, 0)`);
    var offset_t;
    var dif = 10;
    if(text.node().getComputedTextLength()){
        offset_t = text.node().getComputedTextLength();
        text.attr('transform', `translate(${-((offset_t)/2)}, 0)`);
    }else{
        offset_t = getWidth(parseFloat(sizes[0]).toFixed(2).toString());
        text.attr('transform', `translate(${-((offset_t + dif)/2)}, 0)`);
    } 



    //Show Legend
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

    // Animation
    // let originPosition = _.cloneDeep(data[0].map(function (d) {
    //     return d[encoding.color.field]
    // }));
    // let newX;
    // let odata = data[data.length - 1];
    // if (animation.spec.order == 'ascending') {
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
    // console.log(newX);
    let newS=[];
    for(var i=0;i<newX.length;i++){
        for(var j=0;j<categories.length;j++){
            if(newX[i].toString()===categories[j].toString()){
                newS[i] = sizes[j];
            }
        }
    }
    // console.log(newS);

    if (animation.spec.effect === 'switch'){
        svg.selectAll("circle")
        .transition()
        .duration(animation.duration)
        .delay(function (d, i) {
            return i * 50;
        })
        .attr("cx", function (d) {
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         return i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
            var inner = 0;
            for (var j=0; j<newX.length; j++){
                inner = inner + size(Math.sqrt(newS[j]/Math.PI));
            }
            for (var i=0; i<newX.length; i++){
                if(d[encoding.color.field].toString() ===newX[i].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all=0;
                    var space = 15;
                    for(var t=0; t<i; t++){
                        size_all = size_all + 2*size(Math.sqrt(newS[t]/Math.PI));
                        if (t>=0){
                            size_all = size_all + space;
                        }
                    } 
                    size_all = size_all + size(Math.sqrt(newS[i]/Math.PI))
                    return size_all + (chartWidth - 2*inner - space*(newX.length-1))/2;
                }
            }
        })
        var text2 = content.selectAll("text")
        .transition()
        .duration(animation.duration)
        .delay(function (d, i) {
            return i * 50;
        })
        .attr("dx", function (d) {
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         return i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
            var inner = 0;
            for (var j=0; j<newX.length; j++){
                inner = inner + size(Math.sqrt(newS[j]/Math.PI));
            }
            for (var i=0; i<newX.length; i++){
                if(d[encoding.color.field].toString() ===newX[i].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all=0;
                    var space = 15;
                    for(var t=0; t<i; t++){
                        size_all = size_all + 2*size(Math.sqrt(newS[t]/Math.PI));
                        if (t>=0){
                            size_all = size_all + space;
                        }
                    } 
                    size_all = size_all + size(Math.sqrt(newS[i]/Math.PI))
                    return size_all + (chartWidth - 2*inner - space*(newX.length-1))/2;
                }
            }
        })
        // var offset_t2 = text2.node().getComputedTextLength();
        // text2.attr('transform',`translate(${-((offset_t2)/2)}, 0)`);
        var offset_t2;
        var dif2 = 10;
        if (text2.node().getComputedTextLength()) {
            offset_t2 = text2.node().getComputedTextLength();
            text2.attr('transform', `translate(${-((offset_t2)/2)}, 0)`);
        } else {
            offset_t2 = getWidth(parseFloat(sizes[0]).toFixed(2).toString());
            text2.attr('transform', `translate(${-((offset_t2 + dif2)/2)}, 0)`);
        }

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
            var inner = 0;
            for (var j=0; j<categories.length; j++){
                inner = inner + size(Math.sqrt(sizes[j]/Math.PI));
            }
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field].toString() ===categories[i].toString()){
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
                    start = size_all + (chartWidth - 2*inner - space*(categories.length-1))/2;
                }
            }

            var inner1 = 0;
            for (var j1=0; j1<newX.length; j1++){
                inner1 = inner1 + size(Math.sqrt(newS[j1]/Math.PI));
            }
            for (var i1=0; i1<newX.length; i1++){
                if(d[encoding.color.field].toString() ===newX[i1].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all1=0;
                    var space1 = 15;
                    for(var t1=0; t1<i1; t1++){
                        size_all1 = size_all1 + 2*size(Math.sqrt(newS[t1]/Math.PI));
                        if (t>=0){
                            size_all1 = size_all1 + space1;
                        }
                    } 
                    size_all1 = size_all1 + size(Math.sqrt(newS[i1]/Math.PI))
                    end = size_all1 + (chartWidth - 2*inner1 - space1*(newX.length-1))/2;
                }
            }
            // for (var i = 0; i < categories.length; i++) {
            //     if (d[encoding.color.field] == categories[i]) {
            //         start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
            //     }
            // }
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
            // console.log(start);
            // console.log(end);
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
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         return i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
            var inner = 0;
            for (var j=0; j<categories.length; j++){
                inner = inner + size(Math.sqrt(sizes[j]/Math.PI));
            }
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field].toString() ===categories[i].toString()){
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
                    start = size_all + (chartWidth - 2*inner - space*(categories.length-1))/2;
                }
            }

            var inner1 = 0;
            for (var j1=0; j1<newX.length; j1++){
                inner1 = inner1 + size(Math.sqrt(newS[j1]/Math.PI));
            }
            for (var i1=0; i1<newX.length; i1++){
                if(d[encoding.color.field].toString() ===newX[i1].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all1=0;
                    var space1 = 15;
                    for(var t1=0; t1<i1; t1++){
                        size_all1 = size_all1 + 2*size(Math.sqrt(newS[t1]/Math.PI));
                        if (t>=0){
                            size_all1 = size_all1 + space1;
                        }
                    } 
                    size_all1 = size_all1 + size(Math.sqrt(newS[i1]/Math.PI))
                    end = size_all1 + (chartWidth - 2*inner1 - space1*(newX.length-1))/2;
                }
            }

            // for (var i = 0; i < categories.length; i++) {
            //     if (d[encoding.color.field] == categories[i]) {
            //         start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
            //     }
            // }
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
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
            var inner = 0;
            for (var j=0; j<categories.length; j++){
                inner = inner + size(Math.sqrt(sizes[j]/Math.PI));
            }
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field].toString() ===categories[i].toString()){
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
                    start = size_all + (chartWidth - 2*inner - space*(categories.length-1))/2;
                }
            }

            var inner1 = 0;
            for (var j1=0; j1<newX.length; j1++){
                inner1 = inner1 + size(Math.sqrt(newS[j1]/Math.PI));
            }
            for (var i1=0; i1<newX.length; i1++){
                if(d[encoding.color.field].toString() ===newX[i1].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all1=0;
                    var space1 = 15;
                    for(var t1=0; t1<i1; t1++){
                        size_all1 = size_all1 + 2*size(Math.sqrt(newS[t1]/Math.PI));
                        if (t>=0){
                            size_all1 = size_all1 + space1;
                        }
                    } 
                    size_all1 = size_all1 + size(Math.sqrt(newS[i1]/Math.PI))
                    end = size_all1 + (chartWidth - 2*inner1 - space1*(newX.length-1))/2;
                }
            }
            // for (var i = 0; i < categories.length; i++) {
            //     if (d[encoding.color.field] == categories[i]) {
            //         start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
            //     }
            // }
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
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
            var inner = 0;
            for (var j=0; j<categories.length; j++){
                inner = inner + size(Math.sqrt(sizes[j]/Math.PI));
            }
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field].toString() ===categories[i].toString()){
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
                    start = size_all + (chartWidth - 2*inner - space*(categories.length-1))/2;
                }
            }

            var inner1 = 0;
            for (var j1=0; j1<newX.length; j1++){
                inner1 = inner1 + size(Math.sqrt(newS[j1]/Math.PI));
            }
            for (var i1=0; i1<newX.length; i1++){
                if(d[encoding.color.field].toString() ===newX[i1].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all1=0;
                    var space1 = 15;
                    for(var t1=0; t1<i1; t1++){
                        size_all1 = size_all1 + 2*size(Math.sqrt(newS[t1]/Math.PI));
                        if (t>=0){
                            size_all1 = size_all1 + space1;
                        }
                    } 
                    size_all1 = size_all1 + size(Math.sqrt(newS[i1]/Math.PI))
                    end = size_all1 + (chartWidth - 2*inner1 - space1*(newX.length-1))/2;
                }
            }
            // for (var i = 0; i < categories.length; i++) {
            //     if (d[encoding.color.field] == categories[i]) {
            //         start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
            //     }
            // }
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
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
            var inner = 0;
            for (var j=0; j<categories.length; j++){
                inner = inner + size(Math.sqrt(sizes[j]/Math.PI));
            }
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field].toString() ===categories[i].toString()){
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
                    start = size_all + (chartWidth - 2*inner - space*(categories.length-1))/2;
                }
            }

            var inner1 = 0;
            for (var j1=0; j1<newX.length; j1++){
                inner1 = inner1 + size(Math.sqrt(newS[j1]/Math.PI));
            }
            for (var i1=0; i1<newX.length; i1++){
                if(d[encoding.color.field].toString() ===newX[i1].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all1=0;
                    var space1 = 15;
                    for(var t1=0; t1<i1; t1++){
                        size_all1 = size_all1 + 2*size(Math.sqrt(newS[t1]/Math.PI));
                        if (t>=0){
                            size_all1 = size_all1 + space1;
                        }
                    } 
                    size_all1 = size_all1 + size(Math.sqrt(newS[i1]/Math.PI))
                    end = size_all1 + (chartWidth - 2*inner1 - space1*(newX.length-1))/2;
                }
            }
            // for (var i = 0; i < categories.length; i++) {
            //     if (d[encoding.color.field] == categories[i]) {
            //         start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
            //     }
            // }
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
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
            var inner = 0;
            for (var j=0; j<categories.length; j++){
                inner = inner + size(Math.sqrt(sizes[j]/Math.PI));
            }
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field].toString() ===categories[i].toString()){
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
                    start = size_all + (chartWidth - 2*inner - space*(categories.length-1))/2;
                }
            }

            var inner1 = 0;
            for (var j1=0; j1<newX.length; j1++){
                inner1 = inner1 + size(Math.sqrt(newS[j1]/Math.PI));
            }
            for (var i1=0; i1<newX.length; i1++){
                if(d[encoding.color.field].toString() ===newX[i1].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all1=0;
                    var space1 = 15;
                    for(var t1=0; t1<i1; t1++){
                        size_all1 = size_all1 + 2*size(Math.sqrt(newS[t1]/Math.PI));
                        if (t>=0){
                            size_all1 = size_all1 + space1;
                        }
                    } 
                    size_all1 = size_all1 + size(Math.sqrt(newS[i1]/Math.PI))
                    end = size_all1 + (chartWidth - 2*inner1 - space1*(newX.length-1))/2;
                }
            }
            // for (var i = 0; i < categories.length; i++) {
            //     if (d[encoding.color.field] == categories[i]) {
            //         start = i * 2 * chartWidth / (categories.length * 2.5) + (chartWidth - 2 * chartWidth / (categories.length * 2.5) * (categories.length - 1)) / 2;
            //     }
            // }
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         end = i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
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
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         return i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
            var inner = 0;
            for (var j=0; j<newX.length; j++){
                inner = inner + size(Math.sqrt(newS[j]/Math.PI));
            }
            for (var i=0; i<newX.length; i++){
                if(d[encoding.color.field].toString() ===newX[i].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all=0;
                    var space = 15;
                    for(var t=0; t<i; t++){
                        size_all = size_all + 2*size(Math.sqrt(newS[t]/Math.PI));
                        if (t>=0){
                            size_all = size_all + space;
                        }
                    } 
                    size_all = size_all + size(Math.sqrt(newS[i]/Math.PI))
                    return size_all + (chartWidth - 2*inner - space*(newX.length-1))/2;
                }
            }
        })

        content.selectAll("text").remove();
        var text1 = content.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("dy", function (d) {
            return chartHight / 2 - size(Math.sqrt(d[encoding.size.field] / Math.PI)) - 20
        })
        .attr("dx", function (d) {
            // for (var i = 0; i < newX.length; i++) {
            //     if (d[encoding.color.field] == newX[i]) {
            //         return i * 2 * chartWidth / (newX.length * 2.5) + (chartWidth - 2 * chartWidth / (newX.length * 2.5) * (newX.length - 1)) / 2;
            //     }
            // }
            var inner = 0;
            for (var j=0; j<newX.length; j++){
                inner = inner + size(Math.sqrt(newS[j]/Math.PI));
            }
            for (var i=0; i<newX.length; i++){
                if(d[encoding.color.field].toString() ===newX[i].toString()){
                    // return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                    var size_all=0;
                    var space = 15;
                    for(var t=0; t<i; t++){
                        size_all = size_all + 2*size(Math.sqrt(newS[t]/Math.PI));
                        if (t>=0){
                            size_all = size_all + space;
                        }
                    } 
                    size_all = size_all + size(Math.sqrt(newS[i]/Math.PI))
                    return size_all + (chartWidth - 2*inner - space*(newX.length-1))/2;
                }
            }
        })
        .text(function (d) {
            return parseFloat(d[encoding.size.field]).toFixed(2);
            // return animation.spec.value.toFixed(2);
        });
        // var offset_t1 = text1.node().getComputedTextLength();
        // text1.attr('transform',`translate(${-((offset_t1)/2)}, 0)`);
        var offset_t1;
        var dif1 = 10;
        if(text1.node().getComputedTextLength()){
            offset_t1 = text1.node().getComputedTextLength();
            text1.attr('transform', `translate(${-((offset_t1)/2)}, 0)`);
        }else{
            offset_t1 = getWidth(parseFloat(sizes[0]).toFixed(2).toString());
            text1.attr('transform', `translate(${-((offset_t1 + dif1)/2)}, 0)`);
        } 

    }
    


    return svg;
}

export default draw;