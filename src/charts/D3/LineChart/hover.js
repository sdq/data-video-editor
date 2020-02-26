import * as d3 from 'd3';
import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';
import _ from 'lodash';

const inArea = (point, node) => {
    if ((node.x - point.x) * (node.x - point.x) + (node.y - point.y) * (node.y - point.y) <= 8 * node.r * node.r) {
        return true;
    } else {
        return false;
    }
}

const draw = (props) => {
    let animationTask;
    let animationType;
    // get choosen animation
    let choosenAnimation = props.choosenAnimation;
    if (choosenAnimation) {
        animationType = choosenAnimation.type; // Data Trend
        animationTask = choosenAnimation.task; // Temporal
    }
    if (animationTask !== ChartAnimationTask.TEMPORAL && animationTask !== ChartAnimationTask.EMPHASIZE && animationTask !== ChartAnimationTask.COMPARE && animationType !== ChartAnimationType.RECONFIGURE_ORDER) {
        // no highlight
        return;
    }

    let point = {
        x: props.pointx - 40, // offset
        y: props.pointy - 60, 
    }
    const encoding = props.spec.encoding;
    // const svg = d3.select('svg');
    const content = d3.select('.content');
    const items = content.selectAll("path.data-item");
    const itemsCircle = content.selectAll("circle.data-item")
    if (point.x >= 0) {
        if (animationType === ChartAnimationType.TREND || animationType === ChartAnimationType.REGRESSION || animationType === ChartAnimationType.EMPHASIZE_SERIES || animationType === ChartAnimationType.EMPHASIZE_SERIES || animationType === ChartAnimationType.EMPHASIZE_EXTREME || animationType === ChartAnimationType.COMPARE_SERIES || animationType === ChartAnimationType.COMPARE_EXTREMES) {
            let nearestSet = [];
            items.nodes().forEach((item) => {
                const _item = d3.select(item)
                var pathEl = _item.node();
                var pathLength = pathEl.getTotalLength();
                var beginning = point.x, end = pathLength, target;
                while (true) {
                    target = Math.floor((beginning + end) / 2);
                    var pos = pathEl.getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== point.x) {
                        break;
                    }
                    if (pos.x > point.x)      end = target;
                    else if (pos.x < point.x) beginning = target;
                    else break; //position found
                }
                nearestSet.push([_item.data()[0], point.x, pos.y])
            })
            // find the closest path
            var near_ = nearestSet.map((n) => {return Math.abs(n[2]-point.y)})
            var _y = Math.min.apply(null, near_)
            var seriesNearest;
            if (animationType === ChartAnimationType.TREND || animationType === ChartAnimationType.EMPHASIZE_EXTREME) {
                if (_y < 15) {
                    seriesNearest = nearestSet[near_.indexOf(_y)][0][0].color;
                    items.attr('stroke-width', (d) => {
                        if (d[0].color === seriesNearest)
                            return 6;
                        else return 3
                    })
                }
                else {
                    items.attr('stroke-width', 3);
                    let hasSeries = ('color' in encoding) && ('field' in encoding.color);
                    seriesNearest = hasSeries ? 'all' : 'overall';
                }
            } else {
                seriesNearest = nearestSet[near_.indexOf(_y)][0][0].color
                items.attr('stroke-width', (d) => {
                    if (d[0].color === seriesNearest)
                        return 6;
                    else return 3
                })
            } 
    
            switch (animationType) {
                case ChartAnimationType.TREND:
                    choosenAnimation.spec.series = seriesNearest;
                    choosenAnimation.description = "Show data trend of "+ choosenAnimation.spec.series +" series";
                    break;
                case ChartAnimationType.REGRESSION:
                    choosenAnimation.spec.series = seriesNearest;
                    choosenAnimation.description = "Show regression of "+ choosenAnimation.spec.series +" series";
                    break;
                case ChartAnimationType.EMPHASIZE_SERIES:
                    choosenAnimation.spec.series = seriesNearest;
                    choosenAnimation.description = "Emphasize the "+ choosenAnimation.spec.series +" series";
                    break;
                case ChartAnimationType.EMPHASIZE_EXTREME:
                    choosenAnimation.spec.series = seriesNearest;
                    choosenAnimation.description = "Emphasize the " + choosenAnimation.spec.value + " value in the " + choosenAnimation.spec.series + " series";
                    break;
                case ChartAnimationType.COMPARE_SERIES:
                    choosenAnimation.spec.series1 = seriesNearest;
                    // choosenAnimation.description = "Compare the "+ choosenAnimation.spec.series1 +" and "+ choosenAnimation.spec.series2 +" series";
                    choosenAnimation.description = "Compare two series";
                    break;
                case ChartAnimationType.COMPARE_EXTREMES:
                    choosenAnimation.spec.series1 = seriesNearest;
                    // choosenAnimation.description = "Compare the " + choosenAnimation.spec.value + " value in the " + choosenAnimation.spec.series1 +" and "+ choosenAnimation.spec.series2 + " series";
                    choosenAnimation.description = "Compare the extreme of two series";
                    break;
                default:
                    break;
    
            }
        } else if (animationType === ChartAnimationType.EMPHASIZE_VALUE || animationType === ChartAnimationType.COMPARE_VALUES) {
            let current_node;
            itemsCircle.nodes().forEach((item) => {
                const _item = d3.select(item);
                let node = {
                    "x": _item.attr("cx"),
                    "y": _item.attr("cy"),
                    "r": _item.attr("r"),
                }
                if(inArea(point, node)){
                    _item.attr("r", 6)
                    current_node = _item;
                } else {
                    _item.attr("r", 4);
                }
            });
            let hoverSeries;
            if(!current_node || !('color' in encoding) || _.isEmpty(encoding.color)){
                hoverSeries = "all";
            }else{
                hoverSeries = current_node.data()[0].color;
            }
            if (animationType === ChartAnimationType.EMPHASIZE_VALUE) {
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.spec.value = current_node ? current_node.data()[0].x :"max";
                // choosenAnimation.spec.value = current_node ? "("+current_node.data()[0].x + "," + current_node.data()[0].y+")":"max";
                let des = current_node ? current_node.data()[0].x : 'Max';
                choosenAnimation.description = "Emphasize the value of " + des + " in the " + choosenAnimation.spec.series + " series";
            } else {
                choosenAnimation.spec.value = current_node ? current_node.data()[0].x :"max";
                choosenAnimation.spec.series1 = hoverSeries;
                // choosenAnimation.description = "Compare the " + choosenAnimation.spec.value + " value in the " + choosenAnimation.spec.series1 +" and "+ choosenAnimation.spec.series2 + " series";
                choosenAnimation.description = "Compare the value of two series";
            }
        }
    } else {
        items.attr('stroke-width', 3);
        itemsCircle.attr('r', 4)
    }
    
    
    // set choosen animation
    props.chooseChartAnimation(choosenAnimation);
}

export default draw;