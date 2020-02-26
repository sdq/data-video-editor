import * as d3 from 'd3';
import ChartAnimationType from '../ChartAnimationType';
import _ from 'lodash';

const draw = (props) => {
    // Get selecting parameter
    let selectingParameter = props.selectingParameter;
    let selectType = selectingParameter.type;

    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-linechart svg');
    const content = svg.select('.content'),
        items = content.selectAll(".data-item");
    const itemsCircle = content.selectAll('circle.data-item'),
          itemsPath = content.selectAll('path.data-item');

    let selecting = true;

    if (selectType === 'series') {
        items.on('mouseover', function(item) {
            if (selecting) {
                if (item.length) { //path
                    itemsCircle.attr("r", (d) => {
                        if(d.color === item[0].color)
                            return 6;
                        else return 4;
                    });
                    itemsPath.attr('stroke-width', (d) => {
                        if(d[0].color === item[0].color)
                            return 6;
                        else return 3;
                    })
                }
                else {
                    itemsCircle.attr("r", (d) => {
                        if(d.color === item.color)
                            return 6;
                        else return 4;
                    });
                    itemsPath.attr('stroke-width', (d) => {
                        if(d[0].color === item.color)
                            return 6;
                        else return 3;
                    })
                }
                
            }
        })
        .on('mouseout',function() {
            itemsCircle.attr("r", 4);
            itemsPath.attr('stroke-width', 3)
        })
        .on('click', function(item) {
            if (selecting) {
                let animation = props.selectedAnimation;
                if (item.length) 
                    animation.spec[selectingParameter.key] = item[0].color;
                else   animation.spec[selectingParameter.key] = item.color;
                switch (animation.type) {
                    // case ChartAnimationType.TREND:
                    //     animation.description = "Show data trend of "+ animation.spec.series +" series";
                    //     break;
                    // case ChartAnimationType.REGRESSION:
                    //     animation.description = "Show regression of "+ animation.spec.series +" series";
                    //     break;
                    case ChartAnimationType.COMPARE_SERIES:
                        animation.description = "Compare the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";
                        break;

                    case ChartAnimationType.EMPHASIZE_SERIES:
                        animation.description = "Emphasize the "+ animation.spec.series +" series";
                        break;
    
                    default:
                        break;
                }
                props.modifyChartAnimation(props.selectedAnimationIndex, animation);
                //unselect
                selecting = false;
                itemsCircle.attr('r', 4);
                itemsPath.attr('stroke-width', 3)
                props.selectChartElement(false, {});
            }
            
        })
    } else if (selectType === 'value') {
        itemsCircle.on('mouseover', function(item) {
            if(selecting) {
                d3.select(this)
                    .attr('r', 6);
            }
        })
        .on('mouseout', function(item) {
            d3.select(this)
                .attr('r', 4)
        })
        .on('click', function(item) {
            if (selecting) {
                let animation = props.selectedAnimation;
                if(animation.type === ChartAnimationType.EMPHASIZE_EXTREME || animation.type === ChartAnimationType.EMPHASIZE_VALUE){
                    if(!('color' in encoding) || _.isEmpty(encoding.color)){
                        animation.spec.series = "all";
                    }else{
                        animation.spec.series = item.color;
                    }
                    // animation.spec.value = "("+item.x + "," + item.y+")";
                    animation.spec.value = item.x
                    animation.description = "Emphasize the value of " + item.x + " in the " + animation.spec.series + " series";
                } else if(animation.type === ChartAnimationType.COMPARE_VALUES || animation.type === ChartAnimationType.COMPARE_EXTREMES ){
                    if(!('color' in encoding) || _.isEmpty(encoding.color)){
                        animation.spec.series = "all";
                    }else{
                        animation.spec.series = item.color;
                    }
                    animation.spec.value = item.x;
                    animation.description = "Compare the " + animation.spec.value + " of the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";
                }
                props.modifyChartAnimation(props.selectedAnimationIndex, animation);
                //unselect
                selecting = false;
                d3.select(this).attr('r', 4)
                props.selectChartElement(false, {});
            }
            
        })
    }

}

export default draw;