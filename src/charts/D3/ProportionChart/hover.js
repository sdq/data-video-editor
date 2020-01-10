import * as d3 from 'd3';
import { getCategories,  getAggregatedRows} from './helper';
import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';
import _ from 'lodash';

const offset = 20; // To show whole chart

const inArea = (point, area) =>{
    if (point.x > (area.cx - area.r) && point.x < (area.cx + area.r) && point.y > (area.cy - area.r) && point.y < (area.cy + area.r)) {
        return true;
    } else {
        return false;
    }
}

const draw = (props) => {
    // TODO: get choosen animation
    // let choosenAnimation = props.choosenAnimation;
    
    // TODO: set choosen animation
    // props.chooseChartAnimation(choosenAnimation);
    let animationTask;
    let animationType;
    let choosenAnimation = props.choosenAnimation;
    if (choosenAnimation) {
        animationType = choosenAnimation.type;
        animationTask = choosenAnimation.task;
    }
    if (animationTask !== ChartAnimationTask.EMPHASIZE && animationTask !== ChartAnimationTask.COMPARISON && animationType !== ChartAnimationType.RECONFIGURE_ORDER) {
        // no highlight
        return;
    }
    let point = {
        x: props.pointx - 40, // offset
        y: props.pointy - 40, // offset
    }

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

    // Process Data
    let data = props.data;
    let dataCategories = getCategories(data, encoding);
    let categories = Object.keys(dataCategories);
    data = getAggregatedRows(data, encoding);

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
    let proportionAreas = content.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style('stroke-width','0')
        .attr("class", "data-item")
        .attr("size", function(d) { return d[encoding.size.field]; })
        .attr("color", function(d) { return d[encoding.color.field]; })
        // .attr("r", function(d) { return Math.sqrt( size(d[encoding.size.field]) / Math.PI ); })
        .attr("r", function(d) { return size(Math.sqrt(d[encoding.size.field]/Math.PI)); })
        .attr("cx", function(d) {
            for (var i=0; i<categories.length; i++){
                if(d[encoding.color.field] === categories[i]){
                    return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
                }
            }
        })
        .attr("cy", chartHight/2);

    proportionAreas.attr("fill", d => color(d[encoding.color.field]));

    // .attr("r", function(d) { return size(Math.sqrt(d[encoding.size.field]/Math.PI)); })
    // .attr("cx", function(d) {
    //     for (var i=0; i<categories.length; i++){
    //         if(d[encoding.color.field] == categories[i]){
    //             return i * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2;
    //         }
    //     }
    // })
    // .attr("cy", chartHight/2);

    if (animationType === ChartAnimationType.EMPHASIZE_VALUE || animationType === ChartAnimationType.COMPARE_VALUES){
        let hoverCategory;
        let hoverValue;
        content.selectAll("circle")
            .style('fill', (d, i) => {
                let index = categories.indexOf(d[encoding.color.field]);
                let area = {
                    cx: index * 2*chartWidth/(categories.length*2.5) + (chartWidth - 2*chartWidth/(categories.length*2.5) * (categories.length-1))/2,
                    cy: chartHight/2,
                    r: size(Math.sqrt(d[encoding.size.field]/Math.PI))
                }
                if (inArea(point, area)) {
                    hoverCategory = d[encoding.color.field].toString();
                    hoverValue = d[encoding.size.field];
                    return 'yellow';
                } 

                // else {
                //     let index = seriesKeys.indexOf(d.series);
                //     return color(index);
                // }
            });
        if (animationType === ChartAnimationType.EMPHASIZE_VALUE) {
            choosenAnimation.spec.category = hoverCategory;
            choosenAnimation.spec.value = hoverValue;
            choosenAnimation.description = "Emphasize the value of " + hoverCategory;
        } else {
            choosenAnimation.spec.category1 = hoverCategory;
            choosenAnimation.spec.value1 = hoverValue;
            choosenAnimation.description = "Compare between the values of " + hoverCategory + " and the other one";
        }
        props.chooseChartAnimation(choosenAnimation);
        
    }else if(animationType === ChartAnimationType.EMPHASIZE_EXTREME || animationType === ChartAnimationType.COMPARE_EXTREMES || animationType === ChartAnimationType.RECONFIGURE_ORDER){

    }

    //Show Legend
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

}

export default draw;