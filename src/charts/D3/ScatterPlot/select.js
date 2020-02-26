import * as d3 from 'd3';
import ChartAnimationType from '../ChartAnimationType';
import _ from 'lodash';

const draw = (props) => {
    let selectingParameter = props.selectingParameter;
    let selectType = selectingParameter.type;

    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content'),
        items = content.selectAll(".data-item");

    //
    let selecting = true;

    if (selectType === 'series'){
        items.on('mouseover', function(item){
            if(selecting){
                items.attr("stroke", "#FAE7A5")
                    .attr("stroke-opacity", 1)
                    .attr("stroke-width", (d) => {
                        if(d[encoding.color.field] === item[encoding.color.field])
                            return 2;
                        else return 0;
                    });
            }
        })
        .on('mouseout',function(){
            items.attr("stroke-width", 0);
        })
        .on('click', function(item){
            if(selecting){
                let animation = props.selectedAnimation;

                animation.spec[selectingParameter.key] = item[encoding.color.field];
                switch (animation.type) {
                    // case ChartAnimationType.TREND:
                    //     animation.description = "Show data trend of "+ animation.spec.series +" series";
                    //     break;
                    // case ChartAnimationType.REGRESSION:
                    //     animation.description = "Show regression of "+ animation.spec.series +" series";
                    //     break;
                    case ChartAnimationType.EMPHASIZE_SERIES:
                        animation.description = "Emphasize the "+ animation.spec.series +" series";
                        break;

                    case ChartAnimationType.COMPARE_SERIES:
                        animation.description = "Compare the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";
                        break;

                    default:
                        break;
                }
                props.modifyChartAnimation(props.selectedAnimationIndex, animation);
                //unselect
                selecting = false;
                props.selectChartElement(false, {});
            }
        });
    }else if (selectType === 'value'){
        items.on('mouseover',function(){
            if(selecting) {
                d3.select(this)
                    .attr("stroke", "#FAE7A5")
                    .attr("stroke-opacity", 1)
                    .attr("stroke-width", 2);
            }
        })
        .on('mouseout',function(){
            d3.select(this)
                .attr("stroke-width", 0);
        })
        .on('click', function(item){
            if(selecting){
                let animation = props.selectedAnimation;

                if(animation.type === ChartAnimationType.EMPHASIZE_EXTREME || animation.type === ChartAnimationType.EMPHASIZE_VALUE){
                    if(!('color' in encoding) || _.isEmpty(encoding.color)){
                        animation.spec.series = "all";
                    }else{
                        animation.spec.series = item[encoding.color.field];
                    }
                    animation.spec.value = "("+item[encoding.x.field] + "," + item[encoding.y.field]+")";
                    animation.description = "Emphasize the " + animation.spec.value + " value in the " + animation.spec.channel + " channel in the "+ animation.spec.series + " series";
                }else if(animation.type === ChartAnimationType.COMPARE_EXTREMES || animation.type === ChartAnimationType.COMPARE_VALUES){
                    if(selectingParameter.key === "value1"){
                        animation.spec.series1 = item[encoding.color.field];
                        animation.spec.value1 = "("+item[encoding.x.field] + "," + item[encoding.y.field]+")";
                    } else {
                        animation.spec.series2 = item[encoding.color.field];
                        animation.spec.value2 = "("+item[encoding.x.field] + "," + item[encoding.y.field]+")";
                    }
                    let des = "Compare the " + animation.spec.value1 + " value";
                    des += " in the " + animation.spec.channel + " channel";
                    des += " in the " + animation.spec.series1 + " series";
                    des += " with the " + animation.spec.value2 + " value";
                    des += " in the " + animation.spec.channel + " channel";
                    des += " in the " + animation.spec.series2 + " series";
                    animation.description = des;
                }


                props.modifyChartAnimation(props.selectedAnimationIndex, animation);
                //unselect
                selecting = false;
                props.selectChartElement(false, {});
            }
        });
    }
}

export default draw;