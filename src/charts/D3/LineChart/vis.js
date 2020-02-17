import * as d3 from 'd3';
import {getSeries, getCategories, parseTime, formatTick, getAggregatedRows, formatTicksCount, sortByDateAscending, getWidth} from './helper';
import _ from 'lodash';

const offset = 20; 
const config = {
    "legend-text-color": "#666"
}

const draw = (props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-linechart > *').remove();
        a = '.vis-linechart';
    }

    const margin = {top: 10, right: 10, bottom: 40, left: 40};
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    const chartWidth = width,
          chartHeight = height - 60;
    let svg = d3.select(a)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get Encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding) || _.isEmpty(encoding.x) || _.isEmpty(encoding.y.field) ) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "steelblue"); 
        return svg;
    }

    let hasSeries = ('color' in encoding) && ('field' in encoding.color);
    // Process Data
    let data = props.data;
    data.forEach((d)=>{
        d[encoding.y.field] = +d[encoding.y.field];
        return d;
    })
    // // Get categories
    let dataCategories = getCategories(data, encoding);
    let categories = Object.keys(dataCategories);
    // console.log('categories', categories)
    
    // Get series and stacked data
    let dataSeries = {};
    let dataSeriesCategories = {};
    let series = [];
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let color;
    let xScale, yScale;

    if (hasSeries) {
        // Series data
        dataSeries = getSeries(data, encoding);
        series = Object.keys(dataSeries);
        for (const s in dataSeries) {
            dataSeriesCategories[s] = {};
            // dataSeries[s] = getMaxRows(dataSeries[s], encoding);
            dataSeries[s] = getAggregatedRows(dataSeries[s], encoding)
            for (let index = 0; index < dataSeries[s].length; index++) {
                const rowData = dataSeries[s][index];
                // console.log(rowData);
                dataSeriesCategories[s][rowData[encoding.x.field]] = rowData[encoding.y.field]
            }
        }
        // color scale
        color = colorScale.domain(data.map(function(d) { return d[encoding.color.field];}));
        // X channel
        xScale = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return parseTime(d[encoding.x.field]);}))
            .range([0, chartWidth]);

        // Y channel
        yScale = d3.scaleLinear()
            .domain([0, d3.max(series, function(c) {
                return d3.max(dataSeries[c], function(d) {
                    return d[encoding.y.field]
                })
            })])
            .range([chartHeight, 0])
            .nice();

    } else {
        data = getAggregatedRows(data, encoding);
        // X channel
        xScale = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return parseTime(d[encoding.x.field]);}))
            .range([0, chartWidth]);
        // Y channel
        yScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d=>d[encoding.y.field]))])
            .range([chartHeight, 0])
            .nice();

    }
    // console.log('dataSeriesCategories', dataSeriesCategories);
    // console.log('dataSeries', dataSeries);
    // console.log('series', series); // color 

    let chart = svg.append("g"),
        axis = chart.append("g")
            .attr("class", "axis"),
        content = chart.append("g")
            .attr("class", "content")
            .attr("chartWidth", chartWidth)
            .attr("chartHeight", chartHeight)
            .attr("clip-path", "url(#clip-rect)"),
        legend = svg.append("g")
            .attr("transform", `translate(0, ${chartHeight + 60})`);

    let tick_format = formatTick(data[0][encoding.x.field])
    let format_TicksCount = formatTicksCount(data[0][encoding.x.field])
    var axisX = d3.axisBottom(xScale)
                .ticks(format_TicksCount)
                .tickFormat(tick_format);
    if(format_TicksCount === d3.timeYear) {
        axisX.ticks(format_TicksCount)
    }

    let axisY = d3.axisLeft(yScale);

    let axis_x = axis.append("g")
        .attr("class", "axis_x")
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(axisX)
        .style('display', 'none')
        .attr('xScale', xScale.domain())
    
    axis_x.selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
        
    let axis_y = axis.append("g")
        .attr("class", "axis_y")
        .call(axisY)
        .style('display', 'none')
        .attr('yScale', yScale.domain());

    // line Function
    var lineGen = d3.line()
        .x(function(d) {
            // return xScale(d.x);
            return xScale(parseTime(d.x));
        })
        .y(function(d) {
            return yScale(d.y);
        });

    // Origin is set
    if (series.length > 0) {
        let preparedData = {}
        series.forEach((s) => {
            let sData = [];
            categories.forEach(c => { // each x value 
                sData.push({
                    x: c,
                    y: dataSeriesCategories[s][c]?dataSeriesCategories[s][c]:0,
                    y0: 0,
                    color: s
                })
            });
            sData = sData.sort(sortByDateAscending);
            preparedData[s] = sData;
        })
        var allGroup = content.append('g')
                        .attr('id', 'allLine')
        for (let index = 0; index < series.length; index++) {
            // console.log(preparedData[series[index]])
            var group = allGroup.append('g')
                .attr('id', 'series_' + series[index])
                .attr('clip-path', 'url(#clip_'+series[index]+')');
            group.append('path')
                .data([preparedData[series[index]]])
                .attr('d', lineGen(preparedData[series[index]]))
                .attr('stroke', color(series[index]))
                .attr('stroke-width', 3)
                .attr('fill', 'none')
                .attr('class', 'data-item series_' +series[index]);
            group.selectAll('.dot')
                .data(preparedData[series[index]])
                .enter()
                .append('circle')
                .attr("cx", function(d) { return xScale(parseTime(d.x)) }) // parseTime
                .attr("cy", function(d) { return yScale(d.y) })
                .attr("r", 4)
                .style("stroke", color(series[index]))    // set the line colour
                .style('stroke-width', 3)
                .style("fill", "white")
                .attr('class', 'data-item series_' + series[index]);
                
        }
        // display legend
        var legends = legend.selectAll("legend_color")
                .data(series)
                .enter()
                .append("g")
                .attr("class", "legend_color")
                .attr('transform', (d, i) =>`translate(${10}, 0)`);//`translate(${i*(80 + 10) + (chartWidth - (series.length * 80 + (series.length - 1) * 10)) / 2}, 0)`);
        legends.append("circle")
                .attr("fill", 'none')
                .attr('stroke-width', 3)
                .attr('stroke', d => color(d))
                .attr("r", 4)
                .attr("cy", -5);
                // .attr('y', -7)
                // .attr("width", '30px')
                // .attr('height', '3px')
                // .attr("rx", 1.5)
                // .attr("ry", 1.5)
                // .attr("cy", -5);
        legends.append("text")
                .attr("fill", config["legend-text-color"])
                .attr("x", 10) //35
                .text(d => d)
                .style('font-family', 'Arial');
        let legend_nodes=legends.nodes();
        let before = legend_nodes[0];
        let current;
        let offset = 10;

        for(let i = 1; i< legend_nodes.length; i++){
            current = legend_nodes[i];
            if(d3.select(before).select("text").node().getComputedTextLength()){
                offset += d3.select(before).select("text").node().getComputedTextLength();
            }else{
                offset += getWidth(series[i-1])
            } 
            d3.select(current)
                .attr('transform', `translate(${i*30 + offset}, 0)`);
            before = current;
        }
        if(legend.node().getBBox().width){
            legend.attr("transform", `translate(${(chartWidth - legend.node().getBBox().width)/2}, ${chartHeight + 60})`);
        }else{
            offset += getWidth(series[series.length-1]);
            legend.attr("transform", `translate(${(chartWidth - offset - 30 * series.length + 20)/2}, ${chartHeight + 60})`);
        }
    } else {
        let sData = {};
        categories.forEach(c => {
            data.forEach(d => {
                if (d[encoding.x.field] === c) {
                    sData[c] = d[encoding.y.field];
                }
            })
        });
        var averageData = [];
        Object.keys(sData).forEach(s => {
            averageData.push({
                x: s,
                y: sData[s],
                y0: 0,
                color: 'overall'
            })
        })
        averageData = averageData.sort(sortByDateAscending)
        let group = content.append('g')
                .attr('id', 'series_overall')
                .attr('clip-path', 'url(#clip_overall)');
        group.append('path')
            .attr('d', lineGen(averageData))
            .data([averageData])
            .attr('stroke', colorScale(1))
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('class', 'data-item series_overall');
        group.selectAll('.dot')
            .data(averageData)
            .enter()
            .append('circle')
            .attr("cx", function(d) { return xScale(parseTime(d.x)) }) // parseTime
            .attr("cy", function(d) { return yScale(d.y) })
            .attr("r", 4)
            .style("stroke", colorScale(1))    // set the line colour
            .style('stroke-width', 3)
            .style("fill", "white")
            .attr('class', 'data-item series_overall');
    }

    // Style
    const style = props.spec.style;
    if (!_.isEmpty(style)) {
        if (style.showAxisX) {
            axis_x.style('display', 'inline')
        //     svg.append("g")
        //         .attr("transform", "translate(0," + height + ")")
        //         .call(d3.axisBottom(x))
        //         .selectAll("text")
        //         .attr("transform", "translate(-10,0)rotate(-45)")
        //         .style("text-anchor", "end");
        }
        if (style.showAxisY) {
            axis_y.style('display', 'inline')
        //     svg.append("g").call(d3.axisLeft(y));

        }
        if (style.showGrid) {
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
        }

        
    }
    return svg;
}

export default draw;