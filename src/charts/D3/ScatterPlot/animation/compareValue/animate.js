import * as d3 from 'd3';
import { getSeries } from '../../helper';

const draw = (animation, props) => {
    const data = props.data;
    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content'),
        chartHeight = content.attr("chartHeight");
    let items = content.selectAll(".data-item");

    let series = getSeries(data, encoding); 
    animation.spec.series1 = animation.spec.series1 && animation.spec.series1 !== "all" ? animation.spec.series1:series[0];
    animation.spec.series2 = animation.spec.series2 && animation.spec.series2 !== "all" ? animation.spec.series2:series[1];
    animation.description = "Compare the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";

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

    const {series1, value1, series2, value2, channel ,effect} = animation.spec;

    /*series */
    let items1 = items.filter(d => d[encoding.color.field] === series1);
    let items2 = items.filter(d => d[encoding.color.field] === series2);

    if(value1 === "max" || value1 === "min"){
        const extremeValue = getExtremeValue(series1, channel, value1);
        items1 = items1.filter(d => d[encoding[channel].field] === extremeValue);
    }else{
        const position = value1.slice(1,-1).split(",");
        items1 = items1.filter(d => d[encoding.x.field] === Number(position[0]) && d[encoding.y.field] === Number(position[1]));
    }

    if(value2 === "max" || value2 === "min"){
        const extremeValue = getExtremeValue(series2, channel, value2);
        items2 = items2.filter(d => d[encoding[channel].field] === extremeValue);
    }else{
        const position = value2.slice(1,-1).split(",");
        items2 = items2.filter(d => d[encoding.x.field] === Number(position[0]) && d[encoding.y.field] === Number(position[1]));
    }

    let left = items.filter(function(){ return items1.nodes().indexOf(this) === -1 && items2.nodes().indexOf(this) === -1 });

    const tick = 10,
        duration = animation.duration / tick;

    left.attr("fill-opacity", 0.5)
        .transition()
        .duration(duration * 2)
        .attr("fill-opacity", 0.06);

    let compare_items = items.filter(function(){ return items1.nodes().indexOf(this) !== -1 || items2.nodes().indexOf(this) !== -1 });
    //let compare_items = items1.merge(items2);

    let animation_g = content.append('g');
    if (effect === "superposition") {
        compare_items.attr("stroke", "#FAE7A5")
            .attr("stroke-width", 3)
            .attr("stroke-opacity", 0)
            .transition()
            .duration(duration * 2)
            .attr("stroke-opacity", 1);
        
        /* text */
        let array = [items1, items2];
        array.forEach((_items, i) => {
            _items.nodes().forEach(item => {
                const _item = d3.select(item);
                const x = parseFloat(_item.attr("cx")), 
                    y = parseFloat(_item.attr("cy"));
                const item_data = _item.data()[0];
    
                animation_g.append("line")
                    .attr("x1", x)
                    .attr("y1", y + 10)
                    .attr("x2", x)
                    .attr("y2", y + 10)
                    .attr("stroke", "#000")
                    .transition()
                    .delay(duration * 2 + i * 2 * duration)
                    .duration(duration)
                    .attr("y2", y + 30);
                
                animation_g.append("text")
                    .text(encoding[channel].field + ": " + item_data[encoding[channel].field])
                    .attr("x", x)
                    .attr("y", y + 40)
                    .attr("font-size", 12)
                    .attr("font-weight", 2)
                    .attr("text-anchor", "middle")
                    .attr("opacity", 0)
                    .transition()
                    .delay(duration * 3 + i * 2 * duration)
                    .duration(duration)
                    .attr("opacity", 1); 
            });
        });
    } else if (effect === "difference"){
        let difference = Math.abs(items1.data()[0][encoding[channel].field] - items2.data()[0][encoding[channel].field]);
            
        if(channel === "x"){
            let x = [{
                x: parseFloat(items1.attr("cx")),
                y: parseFloat(items1.attr("cy")) + parseFloat(items1.attr("r"))
            }, {
                x: parseFloat(items2.attr("cx")),
                y: parseFloat(items2.attr("cy")) + parseFloat(items2.attr("r"))
            }];
            x.sort((a,b) => a.x - b.x);
            animation_g.selectAll("line")
                .data(x)
                .enter().append("line")
                .attr("x1", d => d.x)
                .attr("x2", d => d.x)
                .attr("y1", d => d.y)
                .attr("y2", d => d.y)
                .attr("stroke", "red")
                .attr("stroke-dasharray", "5,5")
                .transition()
                .delay((d, i) => duration * 2 + i * 2 * duration)
                .duration(duration)
                .attr("y2", chartHeight);

            animation_g.append("line")
                .attr("y1", chartHeight)
                .attr("y2", chartHeight)
                .attr("x1", x[0].x)
                .attr("x2", x[1].x)
                .attr("stroke", "red")
                .attr("opacity", 0)
                .transition()
                .delay(5 * duration)
                .duration(duration)
                .attr("opacity", 1);
            
            animation_g.append("text")
                .attr("y", chartHeight - 20)
                .attr("x", (x[0].x + x[1].x) / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", 12)
                .attr("font-weight", 2)
                .attr("opacity", 0)
                .text(difference)
                .transition()
                .delay(6 * duration)
                .duration(duration)
                .attr("opacity", 1);

        }else if(channel === "y"){
            let y = [{
                x: parseFloat(items1.attr("cx")) - parseFloat(items1.attr("r")),
                y: parseFloat(items1.attr("cy"))
            }, {
                x: parseFloat(items2.attr("cx")) - parseFloat(items2.attr("r")),
                y: parseFloat(items2.attr("cy"))
            }];
            y.sort((a,b) => a.y - b.y);

            animation_g.selectAll("line")
                .data(y)
                .enter().append("line")
                .attr("class", "animation")
                .attr("x1", d => d.x)
                .attr("x2", d => d.x)
                .attr("y1", d => d.y)
                .attr("y2", d => d.y)
                .attr("stroke", "red")
                .attr("stroke-dasharray", "5,5")
                .transition()
                .delay((d, i) => duration * 2 + i * 2 * duration)
                .duration(duration)
                .attr("x1", 0);

            animation_g.append("line")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", y[0].y)
                .attr("y2", y[1].y)
                .attr("stroke", "red")
                .attr("opacity", 0)
                .transition()
                .delay(5 * duration)
                .duration(duration)
                .attr("opacity", 1);
            
            animation_g.append("text")
                .attr("y", (y[0].y + y[1].y) / 2)
                .attr("x", 20)
                .attr("text-anchor", "middle")
                .attr("font-size", 12)
                .attr("font-weight", 2)
                .attr("opacity", 0)
                .text(difference)
                .transition()
                .delay(6 * duration)
                .duration(duration)
                .attr("opacity", 1);
        }
    }

    /* clear */
    left.transition()
        .delay(duration * (tick -1))
        .duration(duration)
        .attr("fill-opacity", 0.5);

    compare_items.transition()
        .delay(duration * (tick -1))
        .duration(duration)
        .attr("stroke-width", 0);

    setTimeout(() => {
        animation_g.remove();
    }, duration * (tick -1));
    return svg;
}

export default draw;