import * as d3 from 'd3';

const draw = (animation, props) => {
    const data = props.data;
    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content');
    let items = content.selectAll(".data-item");

    //because of hovering
    items.attr("stroke-width", 0);
    //because of datatrend
    svg.select(".chart").attr("opacity", 1);
    svg.selectAll(".temporal-content").remove();

    function getExtremeValue(series, channel, extreme){
        let _data = data;
        if(series !== "all"){
            _data = _data.filter(d => d[encoding.color.field] === series);
        }
        if(extreme === "max"){
            return d3.max(_data, d => d[encoding[channel].field]);
        }else if(extreme === "min"){
            return d3.min(_data, d => d[encoding[channel].field]);
        }
    }

    const {series, channel, value, effect} = animation.spec;
    //extreme
    const extremeValue = getExtremeValue(series, channel, value);
    //value
    const position = value.slice(1,-1).split(",");

    const animation_g = content.append('g');
    if(effect === "circle"){
        const tick = 12;

        if(series !== "all"){
            items = items.filter(d => d[encoding.color.field] === series);
        }
        if(value === "max" || value === "min"){
            items = items.filter(d => d[encoding[channel].field] === extremeValue);
        }else{
            items = items.filter(d => d[encoding.x.field] === Number(position[0]) && d[encoding.y.field] === Number(position[1]));
        }

        /*draw circle */
        let circle_data = items.nodes().map(item => {
            const _item = d3.select(item);
            return {
                "x": parseFloat(_item.attr("cx")),
                "y": parseFloat(_item.attr("cy")),
                "startAngle":0,
                "endAngle": 2 * Math.PI
            }
        });
        let arc = d3.arc()
                .innerRadius(16)
                .outerRadius(18);
        animation_g.selectAll("path.animation")
            .data(circle_data)
            .enter().append("path")
            .attr("class", "animation")
            .attr("stroke", "red")
            .attr("fill", "red")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("transform", d => "translate("+ d.x + "," + d.y + ")")
            .attr("d", arc)
            .transition()
            .duration(animation.duration / tick * (tick - 1))
            .attrTween('d', function(d) {
                var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                return function(t) {
                    d.endAngle = i(t);
                    return arc(d);
                }
            });
            /*clear */
            setTimeout(function(){
                animation_g.remove();
            }, animation.duration / tick * (tick - 1));
    }else if(effect === "flicker"){
        const tick = 12;
        let str = encoding[channel].field + ": ";
        
        if(series !== "all"){
            items = items.filter(d => d[encoding.color.field] === series);
        }
        if(value === "max" || value === "min"){
            items = items.filter(d => d[encoding[channel].field] === extremeValue);
        }else{
            items = items.filter(d => {
                return d[encoding.x.field] === Number(position[0]) && d[encoding.y.field] === Number(position[1])
            });
        }

        /* text */
        items.nodes().forEach(item => {
            const _item = d3.select(item);
            const x = parseFloat(_item.attr("cx")), 
                y = parseFloat(_item.attr("cy"));
            const item_data = _item.data()[0];

            animation_g.append("line")
                .attr("x1", x)
                .attr("y1", y + 15)
                .attr("x2", x)
                .attr("y2", y + 15)
                .attr("class", "animation")
                .attr("stroke", "#000")
                .transition()
                .duration(animation.duration / tick)
                .attr("y2", y + 30);
            
            let text = animation_g.append("text")
                .attr("font-size", 12)
                .attr("font-weight", 2)
                .attr("class", "animation")
                .text(str + item_data[encoding[channel].field])
                .attr("x", x)
                .attr("text-anchor", "middle")
                .attr("y", y + 45)
                .style("background","#fff")
                .attr("opacity", 0);

            setTimeout(function(){
                text.transition()
                    .duration(animation.duration / tick)
                    .attr("opacity", 1);
            }, animation.duration / tick);
        });
        
        /*stroke */
        items.attr("stroke", "#FAE7A5")
            .attr("stroke-width", 3)
            .attr("stroke-opacity", 0)
            .transition()
            .duration(animation.duration / tick * 2)
            .attr("stroke-opacity", 1);

        /*flicker */
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
            animation_g.remove();
        }, animation.duration / tick * (tick - 1));

    }else if(effect === "filter"){
        const tick = 10;

        let extreme_item = items;
        let str = encoding[channel].field + ": ";

        if(series !== "all"){
            extreme_item = extreme_item.filter(d => d[encoding.color.field] === series);
            if(value === "max" || value === "min"){
                items = items.filter(d => d[encoding.color.field] !== series || d[encoding[channel].field] !== extremeValue);
            }else{
                items = items.filter(d => d[encoding.color.field] !== series || d[encoding.x.field] !== Number(position[0]) || d[encoding.y.field] !== Number(position[1]));
            }
        }else{
            if(value === "max" || value === "min"){
                items = items.filter(d => d[encoding[channel].field] !== extremeValue);
            }else{
                items = items.filter(d => d[encoding.x.field] !== Number(position[0]) || d[encoding.y.field] !== Number(position[1]));
            }
        }
        if(value === "max" || value === "min"){
            extreme_item = extreme_item.filter(d => d[encoding[channel].field] === extremeValue);
        }else{
            extreme_item = extreme_item.filter(d => d[encoding.x.field] === Number(position[0]) && d[encoding.y.field] === Number(position[1]));
        }

        items.attr("fill-opacity", 0.5)
            .transition()
            .duration(animation.duration / tick * 3)
            .attr("fill-opacity", 0.06);

        setTimeout(function(){
            /* text */
            extreme_item.nodes().forEach(item => {
                const _item = d3.select(item);
                const x = parseFloat(_item.attr("cx")), 
                    y = parseFloat(_item.attr("cy"));
                const item_data = _item.data()[0];

                animation_g.append("line")
                    .attr("x1", x)
                    .attr("y1", y)
                    .attr("x2", x)
                    .attr("y2", y)
                    .attr("class", "animation")
                    .attr("stroke", "#000")
                    .transition()
                    .duration(animation.duration / tick * 1)
                    .attr("y2", y + 15);
                
                let text = animation_g.append("text")
                    .attr("font-size", 12)
                    .attr("font-weight", 2)
                    .attr("class", "animation")
                    .text(str + item_data[encoding[channel].field])
                    .attr("x", x)
                    .attr("text-anchor", "middle")
                    .attr("y", y + 30)
                    .style("background", "#fff")
                    .attr("opacity", 0);

                setTimeout(function(){
                    text.transition()
                        .duration(animation.duration / tick)
                        .attr("opacity", 1);
                }, animation.duration / tick * 1);
            });
        }, animation.duration / tick * 3);

        /*clear */
        setTimeout(function(){
            items
                .transition()
                .duration(animation.duration / tick)
                .attr("fill-opacity", 0.5);
            animation_g.remove();
        }, animation.duration / tick * (tick - 1));

    }
    return svg;
}

export default draw;