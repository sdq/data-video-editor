import * as d3 from 'd3';
import { getStackedData, getAggregatedRows, getSeries, getCategories } from '../../helper';
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (animation, props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-barchart > *').remove();
        a = '.vis-barchart';
    }

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset - 40;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 40)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get Encoding
    const encoding = props.spec.encoding;
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding) || _.isEmpty(encoding.x) || _.isEmpty(encoding.y)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg;
    }
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);
    let hasTrend = ('time' in encoding) && ('field' in encoding.time);

    // Process Data
    let data = props.data;
    let series = getSeries(data, encoding);
    let seriesKeys = Object.keys(series);
    let categories = getCategories(data, encoding);
    let categoriesKeys = Object.keys(categories);
    let stackedData = [];
    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
    }
    let trendData = []
    if (hasTrend) {
        let time = [...new Set(data.map(d => d[encoding.time.field]))];
        if (animation.spec.range === 'customize' && animation.spec.rangeScope.length > 0) {
            time = time.filter(d => (d >= animation.spec.rangeScope[0] && d <= animation.spec.rangeScope[1]));
        }
        time.forEach(timePoint => {
            let td = data.filter(d => d[encoding.time.field] === timePoint);
            let subCategories = td.map(d => d[encoding.x.field]);
            let missCategories = categoriesKeys.filter(x => subCategories.indexOf(x) === -1);
            missCategories.forEach(missCategory => {
                let x = {};
                x[encoding.x.field] = missCategory;
                x[encoding.y.field] = 0;
                x[encoding.color.field] = td[0][encoding.color.field];
                x[encoding.time.field] = timePoint;
                td.push(x)
            });
            if (hasSeries) {
                td.sort((a, b) => a[encoding.color.field].localeCompare(b[encoding.color.field]));
                let stackedTD = getStackedData(td, encoding);
                stackedTD.key = timePoint;
                trendData.push(stackedTD);
            } else {
                td = getAggregatedRows(td, encoding);
                trendData.push(td);
            }
        });
    } else {
        data = getAggregatedRows(data, encoding);
    }

    // X channel
    let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .padding(0.2);

    // Y channel
    let y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else {
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);
    }

    // Color channel
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // Bars
    let layer;
    let rect;
    if (hasSeries) {
        layer = svg.selectAll('layer')
            .data(stackedData)
            .enter()
            .append('g')
            .attr('class', 'layer')
            .style('fill', (d, i) => color(i))

        rect = layer.selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect');

        rect.attr('x', d => x(d.data.x))
            .attr('y', d => y(d[1]))
            // .attr('height', d => y(d[0]) - y(d[1]))
            .attr('height', 0)
            .attr('width', x.bandwidth() - 1)
            .style('stroke-width', '0')
    } else {
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .style('stroke-width', '0')
            .attr("x", function (d) { return x(d[encoding.x.field]); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d[encoding.y.field]); })
            .attr("y", function (d) { return y(d[encoding.y.field]); })
            .attr("fill", color(0));
    }

    // Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    svg.append("g").call(d3.axisLeft(y));

    // Animation
    let animationDelay = 0;
    let stepDuration = animation.duration / trendData.length;
    let hasGap = animation.spec.gap !== 0;
    if (hasSeries) {
        let lastCache = {};
        seriesKeys.forEach(sk => {
            lastCache[sk] = {};
            categoriesKeys.forEach(ck => {
                lastCache[sk][ck] = [0, 0];
            });
        });
        const animateStep = (timeData, animationDelay) => {
            setTimeout(() => {
                layer.selectAll('layer').remove();
                layer.selectAll('rect').remove();
                layer = svg.selectAll('layer')
                    .data(timeData)
                    .enter()
                    .append('g')
                    .attr('class', 'layer')
                    .style('fill', (d, i) => color(i))

                layer.selectAll('rect')
                    .data(d => {
                        return d.map(x => {
                            x.series = d.key.toString();
                            return x;
                        });
                    })
                    .enter()
                    .append('rect')
                    .merge(layer)
                    .attr('x', d => x(d.data.x))
                    .attr('width', x.bandwidth() - 1)
                    .attr('y', d => {
                        return y(lastCache[d.series][d.data.x][1]);
                    })
                    .attr('height', d => y(lastCache[d.series][d.data.x][0]) - y(lastCache[d.series][d.data.x][1]))
                    .transition()
                    .duration(hasGap ? stepDuration / 2 : stepDuration)
                    .attr('y', d => {
                        lastCache[d.series][d.data.x][0] = d[0];
                        lastCache[d.series][d.data.x][1] = d[1];
                        return y(d[1]);
                    })
                    .attr('height', d => y(d[0]) - y(d[1]))
                    .style('stroke-width', '0')
            }, animationDelay)
        }
        for (let index = 0; index < trendData.length; index++) {
            const timeData = trendData[index];
            animateStep(timeData, animationDelay);
            animationDelay += stepDuration;
        }
    } else {
        let lastCache = {};
        categoriesKeys.forEach(ck => {
            lastCache[ck] = 0;
        });
        let animateStep = (timeData, animationDelay) => {
            setTimeout(() => {
                svg.selectAll("rect").remove();
                svg.selectAll("rect")
                    .data(timeData)
                    .enter()
                    .append("rect")
                    .style('stroke-width', '0')
                    .attr("x", function (d) { return x(d[encoding.x.field]); })
                    .attr("width", x.bandwidth())
                    .attr('y', d => {
                        return y(lastCache[d[encoding.x.field]]);
                    })
                    .attr('height', d => height - y(lastCache[d[encoding.x.field]]))
                    .transition()
                    .duration(hasGap ? stepDuration / 2 : stepDuration)
                    .attr("y", function (d) {
                        lastCache[d[encoding.x.field]] = d[encoding.y.field];
                        return y(d[encoding.y.field]);
                    })
                    .attr("height", function (d) { return height - y(d[encoding.y.field]); })
                    .attr("fill", color(0));
            }, animationDelay)
        }
        for (let index = 0; index < trendData.length; index++) {
            const timeData = trendData[index];
            animateStep(timeData, animationDelay);
            animationDelay += stepDuration;
        }
    }
    let dataSeries1 = [];
    let series1 = [];
    if (hasSeries) {
        dataSeries1 = getSeries(data, encoding);
        series1 = Object.keys(dataSeries1);
    }
    // legend
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const legend = svg.append("g")
        .attr("transform", `translate(0, ${height + 60})`);
    var legends = legend.selectAll("legend_color")
        .data(series1)
        .enter()
        .append("g")
        .attr("class", "legend_color")
        .attr('transform', (d, i) => `translate(${i * (80 + 10) + (width - (series1.length * 80 + (series1.length - 1) * 10)) / 2}, 0)`);
    legends.append("rect")
        .attr("fill", d => colorScale(d))
        .attr('y', -9)
        .attr("width", '10px')
        .attr('height', '10px')
        .attr("rx", 1.5)
        .attr("ry", 1.5)
    // .attr("cy", -5);
    legends.append("text")
        .attr("fill", 'black')
        .attr("x", 15)
        .text(d => d);
    return svg;
}

export default draw;