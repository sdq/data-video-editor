import * as d3 from 'd3';
import _ from 'lodash';

const draw = (animation, props) => {
    const data = props.data,
        encoding = props.spec.encoding;
    const svg = d3.select('.vis-scatterplot svg');
    const content = svg.select('.content'),
        chartWidth = content.attr("chartWidth"),
        chartHeight = content.attr("chartHeight"),
        items = content.selectAll(".data-item");
    
    //because of hovering
    items.attr("stroke-width", 0);

    if(!('time' in encoding) || _.isEmpty(encoding.time) || !('id' in encoding) || _.isEmpty(encoding.id)){
        if(animation.spec.effect === "appear"){
            const tick = 100,
                duration = (animation.duration) / tick;
            
            if(animation.spec.series === "all"){
                const xValue = data.map(d => d[encoding.x.field]);
                xValue.sort((a,b) => a - b);
                const step = (xValue.length - 1) / tick;

                items.attr("fill-opacity", 0);
                let count = 0;
                let timeid = setInterval(function(){
                    count++;
                    items.transition()
                        .duration(duration)
                        .attr("fill-opacity", d => {
                            if(d[encoding.x.field] <= xValue[Math.round(step * count)]) return 0.5;
                            else return 0;
                        });
                    if(count === tick) clearInterval(timeid);
                }, duration);
            }else{
                const xValue = data.filter(d => d[encoding.color.field] === animation.spec.series)
                    .map(d => d[encoding.x.field]);
                xValue.sort((a,b) => a - b);
                const step = (xValue.length - 1) / tick;
        
                let item_current = items.filter(d => d[encoding.color.field] === animation.spec.series)
                    .attr("fill-opacity", 0);
                let count = 0;
                let timeid = setInterval(function(){
                    count++;
                    item_current.transition()
                        .duration(duration)
                        .attr("fill-opacity", d => {
                            if(d[encoding.x.field] <= xValue[Math.round(step * count)]) return 0.5;
                            else return 0;
                        });
                    if(count === tick) clearInterval(timeid);
                }, duration);
            }
        }else if(animation.spec.effect === "fadeIn"){
            if(animation.spec.series === "all"){
                items.attr("fill-opacity", 0)
                    .transition()
                    .duration(animation.duration)
                    .attr("fill-opacity", 0.5);
            }else{
                items.filter(d => d[encoding.color.field] === animation.spec.series)
                    .attr("fill-opacity", 0)
                    .transition()
                    .duration(animation.duration)
                    .attr("fill-opacity", 0.5);
            }
        }
    } else {
        //TODO: parse time
        let parseTime = d => parseInt(d[encoding.time.field]);
        let time = [...new Set(data.map(parseTime))];
        //customize
        if (animation.spec.range === 'customize' && animation.spec.rangeScope.length > 0) {
            time = time.filter(d => (d >= animation.spec.rangeScope[0] && d <= animation.spec.rangeScope[1]));
        }

        let data_time = {};
        time.forEach(t => {
            data_time[t] = [];
        });
        const tick = time.length + 1;
        let duration = (animation.duration) / tick;

        if(animation.spec.series === "all"){
            data.forEach(d => {
                if(data_time[parseTime(d)])
                    data_time[parseTime(d)].push(d);
            });
        }else{
            data.forEach(d => {
                if(data_time[parseTime(d)] && d[encoding.color.field] === animation.spec.series)
                    data_time[parseTime(d)].push(d);
            });
        }
        //clear
        svg.select(".chart").transition()
            .attr("opacity", 0);

        svg.selectAll(".temporal-content").remove();
        let new_content = svg.select('g')
            .append('g')
            .attr("class", "temporal-content");

        //TODO: recofiguration后scale也发生了变化
        // X channel
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => parseFloat(d[encoding.x.field])))])
            .range([0, chartWidth])
            .nice();
        // Y channel
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => parseFloat(d[encoding.y.field])))])
            .range([chartHeight, 0])
            .nice();

        let axisX = d3.axisBottom(xScale)
            .ticks(10)
            .tickPadding(5);
    
        let axisY = d3.axisLeft(yScale)
            .ticks(10)
            .tickPadding(5);
    
        let axis_x = new_content.append("g")
            .attr("class", "axis_x")
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(axisX);
    
        let axis_y = new_content.append("g")
            .attr("class", "axis_y")
            .call(axisY);
        // Style
        axis_x.selectAll('line')
            .attr("opacity", 0.4)
            .attr("y2", -chartHeight)
            .attr("stroke-dasharray","5,5");
        axis_y.select('path')
            .attr("opacity", 0.4)
            .attr("stroke-dasharray","5,5");
        axis_y.selectAll('line')
            .attr("opacity", 0.4)
            .attr("x2", chartWidth)
            .attr("stroke-dasharray","5,5");

        let time_text = new_content.append('text')
            .attr("x", 30)
            .attr("y", 30)
            .attr("font-size", 20)
            .attr("fill", "#999")
            .text(time[0])
            .attr("opacity", 0)
        time_text.transition()
            .duration(duration)
            .attr("opacity", 1);
        
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        if(animation.spec.series !== "all"){
            new_content.append("g")
                .selectAll("circle")
                .data(data, d => d[encoding.id.field])
                .enter().append("circle")
                .attr("r", 8)//size
                .attr("stroke", "#FFF")
                .attr("stroke-width", 0)
                .attr("fill-opacity", 0.06)
                .attr("fill", d => color(d[encoding.color.field]))
                .attr("cx", d => xScale(d[encoding.x.field]))
                .attr("cy", d => yScale(d[encoding.y.field]))
                .filter(d => d[encoding.color.field] === animation.spec.series)
                .remove();
        }

        let i = 0;
        let timeid = setInterval(() => {
            let new_data = new_content.selectAll('.node')
                .data(data_time[time[i]], d => d[encoding.id.field]);

            let new_points = new_data.enter()
                .append("circle")
                .attr('class', 'node')
                .attr("r", 8)//size
                .attr("stroke", "#FFF")
                .attr("stroke-width", 0)
                .attr("fill-opacity", 0.5)
                .attr("cx", d => xScale(d[encoding.x.field]))
                .attr("cy", d => yScale(d[encoding.y.field]));

            if(('color' in encoding) && !_.isEmpty(encoding.color)){
                if(encoding.color.type === "quantitative"){
                }else{
                    new_points.attr("fill", d => color(d[encoding.color.field]));
                }
            }else{
                new_points.attr("fill", color(0));
            }
            //Size channel
            if(('size' in encoding) && !_.isEmpty(encoding.size)){
                let size = d3.scaleLinear()
                    .domain(d3.extent(data, d=>d[encoding.size.field]))
                    .range([6, 10]);
                new_points.attr("r", d => size(d[encoding.size.field]));
            }

            new_data.exit().remove();

            new_data
                .transition()
                .duration(animation.spec.gap !== 0 ? duration/2: duration)//GAP
                .attr("cx", d => xScale(d[encoding.x.field]))
                .attr("cy", d => yScale(d[encoding.y.field]));

            time_text
                .transition()
                .duration(animation.spec.gap !== 0 ? duration/2: duration)//GAP
                .text(time[i]);

            i ++;
            if(i === time.length) clearInterval(timeid);
        }, duration)

        /*clear */
        // items.transition()
        //     .delay(duration * (tick - 1))
        //     .duration(duration)
        //     .attr("opacity", 1);

        // setTimeout(() => {
        //     new_content.remove();            
        // }, duration * (tick - 1 / 2));
    }

    return svg;
}

export default draw;