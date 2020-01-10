import * as d3 from 'd3';

const draw = (animation, props) => {
    // const data = props.data;
    // const encoding = props.spec.encoding;
    const svg = d3.select('.vis-linechart svg');
    const content = svg.select('.content');
    let items = content.selectAll("path.data-item");

    //because of hovering
    items.attr("stroke-width", 3);
    content.selectAll('circle.data-item')
            .attr('r', 4);

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
    const series = animation.spec.series;
    const value = animation.spec.value;
    let selectCircle, itemsCircle;
    if (series === 'all') {
        itemsCircle = content.selectAll('circle.data-item');
    } else {
        itemsCircle = content.selectAll('circle.series_' + series)
    }
    if (value === 'max' || value === 'min') { // extreme
        selectCircle = getExtremeValue(itemsCircle, value);
    } else { // value by user
        selectCircle = getSelectValue(itemsCircle, value);
    }
    if(animation.spec.effect === "flicker"){
        let selectCircle_ = d3.select(selectCircle);
        const x = parseFloat(selectCircle_.attr('cx')),
              y = parseFloat(selectCircle_.attr('cy'));
        
        // 圆环
        content.append('circle')
            .attr('class', 'animation')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 7)
            .style('fill-opacity', 0)
            .style('stroke', '#F9E38E')
            .style('stroke-width', 2)
            .style('stroke-opacity', 0)
            .transition()
            .duration(duration / tick * 2)
            .style('stroke-opacity', 1);
        // 线
        content.append('line')
                .attr('class', 'animation')
                .attr('x1', x)
                .attr('y1', y + 15)
                .attr('x2', x)
                .attr('y2', y + 15)
                .attr('stroke', '#000')
                .attr("stroke-width", 2)
                .transition()
                .delay(duration / tick)
                .duration(duration / tick)
                .attr('y2', y + 30)
        
        content.append('text')
                .attr('class', 'animation')
                .text(selectCircle.__data__.y.toFixed(2))
                .attr("x", x)
                .attr("y", y + 45)
                .attr('text-anchor', function () {
                    if (x - this.getComputedTextLength()/2 < 0) {
                        return 'start';
                    }      
                    else if (x + this.getComputedTextLength()/2 > content.attr('chartWidth'))
                        return 'end';
                    else return 'middle';
                })
                .attr("font-size", 12)
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .attr('opacity', 0)
                .transition()
                .delay(duration / tick * 1)
                .duration(duration / tick * 1)
                .attr('opacity', 1);
        
        // 闪烁
        setTimeout(()=>{
            let count = 0;
            let timeId = setInterval(function(){
                count ++;
                selectCircle_.transition()
                            .duration(animation.duration / tick * 1)
                            .attr('opacity', 0)
                            .transition()
                            .duration(animation.duration / tick * 1)
                            .attr('opacity', 1)
                if (count === 3) clearInterval(timeId);
            }, duration / tick * 2)
        }, duration / tick * 2)
        
        
        // 结束清除
        setTimeout(function() {
            d3.selectAll('.animation')
                .transition()
                .duration(duration / tick )
                .attr('opacity', 0)
                .remove()
        }, duration / tick * (tick - 1))
        

    }else if(animation.spec.effect === "filter"){
        let selectCircle_ = d3.select(selectCircle);
        const x = parseFloat(selectCircle_.attr('cx')),
              y = parseFloat(selectCircle_.attr('cy'));

        // 隐藏其他
        content.selectAll('.data-item')
                .attr('opacity', 1)
                .transition()
                .duration(duration / tick * 3)
                .attr('opacity', function(d) {
                    if (this !== selectCircle) 
                        return 0.1;
                });
        // 线
        setTimeout(()=>{
            content.append('line')
                .attr('class', 'animation')
                .attr('x1', x)
                .attr('y1', y + 10)
                .attr('x2', x)
                .attr('y2', y + 10)
                .attr('stroke', '#000')
                .attr("stroke-width", 2)
                .transition()
                .delay(duration / tick)
                .duration(duration / tick)
                .attr('y2', y + 25)
        
        content.append('text')
                .attr('class', 'animation')
                .text(selectCircle.__data__.y.toFixed(2))
                .attr("x", x)
                .attr("y", y + 40)
                .attr('text-anchor', 'middle')
                .attr("font-size", 12)
                .attr("font-weight", "bold")
                .attr("fill", "black")
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
        
    } else if(animation.spec.effect === "circle") {
        let selectCircle_ = d3.select(selectCircle)
        // draw arc
        let arc_data = [{
            'x': parseFloat(selectCircle_.attr('cx')),
            'y': parseFloat(selectCircle_.attr('cy')),
            "startAngle":0,
            "endAngle": 2 * Math.PI
        }]
        let arc = d3.arc()
                    .innerRadius(10)
                    .outerRadius(12);
        content.selectAll("path.animation")
                    .data(arc_data)
                    .enter()
                    .append("path")
                    .attr("class", "animation")
                    .attr("stroke", "red")
                    .attr("fill", "red")
                    .attr("x", d => d.x)
                    .attr("y", d => d.y)
                    .attr("transform", d => "translate("+ d.x + "," + d.y + ")")
                    .attr("d", arc)
                    .transition()
                    .duration(duration / tick * (tick - 1))
                    .attrTween('d', function(d) {
                        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                        return function(t) {
                            d.endAngle = i(t);
                            return arc(d);
                        }
                    });
        /*clear */
        setTimeout(function(){
            d3.selectAll("path.animation").remove();
        }, duration / tick * (tick - 1));
    }
    return svg;
}



export default draw;