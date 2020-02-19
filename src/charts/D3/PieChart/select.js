import * as d3 from 'd3';
import {  getCategories, getAggregatedRows, getWidth} from './helper';
import _ from 'lodash';
const config = {
    "legend-text-color": "#666"
}


const draw = (props) => {
    // TODO: Get selecting parameter
    let selectingParameter = props.selectingParameter;

    // TODO: modify chart animation
    // props.modifyChartAnimation(props.selectedAnimationIndex, animation);

    // TODO: unselect
    // props.selectChartElement(false, {});

    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-piechart > *').remove();
        a = '.vis-piechart';
    }

    const margin = { top: 100, right: 100, bottom: 100, left: 100 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom - 80

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
        color = colorScale.domain(data.map(function (d) { return d[encoding.color.field]; }));
    }

    //Compute the position of each group on the pie
    let pie = d3.pie()
        .value(function (d) { return d[encoding.size.field]; });
    let pieData = pie(data);

    //Build the pie chart
    let arc = d3.arc() //弧生成器
        .innerRadius(0) //设置内半径
        .outerRadius(height / 2); //设置外半径

    let arcs = svg.selectAll("g")
        .data(pieData)
        .enter()
        .append("g")
        .attr("class","pie_path")
        .attr("z-index",99999)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    arcs.append("path")
        .attr("fill", function (d) { return (color(d.data[encoding.color.field])); })
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
        .attr('x1', function (d) { return arc.centroid(d)[0] * 2; })
        .attr('y1', function (d) { return arc.centroid(d)[1] * 2; })
        .attr('x2', function (d, i) {
            return arc.centroid(d)[0] * 2.3;
        })
        .attr('y2', function (d, i) {
            return arc.centroid(d)[1] * 2.3;
        })
        .attr("opacity", "0");

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



    // Style
    // const style = props.spec.style;
    

     // Select Value
     svg.selectAll('path')
        .on("mouseover", function(d, i) {
            d3.select(this).attr('fill', 'yellow');
        })
        .on("mouseout", function(d, i) {
            //  let index = seriesKeys.indexOf(d.series);
            let index = d.data[encoding.color.field];
            d3.select(this).attr('fill', color(index));
        })
        .on('click', function(d, i) {
            let animation = props.selectedAnimation;
            animation.spec[selectingParameter.key] = d.data[encoding.color.field];
            props.modifyChartAnimation(props.selectedAnimationIndex, animation);
            props.selectChartElement(false, {});
        });

    return svg;

}

export default draw;