import * as d3 from 'd3';
//import _ from 'lodash';

const offset = 20;

const draw = (props) => {
    let a = document.createElement("div");
    if (!props.onCanvas) {
        d3.select('.vis-proportionchart > *').remove();
        a = '.vis-proportionchart';
    }

    const margin = {top: 10, right: -10, bottom: 40, left: 40};
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Process Data
    // const data = props.data;

    // Encoding
    // const encoding = props.spec.encoding;

    // Style
    // const style = props.spec.style;

    return svg;
}

export default draw;