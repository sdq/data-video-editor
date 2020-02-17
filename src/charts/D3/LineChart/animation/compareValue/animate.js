import * as d3 from 'd3';
import { getSeries } from '../../helper';


const draw = (animation, props) => {
    // const encoding = props.spec.encoding;
    const svg = d3.select('.vis-linechart svg');
    const content = svg.select('.content');
    let items = content.selectAll("path.data-item");

    //because of hovering
    items.attr("stroke-width", 3);
    content.selectAll('circle.data-item')
            .attr('r', 4);
    let data = props.data;
    let encoding = props.spec.encoding;
    let series = Object.keys(getSeries(data, encoding)); 
    animation.spec.series1 = animation.spec.series1 && animation.spec.series1 !== "all" ? animation.spec.series1:series[0];
    if (animation.spec.series2 && animation.spec.series2 !== "all") {
        // animation.spec.series2 = animation.spec.series2;
    } else {
        for(let i=0; i<series.length; i++) {
            if (animation.spec.series1 !== series[i]) {
                animation.spec.series2 = series[i];
                break;
            }
        }
    }
    animation.description = "Compare the " + animation.spec.value + " of the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";


    function getExtremeValue(circles, extreme){
        let selectCircle;
        if(extreme === "max"){
            let maxY = d3.max(circles.nodes(), function(circle) {
                return circle.__data__.y
            });
            circles.nodes().forEach(circle => {
                if(circle.__data__.y === maxY) {
                    selectCircle = circle;
                    // break;
                }
            });
        }else if(extreme === "min"){
            let minY = d3.min(circles.nodes(), function(circle) {
                return circle.__data__.y
            });
            circles.nodes().forEach(circle => {
                if(circle.__data__.y === minY) {
                    selectCircle = circle;
                    // break;
                }
            });
        }
        return selectCircle;
    }

    function getSelectValue(circles, value) {
        let selectCircle;
        const position = value;
        circles.nodes().forEach(circle=>{
            if(circle.__data__.x === position) {
                selectCircle = circle;
            }
        });
        return selectCircle
    }

    let duration = animation.duration;
    let tick = 12;
    const series1 = animation.spec.series1;
    const series2 = animation.spec.series2;
    const value = animation.spec.value;
    let selectCircle1, selectCircle2, itemsCircle1, itemsCircle2;
    itemsCircle1 = content.selectAll('circle.series_' + series1);
    itemsCircle2 = content.selectAll('circle.series_' + series2)

    if (value === 'max' || value === 'min') { // extreme
        selectCircle1 = getExtremeValue(itemsCircle1, value);
        selectCircle2 = getExtremeValue(itemsCircle2, value);
    } else { // value by user
        selectCircle1 = getSelectValue(itemsCircle1, value);
        selectCircle2 = getSelectValue(itemsCircle2, value);
    }
    if(animation.spec.effect === "superposition"){
        let selectCircle1_ = d3.select(selectCircle1);
        const x1 = parseFloat(selectCircle1_.attr('cx')),
              y1 = parseFloat(selectCircle1_.attr('cy'));
        
        let selectCircle2_ = d3.select(selectCircle2);
        const x2 = parseFloat(selectCircle2_.attr('cx')),
              y2 = parseFloat(selectCircle2_.attr('cy'));

        
        // 隐藏其他
        content.selectAll('.data-item')
                .attr('opacity', 1)
                .transition()
                .duration(duration / tick * 3)
                .attr('opacity', function(d) {
                    if (this !== selectCircle1 && this !== selectCircle2) 
                        return 0.1;
                });

        setTimeout(()=>{
            content.append('line')
                .attr('class', 'animation')
                .attr('x1', x1)
                .attr('y1', y1 + 5)
                .attr('x2', x1)
                .attr('y2', y1 + 5)
                .attr('stroke', '#000')
                .attr("stroke-width", 2)
                .transition()
                .delay(duration / tick)
                .duration(duration / tick)
                .attr('y2', y1 + 20)
        
            content.append('text')
                    .attr('class', 'animation')
                    .text(selectCircle1.__data__.y.toFixed(2))
                    .attr("x", x1)
                    .attr("y", y1 + 25)
                    .attr('text-anchor', 'start')
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", 12)
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .attr('text-anchor', 'middle')
                    .attr('opacity', 0)
                    .transition()
                    .delay(duration / tick * 1)
                    .duration(duration / tick * 1)
                    .attr('opacity', 1);
            
            content.append('line')
                .attr('class', 'animation')
                .attr('x1', x2)
                .attr('y1', y2 + 5)
                .attr('x2', x2)
                .attr('y2', y2 + 5)
                .attr('stroke', '#000')
                .attr("stroke-width", 2)
                .transition()
                .delay(duration / tick)
                .duration(duration / tick)
                .attr('y2', y2 + 20)
        
            content.append('text')
                    .attr('class', 'animation')
                    .text(selectCircle2.__data__.y.toFixed(2))
                    .attr("x", x2)
                    .attr("y", y2 + 25)
                    .attr('text-anchor', 'start')
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", 12)
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .attr('text-anchor', 'middle')
                    .attr('opacity', 0)
                    .transition()
                    .delay(duration / tick * 1)
                    .duration(duration / tick * 1)
                    .attr('opacity', 1);
        }, duration / tick * 3);
        // 清除
        setTimeout(()=>{
            content.selectAll('.data-item')
                    .transition()
                    .duration(duration / tick)
                    .attr('opacity', 1);
            d3.selectAll('.animation')
                .transition()
                .duration(duration / tick )
                .attr('opacity', 0)
                .remove();
        }, duration / tick * (tick - 1));
    }else if(animation.spec.effect === "difference"){
        let selectCircle1_ = d3.select(selectCircle1);
        const x1 = parseFloat(selectCircle1_.attr('cx')),
              y1 = parseFloat(selectCircle1_.attr('cy'));
        
        let selectCircle2_ = d3.select(selectCircle2);
        const x2 = parseFloat(selectCircle2_.attr('cx')),
              y2 = parseFloat(selectCircle2_.attr('cy'));

        
        // 隐藏其他
        content.selectAll('.data-item')
                .attr('opacity', 1)
                .transition()
                .duration(duration / tick * 3)
                .attr('opacity', function(d) {
                    if (this !== selectCircle1 && this !== selectCircle2) 
                        return 0.1;
                    // else    return 1
                });

        setTimeout(()=>{
            content.append('line')
                    .attr('class', 'animation')
                    .attr('x1', x1)
                    .attr('y1', y1)
                    .attr('x2', x1)
                    .attr('y2', y1)
                    .attr("stroke-width", 2)
                    .attr("stroke", "red")
                    .attr("stroke-dasharray", "8,4")
                    .transition()
                    .duration(duration / tick)
                    .attr('x2', 0);
            content.append('line')
                    .attr('class', 'animation')
                    .attr('x1', x2)
                    .attr('y1', y2)
                    .attr('x2', x2)
                    .attr('y2', y2)
                    .attr("stroke-width", 2)
                    .attr("stroke", "red")
                    .attr("stroke-dasharray", "8,4")
                    .transition()
                    .duration(duration / tick)
                    .attr('x2', 0);
            content.append('line')
                    .attr('class', 'animation')
                    .attr('opacity', 0)
                    .attr('x1', 0)
                    .attr('y1', y1)
                    .attr('x2', 0)
                    .attr('y2', y2)
                    .attr("stroke-width", 2)
                    .attr("stroke", "red")
                    .transition()
                    .delay(duration / tick * 0.9)
                    .attr('opacity', 1);
            content.append('text')
                    .attr('class', 'animation')
                    .attr('opacity', 0)
                    .text((Math.abs(selectCircle2.__data__.y - selectCircle1.__data__.y)).toFixed(2))
                    .attr('x', 5)
                    .attr('y', (y1+y2) / 2 + 1)
                    .attr('text-anchor', 'start')
                    .attr("dominant-baseline", "middle")
                    .transition()
                    .duration(duration / tick)
                    .attr('opacity', 1);

        }, duration / tick * 3);
        // 清除
        setTimeout(()=>{
            content.selectAll('.data-item')
                    .transition()
                    .duration(duration / tick)
                    .attr('opacity', 1);
            d3.selectAll('.animation')
                .transition()
                .duration(duration / tick )
                .attr('opacity', 0)
                .remove();
        }, duration / tick * (tick - 1));
    }
    return svg;
}

export default draw;