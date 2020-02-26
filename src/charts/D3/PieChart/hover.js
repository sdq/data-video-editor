import * as d3 from 'd3';
import {getCategories,getAggregatedRows, getWidth} from './helper';
import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';
import _ from 'lodash';
const config = {
    "legend-text-color": "#666"
}


//将path转化为点的集合/polygon
const pathToPoints = (path) => {

    var number = path.split(/[M,A,L,Z]/);

    var points = [];

    var p1 = {};
    var p2 = {};
    var p3 = {};

    p1.x = number[1];
    p1.y = number[2];
    p2.x = number[8];
    p2.y = number[9];
    p3.x = number[10];
    p3.y = number[11];

    points.push(p1);
    points.push(p2);
    points.push(p3);

    return points;
}

//计算向量叉乘  
const crossMul = (v1, v2) => {
    return v1.x * v2.y - v1.y * v2.x;
}

//判断两条线段是否相交  
const checkCross = (p1, p2, p3, p4) => {



    var v1 = {
        x: p1.x - p3.x,
        y: p1.y - p3.y
    };

    var v2 = {
        x: p2.x - p3.x,
        y: p2.y - p3.y
    };



    var v3 = {
        x: p4.x - p3.x,
        y: p4.y - p3.y
    };

    var v = crossMul(v1, v3) * crossMul(v2, v3);



    v1 = {
        x: p3.x - p1.x,
        y: p3.y - p1.y
    };

    v2 = {
        x: p4.x - p1.x,
        y: p4.y - p1.y
    };



    v3 = {
        x: p2.x - p1.x,
        y: p2.y - p1.y
    };

    return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0) ? true : false;



}

//判断点是否在点集/polygon内  
const inArea = (point, polygon) =>{

    var p1, p2, p3, p4;



    p1 = point;

    p2 = {
        x: -500,
        y: point.y
    };

    var count = 0;

    //对每条边都和射线作对比  
    for (var i = 0; i < polygon.length - 1; i++) {

        p3 = polygon[i];



        p4 = polygon[i + 1];


        if (checkCross(p1, p2, p3, p4) === true) {
            count++;
        }

    }

    p3 = polygon[polygon.length - 1];



    p4 = polygon[0];

    if (checkCross(p1, p2, p3, p4) === true) {



        count++;

    }



    return (count % 2 === 0) ? false : true;



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
        x: props.pointx - props.width / 2, 
        y: props.pointy - props.height / 2, 
    }

    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-piechart > *').remove();
        a = '.vis-piechart';
    }

    const margin = {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100
    };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom - 80;

    let svg = d3.select(a)
        //在svg之前添加center元素以保证svg居中显示
        .append("center")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 80)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //Get Encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('size' in encoding) || _.isEmpty(encoding.size)|| !('color' in encoding) || _.isEmpty(encoding.color)) {
        svg.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", height / 2)
            .attr("fill", "pink");
        return svg;
    }

    // Process Data
    let data = props.data;
    data = getAggregatedRows(data, encoding);

    //Get categories
    let dataCategories = getCategories(data, encoding);
    let categories = Object.keys(dataCategories);

    //Color channel
    let color;
    if ('color' in encoding) {
        let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        color = colorScale.domain(data.map(function (d) {
            return d[encoding.color.field];
        }));
    }

    //Compute the position of each group on the pie
    let pie = d3.pie()
        .value(function (d) {
            return d[encoding.size.field];
        });
    let pieData = pie(data);

    //Build the pie chart
    let arc = d3.arc() //弧生成器
        .innerRadius(0) //设置内半径
        .outerRadius(height / 2); //设置外半径

    let arcs = svg.selectAll("g")
        .data(pieData)
        .enter()
        .append("g")
        // .attr("class","pie_path")
        // .attr("z-index",9999)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    arcs.append("path")
        .attr("fill", function (d) {
            return (color(d.data[encoding.color.field]));
        })
        .attr("d", function (d, i) {
            return arc(d);
        });

    //draw text-label
    arcs.append("text")
        .attr('transform', function (d, i) {
            var x = arc.centroid(d)[0] * 2.5;
            var y = arc.centroid(d)[1] * 2.5;
            return 'translate(' + x + ', ' + y + ')';
        })
        .attr('text-anchor', 'middle')
        .attr("opacity", "0")
        .text(function (d) {
            var percent = Number(d.value) / d3.sum(pieData, function (d) {
                return d.value;
            }) * 100;
            return percent.toFixed(1) + '%';
        });

    //draw text-line
    arcs.append('line')
        .attr('stroke', 'black')
        .attr('x1', function (d) {
            return arc.centroid(d)[0] * 2;
        })
        .attr('y1', function (d) {
            return arc.centroid(d)[1] * 2;
        })
        .attr('x2', function (d, i) {
            return arc.centroid(d)[0] * 2.3;
        })
        .attr('y2', function (d, i) {
            return arc.centroid(d)[1] * 2.3;
        })
        .attr("opacity", "0");


    if (animationType === ChartAnimationType.EMPHASIZE_VALUE || animationType === ChartAnimationType.COMPARE_VALUES) {
        let hoverCategory;
        svg.selectAll('path')
            .attr('fill', (d, i) => {
                let area = pathToPoints(arc(d));
                if (inArea(point, area)) {
                    hoverCategory = d.data[encoding.color.field];
                    return 'yellow';
                } else {
                    return color(d.data[encoding.color.field]);
                }
            })

        if(animationType === ChartAnimationType.EMPHASIZE_VALUE){
            choosenAnimation.spec.category = hoverCategory;
            if(hoverCategory){
                choosenAnimation.description = "Emphasize the value of " + hoverCategory;
            }else{
                choosenAnimation.description = "Emphasize the value of USA";
            }
        }else if(animationType === ChartAnimationType.COMPARE_VALUES){
            choosenAnimation.spec.category1 = hoverCategory;
            if(hoverCategory){
                choosenAnimation.description = "Compare the "+ hoverCategory +" and Europe";
            }else{
                choosenAnimation.description = "Compare the values between USA and Europe";
            }
        }
        props.chooseChartAnimation(choosenAnimation);
    }
    // legend
    const legend = svg.append("g");
        // .attr("transform", "translate(-40, 0)");
    var legends = legend.selectAll("legend_color")
        .data(categories)
        .enter()
        .append("g")
        .attr("class", "legend_color")
        .attr('transform', (d, i) => `translate(${-15}, 0)`);//i * (80 + 10) + (width - (categories.length * 80 + (categories.length - 1) * 10)) / 2

    legends.append("rect")
        .attr("fill", d => color(d))
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

        let legend_nodes=legends.nodes();
        let before = legend_nodes[0];
        let current;
        let offset = -15;

    for(let i = 1; i< legend_nodes.length; i++){
        current = legend_nodes[i];
        if(d3.select(before).select("text").node().getComputedTextLength()){
            offset += d3.select(before).select("text").node().getComputedTextLength();
        }else{
            offset += getWidth(categories[i-1])
        } 
        d3.select(current)
            .attr('transform', `translate(${i*30 + offset}, 0)`);
        before = current;
    }
    if(legend.node().getBBox().width){
        legend.attr("transform", `translate(${(width - legend.node().getBBox().width)/2}, ${height + 140})`);
    }else{
        offset += getWidth(categories[categories.length-1]);
        legend.attr("transform", `translate(${(width - offset - 30 * categories.length + 20)/2}, ${height + 140})`);
    }
    
        

}

export default draw;