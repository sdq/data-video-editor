import * as d3 from 'd3';
import {getCategories, getAggregatedRows, getWidth} from '../../helper';
import _ from 'lodash';
const config = {
    "legend-text-color": "#666"
}

const draw = (animation,props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-piechart > *').remove();
        a = '.vis-piechart';
    }
    const margin = {top: 100, right: 100, bottom: 100, left: 100};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom - 80;
    let svg = d3.select(a)
                .append("center")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom + 80)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Get Encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('size' in encoding) || _.isEmpty(encoding.size)|| !('color' in encoding) || _.isEmpty(encoding.color) || !('time' in encoding) || _.isEmpty(encoding.time)) {
        svg.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", height / 2)
            .attr("fill", "pink");
        return svg;
    }
    let hasTrend = ('time' in encoding) && ('field' in encoding.time);

    // Process Data
    let data = props.data;
    let dataCategories = getCategories(data, encoding);
    let categoriesKeys = Object.keys(dataCategories);
    let categories = Object.keys(dataCategories);
    let trendData = [];
    if (hasTrend){
        let time = [...new Set(data.map(d => d[encoding.time.field]))];
        if (animation.spec.range === 'customize' && animation.spec.rangeScope.length > 0) {
            time = time.filter(d => (d.split("-")[0] >= animation.spec.rangeScope[0] && d.split("-")[0] <= animation.spec.rangeScope[1]));
        }
        time.forEach(timePoint => {
            //每个时间节点的数据
            let td = data.filter(d => d[encoding.time.field] === timePoint);
            //取出每个时间节点上的color数据，组成数组，即判断每个数据属于什么类别
            let subCategories = td.map(d => d[encoding.color.field]);
            //查看是否有不存在于color类别里的类别，如果有，就加进去
            let missCategories = categoriesKeys.filter(x => subCategories.indexOf(x)===-1);
            missCategories.forEach(missCategory => {
                let x = {};
                x[encoding.color.field] = missCategory;
                x[encoding.size.field] = 0;
                x[encoding.time.field] = timePoint;
                td.push(x);
            });
            //对每个时间节点计算值
            td = getAggregatedRows(td, encoding);
            td.timePoint = timePoint.split("-")[0];
            trendData.push(td);

        });
    } else {
        data = getAggregatedRows(data, encoding);
    }

    //Color channel
    let color;
    if('color' in encoding) {
        let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        color = colorScale.domain(data.map(function(d){ return d[encoding.color.field]; }));
    }

    //Compute the position of each group on the pie
    let pie = d3.pie()
        //保证绘制path的顺序不会变来变去,否则pie会自动降序排列
        .sort(null)
        .value(function(d){ return d[encoding.size.field]; });

    let arc = d3.arc() 
        .innerRadius(0) 
        .outerRadius(height/2); 

    // Animation
    let animationDelay = 0;
    let stepDuration = animation.duration / trendData.length;
    let hasGap = animation.spec.gap !== 0;
    let lastCache = {};
    categoriesKeys.forEach(ck => {
        lastCache[ck] = 0;
    });
    lastCache['startAngle'] = 0;
    lastCache['endAngle'] = 0;
    let animateStep = (timeData, animationDelay) => {
        //timeout((),time)指定延时多久再调用
        setTimeout(() => {

            svg.selectAll("g").remove();
            
            let arcs = svg.selectAll("g")
                .data(timeData)
                .enter()
                .append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
                    
            arcs.append("path")
                .attr("d", function(d,i){
                    return arc(d);
                })
                .transition()
                .duration(hasGap?stepDuration/2:stepDuration)
                .attr("d", function(d,i){
                    return arc(d);
                })
                .attr("fill", function(d){ return(color(d.data[encoding.color.field])); });
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
        }, animationDelay)
    }

   
    for (let index = 0; index < trendData.length; index++) {       
        trendData[index].sort(function(a,b){
            // order是规则  objs是需要排序的数组
            var order = categoriesKeys;
            return order.indexOf(a.Origin) - order.indexOf(b.Origin);
        });
        const timeData = pie(trendData[index]);
        animateStep(timeData, animationDelay);
        animationDelay += stepDuration;
    }



    // Style
    // const style = props.spec.style;

    return svg;
}

export default draw;