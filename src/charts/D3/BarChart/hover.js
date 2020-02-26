import * as d3 from 'd3';
import { getStackedData, getSeries, getAggregatedRows, getWidth } from './helper';
import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';
import _ from 'lodash';
const config = {
    "legend-text-color": "#666"
}
//const offset = 20; // To show whole chart

const inArea = (point, area) => {
    // check dragging mouse area
    if (point.x > area.x && point.x < (area.x + area.width) && point.y > area.y && point.y < (area.y + area.height)) {
        return true;
    } else {
        return false;
    }
}

const draw = (props) => {
    let animationTask;
    let animationType;
    let choosenAnimation = props.choosenAnimation;
    if (choosenAnimation) {
        animationType = choosenAnimation.type;
        animationTask = choosenAnimation.task;
    }
    if (animationTask !== ChartAnimationTask.EMPHASIZE && animationTask !== ChartAnimationTask.COMPARE && animationType !== ChartAnimationType.RECONFIGURE_ORDER) {
        // no highlight
        return;
    }
    let point = {
        x: props.pointx - 40, // offset
        y: props.pointy - 40, // offset
    }
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - 20;
    const height = props.height - margin.top - margin.bottom - 20 - 40;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 60)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get Encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding) || _.isEmpty(encoding.x) || _.isEmpty(encoding.y)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg;
    }
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);;

    // Process Data
    let data = props.data;
    let seriesKeys;
    let seriesData;
    let stackedData = [];
    if (hasSeries) {
        seriesData = getSeries(data, encoding);
        seriesKeys = Object.keys(seriesData);
        stackedData = getStackedData(data, encoding);
    } else {
        data = getAggregatedRows(data, encoding);
    }

    // X channel
    let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .padding(0.2);

    // Y channel
    let y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else {
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);
    }

    // Color channel
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // Bars
    if (hasSeries) {
        const layer = svg.selectAll('layer')
            .data(stackedData)
            .enter()
            .append('g')
            .attr('class', 'layer')
            .style('fill', (d, i) => color(i))

        layer.selectAll('rect')
            .data(d => d.map(x => {
                x.series = d.key.toString();
                return x;
            }))
            .enter()
            .append('rect')
            .attr('x', d => x(d.data.x))
            .attr('y', d => y(d[1]))
            .attr('height', d => y(d[0]) - y(d[1]))
            .attr('width', x.bandwidth() - 1)
            .style('stroke-width', '0')

        if (animationType === ChartAnimationType.EMPHASIZE_VALUE || animationType === ChartAnimationType.COMPARE_VALUES) {
            let hoverSeries;
            let hoverCategory;
            layer.selectAll('rect')
                .style('fill', (d, i) => {
                    let area = {
                        x: x(d.data.x),
                        y: y(d[1]),
                        width: (x.bandwidth() - 1),
                        height: (y(d[0]) - y(d[1])),
                    }
                    if (inArea(point, area)) {
                        hoverSeries = d.series;
                        hoverCategory = d.data.x.toString();
                        return 'yellow';
                    } else {
                        let index = seriesKeys.indexOf(d.series);
                        return color(index);
                    }
                });
            if (animationType === ChartAnimationType.EMPHASIZE_VALUE) {
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.spec.category = hoverCategory;
                choosenAnimation.description = "Emphasize the value of " + hoverCategory + " of in the " + hoverSeries + " series";
            } else {
                choosenAnimation.spec.series1 = hoverSeries;
                choosenAnimation.spec.category1 = hoverCategory;
                choosenAnimation.description = "Compare between the values of " + hoverCategory + " in " + hoverSeries + " and the other one";
            }
            props.chooseChartAnimation(choosenAnimation);
        } else if (animationType === ChartAnimationType.EMPHASIZE_SERIES || animationType === ChartAnimationType.COMPARE_SERIES || animationType === ChartAnimationType.EMPHASIZE_EXTREME || animationType === ChartAnimationType.COMPARE_EXTREMES || animationType === ChartAnimationType.RECONFIGURE_ORDER) {
            let hoverSeries;
            layer.selectAll('rect')
                .style('fill', (d, i) => {
                    let area = {
                        x: x(d.data.x),
                        y: y(d[1]),
                        width: (x.bandwidth() - 1),
                        height: (y(d[0]) - y(d[1])),
                    }
                    if (inArea(point, area)) {
                        hoverSeries = d.series;
                    }
                    let index = seriesKeys.indexOf(d.series);
                    return color(index);
                });
            layer.selectAll('rect')
                .style('fill', (d, i) => {
                    if (d.series === hoverSeries) {
                        return 'yellow';
                    } else {
                        let index = seriesKeys.indexOf(d.series);
                        return color(index);
                    }
                });
            if (animationType === ChartAnimationType.EMPHASIZE_SERIES || animationType === ChartAnimationType.EMPHASIZE_EXTREME) {
                choosenAnimation.spec.series = hoverSeries;
                if (animationType === ChartAnimationType.EMPHASIZE_SERIES) {
                    choosenAnimation.description = "Emphasize the " + choosenAnimation.spec.series + " series";
                } else {
                    choosenAnimation.description = "Emphasize the " + choosenAnimation.spec.extreme + " in the " + choosenAnimation.spec.series + " series";
                }
            } else if (animationType === ChartAnimationType.RECONFIGURE_ORDER) {
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Reconfigure the order to " + choosenAnimation.spec.series + " series";
            } else {
                choosenAnimation.spec.series1 = hoverSeries;
            }
            props.chooseChartAnimation(choosenAnimation);
        } else if (animationType === ChartAnimationType.EMPHASIZE_CATEGORY || animationType === ChartAnimationType.COMPARE_CATEGORIES) {
            let hoverCategory;
            layer.selectAll('rect')
                .style('fill', (d, i) => {
                    let area = {
                        x: x(d.data.x),
                        y: y(d[1]),
                        width: (x.bandwidth() - 1),
                        height: (y(d[0]) - y(d[1])),
                    }
                    if (inArea(point, area)) {
                        hoverCategory = d.data.x.toString();
                    }
                    let index = seriesKeys.indexOf(d.series);
                    return color(index);
                });
            layer.selectAll('rect')
                .style('fill', (d, i) => {
                    if (d.data.x.toString() === hoverCategory) {
                        return 'yellow';
                    } else {
                        let index = seriesKeys.indexOf(d.series);
                        return color(index);
                    }
                });
            if (animationType === ChartAnimationType.EMPHASIZE_CATEGORY) {
                choosenAnimation.spec.category = hoverCategory;
                choosenAnimation.description = "Emphasize the category with " + hoverCategory;
            } else {
                choosenAnimation.spec.category1 = hoverCategory;
            }
            props.chooseChartAnimation(choosenAnimation);
        }



    } else {
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .style('stroke-width', '0')
            .attr("x", function (d) { return x(d[encoding.x.field]); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d[encoding.y.field]); })
            .attr("y", function (d) { return y(d[encoding.y.field]); })
            .style('fill', color(0));

        if (animationType === ChartAnimationType.EMPHASIZE_CATEGORY || animationType === ChartAnimationType.COMPARE_CATEGORIES) {
            let hoverCategory;
            svg.selectAll('rect')
                .style('fill', (d, i) => {
                    let area = {
                        x: x(d[encoding.x.field]),
                        y: y(d[encoding.y.field]),
                        width: x.bandwidth(),
                        height: height - y(d[encoding.y.field]),
                    }
                    if (inArea(point, area)) {
                        hoverCategory = d[encoding.x.field].toString();
                        return 'yellow';
                    } else {
                        return color(0);
                    }
                });
            if (animationType === ChartAnimationType.EMPHASIZE_CATEGORY) {
                choosenAnimation.spec.category = hoverCategory;
            } else {
                choosenAnimation.spec.category1 = hoverCategory;
            }
            props.chooseChartAnimation(choosenAnimation);
        }
    }

    // Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    svg.append("g").call(d3.axisLeft(y));

    // legend
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    // legend
    const legend = svg.append("g")
    //.attr("transform", `translate(0, ${height + 60})`);

    //console.log("seriesKeys",seriesKeys)
    var legends = legend.selectAll("legend_color")
        .data(seriesKeys)
        .enter()
        .append("g")
        .attr("class", "legend_color")
        .attr('transform', (d, i) => `translate(${-15}, 0)`);//i * (80 + 10) + (width - (categories.length * 80 + (categories.length - 1) * 10)) / 2

    legends.append("rect")
        .attr("fill", d => colorScale(d))
        .attr('x', 15)
        .attr('y', -10)
        .attr("width", '10px')
        .attr('height', '10px')
        .attr("rx", 1.5)
        .attr("ry", 1.5)
    // .attr("cy", -5);
    legends.append("text")
        .attr("fill", config["legend-text-color"])
        .attr("x", 35)
        .text(d => d);

    let legend_nodes = legends.nodes();
    let before = legend_nodes[0];
    let current;
    let offset = -15;

    for (let i = 1; i < legend_nodes.length; i++) {
        current = legend_nodes[i];
        if (d3.select(before).select("text").node().getComputedTextLength()) {
            offset += d3.select(before).select("text").node().getComputedTextLength();
        } else {
            offset += getWidth(seriesData[i - 1])
        }
        //console.log("offset1", offset)
        d3.select(current)
            .attr('transform', `translate(${i * 30 + offset}, 0)`);
        before = current;
    }
    if (legend.node().getBBox().width) {
        legend.attr("transform", `translate(${(width - legend.node().getBBox().width) / 2}, ${height + 60})`);
    } else {
        offset += getWidth(seriesData[seriesData.length - 1]);
       // console.log("offset2", offset)
        legend.attr("transform", `translate(${(width - offset - 30 * seriesData.length + 20) / 2}, ${height + 60})`);
    }
    return svg;
}

export default draw;