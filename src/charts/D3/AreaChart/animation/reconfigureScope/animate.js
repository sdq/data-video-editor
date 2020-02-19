import * as d3 from 'd3';
import { getCategories, getStackedData } from '../../helper';

const draw = (animation, props) => {
    const offset = 20;
    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset - 40;

    const encoding = props.spec.encoding;
    const svg = d3.select('.vis-areachart svg');

    let data = props.data;
    let hasSeries = 'color' in encoding;
    let stackedData = [];
    // let series
    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
        // series = getSeriesValue(data, encoding);
    }

    var stacked_area_generator = (rangeY, rangeX) => {
        let x0 = rangeX[0];
        let x1 = rangeX[1];
        let scale = (x1 - x0) / 100;
        //TODO: 第三个条件是为了zoom out
        // || rangeY.toString() === [0, d3.max(stackedData[stackedData.length - 1], d => d[1])].toString()
        if (!rangeY || rangeY.length === 0) {
            y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
        } else {
            y.domain(rangeY);
        }
        var x = d3.scalePoint()
            .domain(data.map(function (d) { return d[encoding.x.field]; }))
            .range([0, width]);
        var stacked_area_generator = d3.area()
            .x(d => ((x(d.data.x) - width * (x0 / 100)) / scale))
            // .x(d => x(d.data.x))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]))
        return stacked_area_generator;
    }

    var y = d3.scaleLinear()
        var x = d3.scalePoint()
        let areaLayer = svg.select('#areaLayer')
    if (animation.spec.effect === "zoom in") {
        let rangeX = animation.spec.rangeX ? animation.spec.rangeX : [0, 100];
        let x0 = rangeX[0];
        let x1 = rangeX[1];
        let dataCategories = getCategories(data, encoding);
        let categories = Object.keys(dataCategories);
        let n_categories = categories.length;
        let n_categories_ = 100 / n_categories;
        // let category0 = categories[Math.floor(x0 / n_categories_)];
        // let category1 = x1 === 100 ? categories.slice(-1)[0] : categories[Math.floor(x1 / n_categories_)];
        x0 = Math.floor(x0 / n_categories_)
        x1 = x1 === 100 ? n_categories - 1 : Math.floor(x1 / n_categories_);
        // 极端情况 只有一个值
        if (x0 === x1) {
            if (x1 !== n_categories - 1) {
                x1 = x0 + 1
            } else {
                x0 = x1 - 1
            }
        }
      
        if (animation.spec.rangeY || animation.spec.rangeX) {

            y.domain(animation.spec.rangeY).nice().range([height, 0]);
            areaLayer.selectAll(".y.axis")
                .transition()
                .duration(animation.duration)
                .call(d3.axisLeft(y));

            // 经过计算得到的chart真实偏移量
            let rangeX_ = [100 / (n_categories - 1) * x0, 100 / (n_categories - 1) * x1]

            x.domain(categories.slice(x0, x1 + 1)).range([0, width]);

            areaLayer.selectAll(".x.axis")
                .transition()
                .duration(animation.duration)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            areaLayer.select('.areaG')
                .selectAll("path")
                .transition()
                .duration(animation.duration)
                .attr("d", stacked_area_generator(animation.spec.rangeY, rangeX_))

        }
    } else {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
        areaLayer.selectAll(".y.axis")
            .transition()
            .duration(animation.duration)
            .call(d3.axisLeft(y));

        x.domain(data.map(function (d) { return d[encoding.x.field]; })).range([0, width]);

        areaLayer.selectAll(".x.axis")
            .transition()
            .duration(animation.duration)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

            areaLayer.select('.areaG')
            .selectAll("path")
            .transition()
            .duration(animation.duration)
            .attr("d", stacked_area_generator([0, d3.max(stackedData[stackedData.length - 1], d => d[1])], [0, 100]))
    }
    return svg;
}

export default draw;