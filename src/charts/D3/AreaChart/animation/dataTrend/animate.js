import * as d3 from 'd3';
import { getSeriesValue } from '../../helper';


const draw = (animation, props) => {
    const data = props.data,
        encoding = props.spec.encoding;
    const svg = d3.select('.vis-areachart svg');
    let areaLayer = svg.select('#areaLayer')
    const areaG = svg.select('.areaG')

    const offset = 20;
    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;

    let series = getSeriesValue(data, encoding);
    let seriesIndex = series.indexOf(animation.spec.series)

    let hasSeries = ('color' in encoding) && ('field' in encoding.color);
    areaG.selectAll('g').attr("stroke-width", 0);

    let isOnebyone = animation.isOnebyone;
    if (hasSeries && animation.spec.effect === "wipe" && isOnebyone) {
        if (animation.spec.series === "all") {
            let i = 0
            areaG.selectAll('path').attr("fill-opacity", 0)
            series.map((d, i) => {
                areaLayer.append('defs').append('clipPath')
                    .attr('id', 'clip_' + i)
                    .append('rect')
                    .attr("width", 0)
                    .attr('height', height)
                return d;   
            })

            var interval = setInterval(() => {
                if (i === series.length) {
                    clearInterval(interval);
                }
                if (i < series.length) {
                    areaG.selectAll('#series_' + i).attr("fill-opacity", 1)
                    d3.select("#clip_" + i + " rect")
                        .attr("width", 0)
                        .transition().duration(animation.duration / series.length)
                        .attr("width", width);
                }
                i++;
            }, animation.duration / series.length);
        }
    } else if (animation.spec.effect === "wipe" && !isOnebyone) {
        if (animation.spec.series === "all") {
            d3.select("#clip rect").attr("width", 0);
            d3.select("#clip rect")
                .transition().duration(3000)
                .attr("width", width);
        } else {
            areaLayer.append('defs').append('clipPath')
                .attr('id', 'clip_' + seriesIndex)
                    .append('rect')
                    .attr("width", 0)
                    .attr('height', height)
            areaG.selectAll('#series_' + seriesIndex).attr("fill-opacity", 0);
            areaG.selectAll('#series_' + seriesIndex).attr("fill-opacity", 1);
            d3.select("#clip_" + seriesIndex + " rect")
                .attr("width", 0)
                .transition().duration(animation.duration)
                .attr("width", width);
        }
    }
    else if (hasSeries && animation.spec.effect === "fadeIn" && isOnebyone) {
        if (animation.spec.series === "all") {
            let series = getSeriesValue(data, encoding);
            let i = 0
            interval = setInterval(function () {
                areaG.selectAll('path').attr("fill-opacity", 0)
                areaG.selectAll('#series_' + i)
                    .attr("fill-opacity", 0)
                    .transition()
                    .duration(animation.duration)
                    .attr("fill-opacity", 1);
                i++;
                if (i === series.length) {
                    clearInterval(interval);
                }
            }, animation.duration / series.length);
        }
    } else if (animation.spec.effect === "fadeIn" && !isOnebyone) {
        if (animation.spec.series === "all") {
            areaG.selectAll('path').attr("fill-opacity", 0)
                .transition()
                .duration(animation.duration)
                .attr("fill-opacity", 1);
        } else {
            areaG.selectAll('#series_' + seriesIndex)
                .attr("fill-opacity", 0)
                .transition()
                .duration(animation.duration)
                .attr("fill-opacity", 1);
        }
    }
    return svg;
}

export default draw;