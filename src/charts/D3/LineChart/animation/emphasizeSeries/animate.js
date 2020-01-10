import * as d3 from 'd3';

const draw = (animation, props) => {
    // const encoding = props.spec.encoding;
    const svg = d3.select('.vis-linechart svg');
    const content = svg.select('.content');
    let items = content.selectAll(".series_"+animation.spec.series);

    //because of hovering
    items.attr("stroke-width", 3);
    let duration = animation.duration;
    let tick = 10;
    var pos;
    if(animation.spec.effect === "flicker"){
        let circles = content.selectAll('circle.series_'+animation.spec.series);
        let path = content.selectAll('path.series_'+animation.spec.series);
        // 求path中点x坐标
        const X = [];
        circles.nodes().forEach((circle) => {
            const _circle = d3.select(circle);
            X.push(parseFloat(_circle.attr('cx')));
        });
        let x1 = Math.min(...X);
        let x2 = Math.max(...X);
        // let middleIndex = X.length % 2 ? X.length / 2: (X.length+1) /2;
        let middleX = (x1 + x2) / 2;
        // let middleX = (X[middleIndex])
        // 求path中点 y坐标
        let pathLength = path.nodes()[0].getTotalLength();
        let beginning = middleX, end = pathLength, target;
        while (true) {
            target = Math.floor((beginning + end) / 2);
            pos = path.node().getPointAtLength(target);
            if ((target === end || target === beginning) && pos.x !== middleX) {
                break;
            }
            if (pos.x > middleX)      end = target;
            else if (pos.x < middleX) beginning = target;
            else break; //position found
        }
        let middleY = pos.y;
        let pointer = content.append('line')
            .attr('x1', middleX)
            .attr('y1', middleY - 5)
            .attr("x2", middleX)
            .attr("y2", middleY - 5)
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("opacity", 1);
        pointer
            .transition()
            .duration(duration / tick * 1)
            .attr("x2", middleX)
            .attr("y2", middleY - 30);
        let pointerText = content.append('text')
                                .attr('x', middleX)
                                .attr('y', middleY - 40);
        pointerText.transition()
            .delay(duration / tick * 1)
            .duration(duration / tick * 1)
            .text(animation.spec.series)
            .attr('text-anchor', 'middle')
            .attr("font-size", "20px")
            .attr("fill", "black");
        setTimeout(()=>{
            let count = 0;
            let flicking = setInterval(()=>{
                count ++;
                items.transition()
                    .duration(duration / tick * 1)
                    .attr('opacity', 0)
                    .transition()
                    .duration(duration / tick * 1)
                    .attr('opacity', 1);
                if(count === 3) {
                    clearInterval(flicking);
                }
            }, duration / tick * 2);
        }, duration / tick * 2);
        
        setTimeout(()=>{
            pointerText.remove();
            pointer.remove();
        }, duration)                 
    }else if(animation.spec.effect === "filter"){
        let circles = content.selectAll('circle.series_'+animation.spec.series);
        let path = content.selectAll('path.series_'+animation.spec.series);
        // 求path中点x坐标
        const X = [];
        circles.nodes().forEach((circle) => {
            const _circle = d3.select(circle);
            X.push(parseFloat(_circle.attr('cx')));
        });
        let x1 = Math.min(...X);
        let x2 = Math.max(...X);
        // let middleIndex = X.length % 2 ? X.length / 2: (X.length+1) /2;
        let middleX = (x1 + x2) / 2;
        // let middleX = (X[middleIndex])
        // 求path中点 y坐标
        var pathLength = path.nodes()[0].getTotalLength();
        var beginning = middleX, end = pathLength, target;
        while (true) {
            target = Math.floor((beginning + end) / 2);
            pos = path.node().getPointAtLength(target);
            if ((target === end || target === beginning) && pos.x !== middleX) {
                break;
            }
            if (pos.x > middleX)      end = target;
            else if (pos.x < middleX) beginning = target;
            else break; //position found
        }
        let middleY = pos.y;
        content.selectAll('.data-item')
                .transition()
                .duration(animation.duration / tick * 2)
                .attr('opacity', function () {
                    if (!d3.select(this).classed('series_' + animation.spec.series))
                        return 0.1;
                })

        let pointer = content.append('line')
            .attr('x1', middleX)
            .attr('y1', middleY - 5)
            .attr("x2", middleX)
            .attr("y2", middleY - 5)
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("opacity", 1);
        pointer
            .transition()
            .delay(animation.duration / tick * 2)
            .duration(duration / tick * 2)
            .attr("x2", middleX)
            .attr("y2", middleY - 30);
        let pointerText = content.append('text')
                                .attr('x', middleX)
                                .attr('y', middleY - 40);
        pointerText.transition()
            .delay(duration / tick * 4)
            .duration(duration / tick * 2)
            .text(animation.spec.series)
            .attr('text-anchor', 'middle')
            .attr("font-size", "20px")
            .attr("fill", "black");
        
        setTimeout(()=>{
            pointerText.remove();
            pointer.remove();
            content.selectAll('.data-item')
                .transition()
                .duration(duration / tick * 1)
                .attr('opacity', 1)
        }, duration / tick * (tick - 1))
    } else if(animation.spec.effect === "popUp") {
        let circles = content.selectAll('circle.series_'+animation.spec.series);
        let count = 0
        let poping = setInterval(()=>{
            count++ ;
            circles.transition()
                    .duration(duration / tick * 1)
                    .attr('r', 6)
                    .transition()
                    .duration(duration / tick * 1)
                    .attr('r', 4);
            if(count === 4) {
                clearInterval(poping)
            }
        }, duration / tick * 2)
    }
    return svg;
}

export default draw;