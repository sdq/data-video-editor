import * as d3 from 'd3';
import { getLeastSquares } from '../../helper';

const draw = (animation, props) => {
    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content'),
        items = content.selectAll(".data-item"),
        chartWidth = content.attr("chartWidth"),
        chartHeight = content.attr("chartHeight");
        
    //because of hovering
    items.attr("stroke-width", 0);
    //because of datatrend
    svg.select(".chart").attr("opacity", 1);
    svg.selectAll(".temporal-content").remove();
    
    /*Regression */
    let x1 = 0,
        x2 = chartWidth,
        _items = items;
    if(animation.spec.series !== "all"){
        _items = _items.filter(d => d[encoding.color.field] === animation.spec.series);
    }
    const X = _items.nodes().map(item => parseFloat(d3.select(item).attr("cx"))),
        Y = _items.nodes().map(item => parseFloat(d3.select(item).attr("cy")));
    const ret = getLeastSquares(X, Y);

    //regression in range, can not out of content
    let x_ymin = (chartHeight - ret.b) / ret.m,
        x_ymax = (0 - ret.b) / ret.m;

    if(x_ymin > x_ymax){
        const i = x_ymin;
        x_ymin = x_ymax;
        x_ymax = i;
    }
    x1 = x1 < x_ymin ? x_ymin : x1;
    x2 = x2 > x_ymax ? x_ymax : x2;

    const tick = 5;
    if(animation.spec.effect === "grow"){
        if(animation.spec.series === "all"){
            let regression_line = content.append("line")
                .attr("x1", x1)
                .attr("y1", ret.m * x1 + ret.b)
                .attr("x2", x1)
                .attr("y2", ret.m * x1 + ret.b)
                .attr("stroke-width", 2)
                .attr("stroke", "red")
                .attr("stroke-dasharray","5,5")
                .attr("opacity", 0.8);
            regression_line
                .transition()
                .duration(animation.duration / tick * (tick - 1))
                .attr("x2", x2)
                .attr("y2", ret.m * x2 + ret.b);

            regression_line
                .transition()
                .delay(animation.duration / tick * (tick - 1))
                .duration(animation.duration / tick)
                .attr("opacity", 0);
           
            setTimeout(function(){
                regression_line.remove();
            }, animation.duration);
        }else{       
            let left = items.filter(d => d[encoding.color.field] !== animation.spec.series);  
            left.attr("fill-opacity", 0.5)
                .transition()
                .duration(animation.duration / tick)
                .attr("fill-opacity", 0);

            let regression_line = content.append("line")
                .attr("x1", x1)
                .attr("y1", ret.m * x1 + ret.b)
                .attr("x2", x1)
                .attr("y2", ret.m * x1 + ret.b)
                .attr("stroke-width", 2)
                .attr("stroke", "red")
                .attr("stroke-dasharray","5,5")
                .attr("opacity", 0.8);
            regression_line
                .transition()
                .duration(animation.duration / tick * (tick-2))
                .attr("x2", x2)
                .attr("y2", ret.m * x2 + ret.b)
                
            left.transition()
                .delay(animation.duration / tick * (tick - 1))
                .duration(animation.duration / tick)
                .attr("fill-opacity", 0.5);
            regression_line
                .transition()
                .delay(animation.duration / tick * (tick - 1))
                .duration(animation.duration / tick)
                .attr("opacity", 0);
            
            setTimeout(function(){
                regression_line.remove();
            }, animation.duration);
        }
    }else if(animation.spec.effect === "fadeIn"){
        if(animation.spec.series === "all"){
            let regression_line = content.append("line")
                .attr("x1", x1)
                .attr("y1", ret.m * x1 + ret.b)
                .attr("x2", x2)
                .attr("y2", ret.m * x2 + ret.b)
                .attr("stroke-width", 2)
                .attr("stroke", "red")
                .attr("stroke-dasharray","5,5");
            regression_line.attr("opacity", 0)
                .transition()
                .duration(animation.duration / tick * (tick - 1))
                .attr("opacity", 0.8);

            regression_line
                .transition()
                .delay(animation.duration / tick * (tick - 1))
                .duration(animation.duration / tick)
                .attr("opacity", 0);

            setTimeout(function(){
                regression_line.remove();
            }, animation.duration);
        }else{
            let left = items.filter(d => d[encoding.color.field] !== animation.spec.series);  
            left.attr("fill-opacity", 0.5)
                .transition()
                .duration(animation.duration / tick)
                .attr("fill-opacity", 0);

            let regression_line = content.append("line")
                .attr("x1", x1)
                .attr("y1", ret.m * x1 + ret.b)
                .attr("x2", x2)
                .attr("y2", ret.m * x2 + ret.b)
                .attr("stroke-width", 2)
                .attr("stroke", "red")
                .attr("stroke-dasharray","5,5");
            regression_line.attr("opacity", 0)
                .transition()
                .duration(animation.duration / tick * (tick-2))
                .attr("opacity", 0.8);

            left.transition()
                .delay(animation.duration / tick * (tick - 1))
                .duration(animation.duration / tick)
                .attr("fill-opacity", 0.5);
            regression_line
                .transition()
                .delay(animation.duration / tick * (tick - 1))
                .duration(animation.duration / tick)
                .attr("opacity", 0);

            setTimeout(function(){
                regression_line.remove();
            }, animation.duration);
        }
    }
    return svg;
}

export default draw;