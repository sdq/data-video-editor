import * as d3 from 'd3';
import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';
import { getStackedData, getSeriesValue,getAggregatedRows } from './helper';

const inArea = (point, area) => {
    // check dragging mouse area
    // if (point.x > area.x && point.x < (area.x + area.width) && point.y > area.y && point.y < (area.y + area.height)) {
    if (point.y >= area[0] && point.y <= area[1]) {
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
    if (animationTask !== ChartAnimationTask.TEMPORAL && animationTask !== ChartAnimationTask.EMPHASIZE && animationTask !== ChartAnimationTask.COMPARE && animationType !== ChartAnimationType.RECONFIGURE_ORDER) {
        // no highlight
        return;
    }

    let data = props.data;
    const encoding = props.spec.encoding;
    const offset = 20;
    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;

    const svg = d3.select('.vis-areachart svg');
    const areaG = svg.select('.areaG')
    let areaPath = areaG.selectAll("path")

    let stackedData = [];
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);
    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
    } else {
        data = getAggregatedRows(data, encoding);
    }

    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    var x = d3.scalePoint()
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .rangeRound([0, width]);

    //Y轴        
    var y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);

    let pointScreen = {
        x: props.pointx - 40, // offset
        y: props.pointy - 10, // offset
    }

    x.invert = (function () {
        var domain = x.domain()
        var range = x.range()
        var scale = d3.scaleQuantize().domain(range).range(domain)

        return function (x) {
            return scale(x)
        }
    })()

    let point = {
        x: x.invert(pointScreen.x),
        y: y.invert(pointScreen.y)
    }

    if (animationType === ChartAnimationType.TREND || animationType === ChartAnimationType.EMPHASIZE_SERIES || animationType === ChartAnimationType.COMPARE_SERIES || animationType === ChartAnimationType.EMPHASIZE_EXTREME) {
        let hoverSeries = new Set();
        if (hasSeries) {
            areaPath
                .style('fill', (d, i) => {
                    let area = d.filter(d => d.data.x === point.x)
                    if (inArea(point, area[0])) {
                        hoverSeries.add(d.key);
                    }
                    return colorScale(i);
                });
            areaPath.attr("stroke", "yellow")
                .attr("stroke-opacity", 1)
                .attr("stroke-width", (d) => {
                    if (hoverSeries.has(d.key))
                        return 2;
                    else return 0;
                });
            if (!hoverSeries.size) {
                hoverSeries = "all";
            } else {
                hoverSeries = Array.from(hoverSeries)[0];
            }
        } else {
            hoverSeries = "all";
        }

        switch (animationType) {
            case ChartAnimationType.TREND:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Show data trend of " + choosenAnimation.spec.series + " series";
                break;
            case ChartAnimationType.REGRESSION:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Show regression of " + choosenAnimation.spec.series + " series";
                break;
            case ChartAnimationType.EMPHASIZE_SERIES:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Emphasize the " + choosenAnimation.spec.series + " series";
                break;
            case ChartAnimationType.EMPHASIZE_EXTREME:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Emphasize the " + choosenAnimation.spec.value + " value in the " + choosenAnimation.spec.series + " series";
                break;
            case ChartAnimationType.COMPARE_SERIES:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Compare two series";
                break;
            default:
                break;

        }
    }
    else if (animationType === ChartAnimationType.EMPHASIZE_VALUE) {
        let hoverSeries = new Set();
        let category;
        if (hasSeries) {
            areaPath
                .style('fill', (d, i) => {
                    let area = d.filter(d => d.data.x === point.x)

                    if (inArea(point, area[0])) {
                        hoverSeries.add(d.key);
                    }
                    return colorScale(i);
                });
            areaPath.attr("stroke", "yellow")
                .attr("stroke-opacity", 1)
                .attr("stroke-width", (d) => {
                    if (hoverSeries.has(d.key))
                        return 2;
                    else return 0;
                });
            if (!hoverSeries.size) {
                hoverSeries = "all";
            } else {
                hoverSeries = Array.from(hoverSeries)[0];
            }
            category = point.x
            let series = getSeriesValue(data, encoding);
            let categoryList = []
            stackedData[0].forEach(d => {
                categoryList.push(d.data.x)
            })
            let categoryIndex = categoryList.indexOf(category)
            let seriesIndex = series.indexOf(hoverSeries)
            if (hoverSeries !== "all") {
                let vLine = stackedData[seriesIndex][categoryIndex]
                choosenAnimation.spec.value = `(${category}, ${vLine[1] - vLine[0]})`
            }
        } else{
            hoverSeries = "all"
            category = point.x
            let categoryList = []
            data.forEach(d => {
                categoryList.push(d[encoding.x.field])
            })
            let categoryIndex = categoryList.indexOf(category)
            let vLine = [0, data[categoryIndex][encoding.y.field]]
            choosenAnimation.spec.value = `(${category}, ${vLine[1] - vLine[0]})`
        }

        choosenAnimation.spec.series = hoverSeries;
        choosenAnimation.spec.category = category
        choosenAnimation.description = "Emphasize the " + choosenAnimation.spec.value + " value in the " + choosenAnimation.spec.series + " series";
    }
    props.chooseChartAnimation(choosenAnimation);
}

export default draw;