import * as d3 from 'd3';
import { getSeries } from '../../helper';


const draw = (animation, props) => {
    // const encoding = props.spec.encoding;
    const svg = d3.select('.vis-linechart svg');
    const content = svg.select('.content');
    let items = content.selectAll("path.data-item");

    //because of hovering
    items.attr("stroke-width", 3);

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
    animation.description = "Compare the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";
    let duration = animation.duration;
    let tick = 12;
    if(animation.spec.effect === "superposition"){
        // 隐藏其他没被选中的path      
        content.selectAll('.data-item')
            .transition()
            .duration(duration / tick * 2)
            .attr('opacity', function() {
                if (!d3.select(this).classed('series_' + animation.spec.series1) && !d3.select(this).classed('series_' + animation.spec.series2))
                    return 0.1;
             });
            
        // 显示第一个信息
        [animation.spec.series1, animation.spec.series2].forEach((s, i)=> {
            let lastCircle = d3.selectAll('circle.series_'+s).nodes().slice(0,1);
            lastCircle = d3.select(lastCircle[0]);
            const x = parseFloat(lastCircle.attr('cx')),
                  y = parseFloat(lastCircle.attr('cy'));
            content.append('line')
                    .attr('class', 'animation')
                    .attr('x1', x + 5)
                    .attr('y1', y)
                    .attr("x2", x + 5)
                    .attr("y2", y)
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("opacity", 1)
                    .transition()
                    .delay(duration / tick * (2 * i + 1)) // 1 3
                    .duration(duration / tick)
                    .attr("x2", x + 15)
                    .attr("y2", y);
            content.append('text')
                    .attr('class', 'animation')
                    .attr('x', x + 20)
                    .attr('y', y)
                    .transition()
                    .delay(duration / tick * (2 * (i+1))) // 2 4
                    .duration(duration / tick)
                    .text(s)
                    .attr('text-anchor', 'start')
                    .attr("font-size", 12)
                    .attr("fill", "black")
                    .attr("dominant-baseline", "middle")
        })
        setTimeout(()=>{
            content.selectAll('.animation')
                .transition()
                .duration(duration / tick)
                .attr('opacity', 0)
                .remove();
            content.selectAll('.data-item')
                    .transition()
                    .duration(duration / tick)
                    .attr('opacity', 1)
        }, duration / tick * (tick - 1))
    }else if(animation.spec.effect === "difference"){
        // 隐藏未被选中的
        content.selectAll('.data-item')
            .attr('opacity', function() {
                if (!d3.select(this).classed('series_' + animation.spec.series1) && !d3.select(this).classed('series_' + animation.spec.series2))
                    return 0;
            });
        // 获取两组点
        let circles1 = content.selectAll('circle.series_' + animation.spec.series1).nodes();
        let circles2 = content.selectAll('circle.series_' + animation.spec.series2).nodes();

        circles1 = circles1.sort((item1, item2) => {
            let _item1 = d3.select(item1),
                _item2 = d3.select(item2);
            return parseFloat(_item1.attr('cx')) - parseFloat(_item2.attr('cx'));
        })
        
        circles2 = circles2.sort((item1, item2) => {
            let _item1 = d3.select(item1),
                _item2 = d3.select(item2);
            return parseFloat(_item1.attr('cx')) - parseFloat(_item2.attr('cx'));
        })

        let differences = [];
        let differencesInValue = []
        circles1.forEach((_, index)=>{
            const oneD = [d3.select(circles1[index]).attr('cx'), parseFloat(d3.select(circles1[index]).attr('cy')),
            parseFloat(d3.select(circles2[index]).attr('cy')) - parseFloat(d3.select(circles1[index]).attr('cy'))]
            let one = {}
            one['x']= d3.select(circles1[index]).attr('cx')
            one['y1'] = (d3.select(circles1[index]).node().__data__.y - d3.select(circles2[index]).node().__data__.y).toFixed(2)
            one['y'] = parseFloat(d3.select(circles1[index]).attr('cy')) - parseFloat(d3.select(circles2[index]).attr('cy'))
            differencesInValue.push(one)
            differences.push(oneD);
        })

        let xx = content.append('line').attr('opacity', 0).attr('class', 'animation')
        let yx = content.append('line').attr('opacity', 0).attr('class', 'animation')
        // 划线
        differences.forEach((d, index)=>{
            content.append('line')
                    .data([d, index])
                    .attr('class', 'diffline animation')
                    .transition()
                    .delay(function() {
                        return duration / tick * 3 / differences.length * index;
                    })
                    .attr('x1', d[0])
                    .attr('y1', d[1])
                    .attr('x2', d[0])
                    .attr('y2', d[1])
                    // .attr('z-index', 100)
                    .attr("stroke-width", 3)
                    .attr("stroke", function() {
                        if(d[2] > 0)
                            return '#fae38d';
                        else    return '#ee8897'
                    })
                    .attr("opacity", 1)
                    .transition()
                    .duration(duration / tick * 3 / differences.length)
                    .attr('y2', d[1] + d[2]) 
        })

        // 隐藏元素
        setTimeout(()=>{
            d3.selectAll('.data-item')
                .attr('opacity', 0);
            d3.selectAll('.axis')
                .style('display', 'none');
        }, duration / tick * 4)
        

        // 画新轴
        const chartWidth = content.attr('chartWidth'),
              chartHeight = content.attr('chartHeight')
        // x轴
        xx.attr('x1', 0 )
                .attr('y1', chartHeight / 2)
                .attr('x2', chartWidth)
                .attr('y2', chartHeight / 2)
                .attr("stroke-width", 2)
                .attr("stroke", '#778094')
                .transition()
                .delay(duration / tick * 5)
                .attr("opacity", 1)
        // let yx = content.append('line')/
        yx.attr('x1', 0 )
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', chartHeight)
                // .attr('z-index', -1)
                .attr("stroke-width", 2)
                .attr("stroke", '#778094')
                .transition()
                .delay(duration / tick * 5)
                .attr("opacity", 1)
        
        content.append('text')
            .attr('class', 'animation')
            .text(animation.spec.series1 + " - " + animation.spec.series2)
            .attr('x', 10)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr('fill', '#778094')
            .attr("opacity", 0)
            .transition()
            .delay(duration / tick * 5)
            .attr("opacity", 1)

        // 移动差值线到轴上
        content.selectAll('line.diffline')
                .transition()
                .delay(duration / tick * 5)
                .duration(duration / tick)
                .attr('y1', function(d) {
                    if (d[2] >= 0){
                        return chartHeight / 2 - Math.abs(d[2])
                }
                    else    return chartHeight / 2

                })
                .attr('y2', function(d) {
                    if (d[2] >= 0)   return chartHeight / 2;
                    else {
                        return chartHeight / 2 + Math.abs(d[2])
                    }
                })
        
            
        
        // 连线
        var lineGen = d3.line()
            .x(function(d) {
                // return xScale(d.x);
                return d.x;
            })
            .y(function(d) {
                return chartHeight / 2 + d.y;
            });
        content.append('path')
            // .attr('transform', 'translate(0, ' + chartHeight / 2 - differencesInValue[0].y+ ')')
                .attr('stroke', '')
                .attr('fill', 'none')
                .data(differencesInValue)
                .attr('d', lineGen(differencesInValue))
                .transition()
                .delay(duration / tick * 7)
                .attr('opcacity', 1)
                .attr('stroke', '#778094')
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('class', 'animation');
        
        content.selectAll('.diffText')
                .data(differencesInValue)
                .enter()
                .append('text')
                .attr('opacity', 0)
                .attr('fill', '#778094')
                .attr('font-size', 12)
                .text(d=>d.y1)
                .attr('x', d=> d.x)
                .attr('y', d=> { 
                    if (d.y > 0) return chartHeight / 2 + d.y + 15;
                    else return chartHeight / 2 + d.y - 15
                })
                .attr('text-anchor', 'middle')
                .attr('class', 'animation')
                .transition()
                .delay(duration / tick * 7)
                .attr('opacity', 1)

        
        setTimeout(()=>{
            d3.selectAll('.animation')
                .remove();
            d3.selectAll('.data-item')
                .transition()
                .duration(duration / tick)
                .attr('opacity', 1);
            d3.selectAll('.axis')
                .transition()
                .duration(duration / tick)
                .style('display', 'inline');
        }, duration / tick * (tick-1))
    }
    return svg;
}

export default draw;