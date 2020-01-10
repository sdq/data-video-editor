import * as d3 from 'd3';
import { getSeries } from '../../helper';

const draw = (animation, props) => {
    const data = props.data,
        encoding = props.spec.encoding;
    const svg = d3.select('svg');
    const content = d3.select('.content'),
        items = content.selectAll("path.data-item");
    const chartWidth = content.attr("chartWidth"),
        chartHeight = content.attr("chartHeight");
    //because of hovering
    items.attr("stroke-width", 3);
    if (animation.spec.effect === "grow") {
        const duration = animation.duration - 1;
        const ticks = 12;
        
        var dataSeries = getSeries(data, encoding);
        var series = Object.keys(dataSeries);  

        if (animation.spec.series === "all") {
            if (animation.spec.oneByOne) {
                series.forEach((s) => {
                    svg.append('defs')
                    .attr('class', 'trend_defs')
                    .append('clipPath')
                    .attr('id', 'clip_' + s)
                    .append('rect')
                    .attr('x', -10)
                    .attr('width', 0)
                    .attr('height', chartHeight);
                })
                
                let seriesIndex = 0;
                let oneInterval = setInterval(()=>{
                    d3.select("#clip_" + series[seriesIndex] + " rect")
                    .attr('width', 0)
                    .transition()
                    .duration(duration / series.length / ticks * 8)
                    .attr('width',chartWidth + 4);
                    seriesIndex ++;
                    if (seriesIndex === series.length)
                        clearInterval(oneInterval)
                }, duration / series.length / ticks * 4)

                setTimeout(()=>{
                    d3.selectAll('.trend_defs')
                        .remove();
                }, duration)
                
            } else {
            
                d3.select('#allLine').attr('clip-path', 'url(#clip_allLine)');
                svg.append('defs')
                    .attr('class', 'trend_defs')
                    .append('clipPath')
                    .attr('id', 'clip_allLine')
                    .append('rect')
                    .attr('x', -10)
                    .attr('width', 0)
                    .attr('height', chartHeight);
                d3.select("#clip_allLine rect")
                        .attr('width',0)
                        .transition()
                        .duration(duration / ticks * (ticks - 3))
                        .attr('width', chartWidth+ 4);
                
                setTimeout(()=>{
                    d3.selectAll('.trend_defs')
                        .remove();
                }, duration / ticks * (ticks - 1))
            }
        } else {
            svg.append('defs')
                .attr('class', 'trend_defs')
                .append('clipPath')
                .attr('id', 'clip_' + animation.spec.series)
                .append('rect')
                .attr('x', -10)
                .attr('width', 0)
                .attr('height', chartHeight);
            d3.select("#clip_"+animation.spec.series + ' rect' )
                    .attr('width',0)
                    .transition()
                    .duration(duration / ticks * (ticks - 3))
                    .attr('width', chartWidth + 4)

            setTimeout(()=>{
                d3.selectAll('.trend_defs')
                    .remove();
            }, duration / ticks * (ticks - 1))

        }
    } else if (animation.spec.effect === "fadeIn") {
        if (animation.spec.series === "all") {
            if (animation.spec.oneByOne) {
                content.selectAll(".data-item")
                    .attr("opacity", 0);
                let dataSeries = getSeries(data, encoding);
                let series = Object.keys(dataSeries);
                let index = 0
                content.selectAll(".data-item")
                    .attr('opacity', 0)
                let oneInterval = setInterval(() => {
                    if (index === series.length) {
                        clearInterval(oneInterval)
                    }
                    content.selectAll(".series_" + series[index])
                        .attr("opacity", 0)
                        .transition()
                        .duration(animation.duration / series.length - 50)
                        .attr("opacity", 1);
                    index++;
                }, 500)
            } else {
                content.selectAll(".data-item")
                    .attr("opacity", 0)
                    .transition()
                    .duration(animation.duration - 50)
                    .attr("opacity", 1);
            }
        } else {
            content.selectAll('.series_' + animation.spec.series)
                .attr("opacity", 0)
                .transition()
                .duration(animation.duration - 50)
                .attr("opacity", 1);
        }
    }
    return svg;
}

export default draw;