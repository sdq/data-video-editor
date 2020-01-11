import * as d3 from 'd3';
import { getSeries } from '../../helper';

const draw = (animation, props) => {
    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content');
    let items = content.selectAll(".data-item");
    
    let data = props.data;
    let series = getSeries(data, encoding); 
    animation.spec.series1 = animation.spec.series1 && animation.spec.series1 !== "all" ? animation.spec.series1:series[0];
    animation.spec.series2 = animation.spec.series2 && animation.spec.series2 !== "all" ? animation.spec.series2:series[1];
    animation.description = "Compare the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";

    //because of hovering
    items.attr("stroke-width", 0);
    //because of datatrend
    svg.select(".chart").attr("opacity", 1);
    svg.selectAll(".temporal-content").remove();
    
    if(animation.spec.effect === "superposition"){
        const tick = 8;
            let left = items.filter(d => d[encoding.color.field] !== animation.spec.series1 && d[encoding.color.field] !== animation.spec.series2);

            left.attr("fill-opacity", 0.5)
                .transition()
                .duration(animation.duration / tick * 2)
                .attr("fill-opacity", 0.06);

            let items1 = items.filter(d => d[encoding.color.field] === animation.spec.series1);
            let color1 = d3.select(items1.nodes()[0]).attr('fill');
            color1 = d3.color(color1).brighter();
            items1.attr("stroke", color1)
                .attr("stroke-width", 2)
                .attr("stroke-opacity", 0)
                .transition()
                .duration(animation.duration / tick * 2)
                .attr("stroke-opacity", 1);

            let items2 = items.filter(d => d[encoding.color.field] === animation.spec.series2);
            let color2 = d3.select(items2.nodes()[0]).attr('fill');
            color2 = d3.color(color2).brighter();
            items2.attr("stroke", color2)
                .attr("stroke-width", 2)
                .attr("stroke-opacity", 0)
                .transition()
                .duration(animation.duration / tick * 2)
                .attr("stroke-opacity", 1);
            
            let sorted1 = items1.nodes().sort((item1, item2) => {
                let _item1 = d3.select(item1),
                    _item2 = d3.select(item2);
                
                return parseFloat(_item2.attr("cx") - parseFloat(_item1.attr("cx")));
            });
            let text1 = content.append("text")
                .attr("font-size", 18)
                .attr("font-weight", 2)
                .attr("x", (parseFloat(d3.select(sorted1[0]).attr('cx'))+ parseFloat(d3.select(sorted1[sorted1.length - 1]).attr('cx'))) / 2)
                .attr("y", (parseFloat(d3.select(sorted1[0]).attr('cy')) + parseFloat(d3.select(sorted1[sorted1.length - 1]).attr('cy'))) / 2)
                //.attr("text-anchor", "middle")
                .text(animation.spec.series1)
                .attr("opacity", 0);
            text1
                .transition()
                .delay(animation.duration / tick * 2)
                .duration(animation.duration / tick * 2)
                .attr("opacity", 1);

            let sorted2 = items2.nodes().sort((item1, item2) => {
                let _item1 = d3.select(item1),
                    _item2 = d3.select(item2);
                
                return parseFloat(_item2.attr("cx") - parseFloat(_item1.attr("cx")));
            });
            let text2 = content.append("text")
                .attr("font-size", 18)
                .attr("font-weight", 2)
                .attr("x", (parseFloat(d3.select(sorted2[0]).attr('cx'))+ parseFloat(d3.select(sorted2[sorted2.length - 1]).attr('cx'))) / 2)
                .attr("y", (parseFloat(d3.select(sorted2[0]).attr('cy')) + parseFloat(d3.select(sorted2[sorted2.length - 1]).attr('cy'))) / 2)
                //.attr("text-anchor", "middle")
                .text(animation.spec.series2)
                .attr("opacity", 0);
            text2
                .transition()
                .delay(animation.duration / tick * 2)
                .duration(animation.duration / tick * 3)
                .attr("opacity", 1);

            setTimeout(function(){
                left
                    .transition()
                    .duration(animation.duration / tick)
                    .attr("fill-opacity", 0.5);

                items1
                    .transition()
                    .duration(animation.duration / tick)
                    .attr("stroke-width", 0);
                
                items2
                    .transition()
                    .duration(animation.duration / tick)
                    .attr("stroke-width", 0);

                text1.remove();
                text2.remove();
            }, animation.duration / tick * (tick - 1));
        }

    return svg;
}

export default draw;