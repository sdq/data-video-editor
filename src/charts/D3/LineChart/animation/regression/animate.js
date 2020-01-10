import * as d3 from 'd3';
import { getLeastSquares } from '../../helper';

const draw = (animation, props) => {
    // const data = props.data,
    //     encoding = props.spec.encoding;
    const svg = d3.select('.vis-linechart svg');
    const content = d3.select('.content'),
        items = content.selectAll(".data-item");
    const chartHeight = content.attr("chartHeight");
    //because of hovering
    items.attr("stroke-width", 3);
    let circles = content.selectAll('circle.series_' + animation.spec.series).nodes();
    const X = [];
    const Y = [];
    circles.forEach((circle) => {
        const _circle = d3.select(circle);
        X.push(parseFloat(_circle.attr('cx')));
        Y.push(parseFloat(_circle.attr('cy')));
    });
    let ret = getLeastSquares(X, Y);
    let x1 = Math.min.apply(null, X);
    let x2 = Math.max.apply(null, X);
    // 根据y充满画面纵轴算回归线上的x最大/小值
    var x_ymin = (chartHeight - ret.b) / ret.m,
        x_ymax = (0 - ret.b) / ret.m;
    if (x_ymin > x_ymax) {
        [x_ymin, x_ymax] = [x_ymax, x_ymin]
    }
    x1 = x1 < x_ymin ? x_ymin : x1;
    x2 = x2 > x_ymax ? x_ymax : x2;

    const tick = 5;
    if (animation.spec.effect === "grow") {

        items.attr('opacity', 1)
            .transition()
            .duration(animation.duration / tick)
            .attr('opacity', function () {
                if (d3.select(this).classed('series_' + animation.spec.series))
                    return 1;
                else return 0.1;
            })
        let regression_line = content.append('line')
            .attr('x1', x1)
            .attr('y1', ret.m * x1 + ret.b)
            .attr("x2", x1)
            .attr("y2", ret.m * x1 + ret.b)
            .attr("stroke-width", 3)
            .attr("stroke", "red")
            .attr("stroke-dasharray", "5,5")
            .attr("opacity", 1);
        regression_line
            .transition()
            .duration(animation.duration / tick * (tick - 2))
            .attr("x2", x2)
            .attr("y2", ret.m * x2 + ret.b);
        setTimeout(function () {
            items.transition()
                .duration(animation.duration / tick)
                .attr('opacity', function () {
                    if (d3.select(this).classed('series_' + animation.spec.series))
                        return 1;
                    else return 1;
                })
            regression_line
                .transition()
                .duration(animation.duration / tick)
                .attr("opacity", 0);
        }, animation.duration / tick * (tick - 1));
        setTimeout(function () {
            regression_line.remove();

        }, animation.duration);
    } else if (animation.spec.effect === "fadeIn") {
        items.attr('opacity', 1)
            .transition()
            .duration(animation.duration / tick)
            .attr('opacity', function () {
                if (d3.select(this).classed('series_' + animation.spec.series))
                    return 1;
                else return 0.1;
            });
        let regression_line = content.append('line')
            .attr('x1', x1)
            .attr('y1', ret.m * x1 + ret.b)
            .attr("x2", x2)
            .attr("y2", ret.m * x2 + ret.b)
            .attr("stroke-width", 3)
            .attr("stroke", "red")
            .attr("stroke-dasharray", "5,5")
            .attr("opacity", 1);
        regression_line.attr('opacity', 0)
            .transition()
            .duration(animation.duration / tick * (tick - 1))
            .attr('opacity', 1);
        setTimeout(function () {
            items.transition()
                .duration(animation.duration / tick)
                .attr('opacity', 1)
            regression_line
                .transition()
                .duration(animation.duration / tick)
                .attr("opacity", 0);
        }, animation.duration / tick * (tick - 1));
        setTimeout(function () {
            regression_line.remove();
        }, animation.duration);
    }
    return svg;
}

export default draw;