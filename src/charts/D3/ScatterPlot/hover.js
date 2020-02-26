import * as d3 from 'd3';
import _ from 'lodash';
import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';

const inArea = (point, node) => {
    if ((node.x - point.x) * (node.x - point.x) + (node.y - point.y) * (node.y - point.y) <= node.r * node.r) {
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

    let point = {
        x: props.pointx - 60, // offset
        y: props.pointy - 10, // offset
    }
    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content'),
        items = content.selectAll(".data-item");
    
    if (animationType === ChartAnimationType.EMPHASIZE_VALUE || animationType === ChartAnimationType.COMPARE_VALUES) {
        let current_node;
        items.nodes().forEach((item) => {
            const _item = d3.select(item);
            let node = {
                "x": _item.attr("cx"),
                "y": _item.attr("cy"),
                "r": _item.attr("r"),
            }
            if(inArea(point, node)){
                _item.attr("stroke", "#FAE7A5")
                    .attr("stroke-opacity", 1)
                    .attr("stroke-width", 2);
                current_node = _item;
            } else {
                _item.attr("stroke-width", 0);
            }
        });
        let hoverSeries;
        if(!current_node || !('color' in encoding) || _.isEmpty(encoding.color)){
            hoverSeries = "all";
        }else{
            hoverSeries = current_node.data()[0][encoding.color.field];
        }
        if (animationType === ChartAnimationType.EMPHASIZE_VALUE) {
            choosenAnimation.spec.series = hoverSeries;
            choosenAnimation.spec.value = current_node ? "("+current_node.data()[0][encoding.x.field] + "," + current_node.data()[0][encoding.y.field]+")":"max";
            choosenAnimation.description = "Emphasize the " + choosenAnimation.spec.value + " value in the " + choosenAnimation.spec.channel + " channel in the "+ choosenAnimation.spec.series + " series";
        } else if(animationType === ChartAnimationType.COMPARE_VALUES) {
            choosenAnimation.spec.series1 = hoverSeries === "all" ? null : hoverSeries;;
            choosenAnimation.spec.value1 = current_node ? "("+current_node.data()[0][encoding.x.field] + "," + current_node.data()[0][encoding.y.field]+")":"max";
            let des = "Compare the " + choosenAnimation.spec.value1 + " value in the " + choosenAnimation.spec.channel + " channel in the " + choosenAnimation.spec.series1 + " series";
            des += " with the " + choosenAnimation.spec.value2 + " value in the " + choosenAnimation.spec.channel + " channel in the " + choosenAnimation.spec.series2 + " series";
            choosenAnimation.description = des;
        }
    }else if(animationType === ChartAnimationType.TREND || animationType === ChartAnimationType.REGRESSION || animationType === ChartAnimationType.EMPHASIZE_SERIES || animationType === ChartAnimationType.COMPARE_SERIES || animationType === ChartAnimationType.EMPHASIZE_EXTREME || animationType === ChartAnimationType.COMPARE_EXTREMES){
        let hoverSeries = "all";

        if(!('color' in encoding) || _.isEmpty(encoding.color)){
            items.attr("stroke-width", 0);
            items.nodes().forEach((item) => {
                const _item = d3.select(item);
                let node = {
                    "x": _item.attr("cx"),
                    "y": _item.attr("cy"),
                    "r": _item.attr("r"),
                }
                if(inArea(point, node)){
                    items.attr("stroke", "#FAE7A5")
                        .attr("stroke-opacity", 1)
                        .attr("stroke-width", 2);
                }
            });
        } else {
            items.nodes().forEach((item) => {
                const _item = d3.select(item);
                let node = {
                    "x": _item.attr("cx"),
                    "y": _item.attr("cy"),
                    "r": _item.attr("r"),
                }
                if(inArea(point, node)){
                    hoverSeries = _item.data()[0][encoding.color.field];
                }
            });
            items.attr("stroke", "#FAE7A5")
                .attr("stroke-opacity", 1)
                .attr("stroke-width", (d) => {
                    if(hoverSeries === d[encoding.color.field])
                        return 2;
                    else return 0;
                });
        }

        switch (animationType) {
            case ChartAnimationType.TREND:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Show data trend of "+ choosenAnimation.spec.series +" series";
                break;
            case ChartAnimationType.REGRESSION:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Show regression of "+ choosenAnimation.spec.series +" series";
                break;
            case ChartAnimationType.EMPHASIZE_SERIES:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Emphasize the "+ choosenAnimation.spec.series +" series";
                break;
            case ChartAnimationType.EMPHASIZE_EXTREME:
                choosenAnimation.spec.series = hoverSeries;
                choosenAnimation.description = "Emphasize the " + choosenAnimation.spec.value + " value in the " + choosenAnimation.spec.channel + " channel in the "+ choosenAnimation.spec.series + " series";
                break;
            case ChartAnimationType.COMPARE_SERIES:
                choosenAnimation.spec.series1 = hoverSeries;
                choosenAnimation.description = "Compare two series";
                break;
            case ChartAnimationType.COMPARE_EXTREMES:
                choosenAnimation.spec.series1 = hoverSeries === "all" ? null : hoverSeries;
                let des = "Compare the " + choosenAnimation.spec.value1 + " value in the " + choosenAnimation.spec.channel + " channel in the " + choosenAnimation.spec.series1 + " series";
                des += " with the " + choosenAnimation.spec.value2 + " value in the " + choosenAnimation.spec.channel + " channel in the " + choosenAnimation.spec.series2 + " series";
                choosenAnimation.description = des;
                break;

            default:
                break;
        }
            
    }
    props.chooseChartAnimation(choosenAnimation);
}

export default draw;