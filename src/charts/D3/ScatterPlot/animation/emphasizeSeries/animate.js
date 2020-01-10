import * as d3 from 'd3';

const draw = (animation, props) => {
    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content');
    let items = content.selectAll(".data-item");

    //because of hovering
    items.attr("stroke-width", 0);
    //because of datatrend
    svg.select(".chart").attr("opacity", 1);
    svg.selectAll(".temporal-content").remove();
    
    if(animation.spec.effect === "flicker"){
        const tick = 12;
        let text = content.append("text")
            .attr("font-size", 18)
            .attr("font-weight", 2)
            .attr("x", 30)
            .attr("y", 30)
            .text(animation.spec.series)
            .attr("opacity", 0);
        
        if(animation.spec.series !== "all"){
            items = items.filter(d => d[encoding.color.field] === animation.spec.series);
            text
                .transition()
                .duration(animation.duration / tick * 2)
                .attr("opacity", 1);
        }
               
        items.attr("stroke", "#FAE7A5")
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0)
            .transition()
            .duration(animation.duration / tick)
            .attr("stroke-opacity", 1);

        let count = 0;
        let timeid = setInterval(function(){
            count ++;
            items.attr("fill-opacity", 0.5)
                .transition()
                .duration(animation.duration / tick * 2)
                .attr("fill-opacity", 0)
                .transition()
                .duration(animation.duration / tick * 2)
                .attr("fill-opacity", 0.5);
            if(count === 2) clearInterval(timeid);
        }, animation.duration / tick * 4);

        /*clear */
        setTimeout(function(){
            items
                .transition()
                .duration(animation.duration / tick)
                .attr("stroke-width", 0);
            text.remove();
        }, animation.duration / tick * (tick - 1));

    }else if(animation.spec.effect === "filter"){
        const tick = 8;
        if(animation.spec.series === "all"){
            
        }else{
            let left = items.filter(d => d[encoding.color.field] !== animation.spec.series);

            left.attr("fill-opacity", 0.5)
                .transition()
                .duration(animation.duration / tick * 5)
                .attr("fill-opacity", 0.06);

            items = items.filter(d => d[encoding.color.field] === animation.spec.series);
            items.attr("stroke", "#FAE7A5")
                .attr("stroke-width", 2)
                .attr("stroke-opacity", 0)
                .transition()
                .duration(animation.duration / tick * 5)
                .attr("stroke-opacity", 1);
            
            let text = content.append("text")
                .attr("font-size", 18)
                .attr("font-weight", 2)
                .attr("x", 30)
                .attr("y", 30)
                .text(animation.spec.series)
                .attr("opacity", 0);
            text
                .transition()
                .duration(animation.duration / tick * 6)
                .attr("opacity", 1);

            setTimeout(function(){
                left
                    .transition()
                    .duration(animation.duration / tick)
                    .attr("fill-opacity", 0.5);

                items
                    .transition()
                    .duration(animation.duration / tick)
                    .attr("stroke-width", 0);

                text.remove();
            }, animation.duration / tick * (tick - 1));
        }
    }
    return svg;
}

export default draw;