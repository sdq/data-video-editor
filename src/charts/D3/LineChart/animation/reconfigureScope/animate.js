import * as d3 from 'd3';
import {getCategories, parseTime, formatTick, formatTicksCount} from '../../helper';

const draw = (animation, props) => {

    const encoding = props.spec.encoding;
    const data = props.data;
    const svg = d3.select('.vis-linechart svg');
    const content = svg.select('.content');
    const chartWidth = content.attr('chartWidth'),
          chartHeight = content.attr('chartHeight');

    if (animation.spec.effect === "zoom in") {
        // if(!svg.select('defs').node)
        if(!svg.select('.zoom-defs').node()) {
            svg.append('defs')
            .attr('class', 'zoom-defs')
            .append('clipPath')
            .attr("id", 'clip-rect')
            .append('rect')
            .attr("width", `${+chartWidth+10}`)
            .attr("height", chartHeight)
            .attr('x', -5);
        }
        

        let rangeX = animation.spec.rangeX ? animation.spec.rangeX:[0,100];
        let x0 = rangeX[0];
        let x1 = rangeX[1];
        let dataCategories = getCategories(data, encoding);
        let categories = Object.keys(dataCategories);
        let n_categories = categories.length; //x轴有多少个;
        let n_categories_ = 100 / n_categories; // 100份平均分给n个x轴tick
        x0 = categories[Math.floor(x0 / n_categories_)];
        x1 = x1 === 100 ? categories.slice(-1)[0] : categories[Math.floor(x1 / n_categories_)];
        if (x0 === x1) {
            x0 = categories[categories.indexOf(x0) - 1]
            x1 = categories[categories.indexOf(x1) + 1]
        }
        var lineGen;
        

        if (animation.spec.rangeY || animation.spec.rangeX) {
            let format_TicksCount = formatTicksCount(data[0][encoding.x.field])
            let tick_format = formatTick(data[0][encoding.x.field])
            let xScale, yScale, axisX, axisY;
            xScale = d3.scaleTime()
                .domain([parseTime(x0), parseTime(x1)])
                .range([0, chartWidth]);

            // Y channel
            yScale = d3.scaleLinear()
                .domain(animation.spec.rangeY)
                .range([chartHeight, 0])
                .nice();
            if(format_TicksCount === d3.timeYear) {
                axisX = d3.axisBottom(xScale)
                .ticks(format_TicksCount)
                .tickFormat(tick_format);
            } else {
                axisX = d3.axisBottom(xScale)
                .tickFormat(tick_format);
            }
            
            axisY = d3.axisLeft(yScale);

            // line Function
            lineGen = d3.line()
                .x(function(d) {
                    return xScale(parseTime(d.x));
                })
                .y(function(d) {
                    return yScale(d.y);
                });
            
            let axis_x = svg.select(".axis_x")
                .transition()
                .duration(animation.duration)
                .call(axisX);
            axis_x.selectAll('line')
                .attr("opacity", 0.4)
                .attr("y2", -chartHeight)
                .attr("stroke-dasharray","5,5");
            axis_x.selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
            svg.select(".axis_y")
                .transition()
                .duration(animation.duration)
                .call(axisY)
                .selectAll('line')
                .attr("opacity", 0.4)
                .attr("x2", chartWidth)
                .attr("stroke-dasharray","5,5");
            
            content.selectAll('circle.data-item')
                    .transition()
                    .duration(animation.duration)
                    .attr('cy', d => yScale(d.y))
                    .attr('cx', d => xScale(parseTime(d.x)));
            
            content.selectAll('path.data-item')
                    .transition()
                    .duration(animation.duration)
                    .attr('d', d => lineGen(d))

        }
    } else {
        // let x_domain = svg.select(".axis_x").attr('xScale');
        let y_domain = svg.select(".axis_y").attr('yScale');
        // console.log(x_domain.split(",")[0], x_domain.split(',')[1])
        let format_TicksCount = formatTicksCount(data[0][encoding.x.field])
        let tick_format = formatTick(data[0][encoding.x.field])
        let xScale, yScale, axisX, axisY;
        xScale = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return parseTime(d[encoding.x.field]);}))
            .range([0, chartWidth]);
        // Y channel
        yScale = d3.scaleLinear()
            .domain([y_domain.split(',')[0], y_domain.split(',')[1]])
            .range([chartHeight, 0])
            .nice();
        if(format_TicksCount === d3.timeYear) {
            axisX = d3.axisBottom(xScale)
            .ticks(format_TicksCount)
            .tickFormat(tick_format);
        } else {
            axisX = d3.axisBottom(xScale)
            .tickFormat(tick_format);
        }

        axisY = d3.axisLeft(yScale);

        // line Function
        lineGen = d3.line()
            .x(function(d) {
                return xScale(parseTime(d.x));
            })
            .y(function(d) {
                return yScale(d.y);
            });
        
        let axis_x = svg.select(".axis_x")
            .transition()
            .duration(animation.duration)
            .call(axisX);
        axis_x.selectAll('line')
            .attr("opacity", 0.4)
            .attr("y2", -chartHeight)
            .attr("stroke-dasharray","5,5");
        axis_x.selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        svg.select(".axis_y")
            .transition()
            .duration(animation.duration)
            .call(axisY)
            .selectAll('line')
            .attr("opacity", 0.4)
            .attr("x2", chartWidth)
            .attr("stroke-dasharray","5,5");
        
        content.selectAll('circle.data-item')
                .transition()
                .duration(animation.duration)
                .attr('cy', d => yScale(d.y))
                .attr('cx', d => xScale(parseTime(d.x)));
        
        content.selectAll('path.data-item')
                .transition()
                .duration(animation.duration)
                .attr('d', d => lineGen(d))
        d3.selectAll('.zoom-defs')
            .remove();
    }

    

    return svg;
}

export default draw;