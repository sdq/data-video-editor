import * as d3 from 'd3';

const getMinRows = (rawData, encoding) =>{
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let data = calculateData.map(function (d) {
        return d.values[d3.scan(d.values, function(a, b) {
            if(a[encoding.y.field] && b[encoding.y.field])
                return a[encoding.y.field]- b[encoding.y.field]; 
            })];
    });
    return data;
}

const getMaxRows = (rawData, encoding) =>{
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let data = calculateData.map(function (d) {
        return d.values[d3.scan(d.values, function(a, b) {
            if(a[encoding.y.field] && b[encoding.y.field])
                return b[encoding.y.field]- a[encoding.y.field]; 
            })];
    });
    return data;
}

export {getMinRows, getMaxRows}