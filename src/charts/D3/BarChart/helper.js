import * as d3 from 'd3';

const getCategories = (rawData, encoding) => {
    let dataCategories = {}
    for (let i = 0; i < rawData.length; i++) {
        if (dataCategories[rawData[i][encoding.x.field]]) {
            dataCategories[rawData[i][encoding.x.field]].push(rawData[i]);
        }
        else {
            dataCategories[rawData[i][encoding.x.field]] = [rawData[i]];
        }
    }
    return dataCategories;
}

const getSeries = (rawData, encoding) => {
    let dataSeries = {}
    for (let i = 0; i < rawData.length; i++) {
        if (dataSeries[rawData[i][encoding.color.field]]) {
            dataSeries[rawData[i][encoding.color.field]].push(rawData[i]);
        }
        else {
            dataSeries[rawData[i][encoding.color.field]] = [rawData[i]];
        }
    }
    return dataSeries;
}
 
const getMinRows = (rawData, encoding) => {
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let data = calculateData.map(function (d) {
        let index = d3.scan(d.values, function(a, b) {
            if(a[encoding.y.field] && b[encoding.y.field])
                return a[encoding.y.field]- b[encoding.y.field]; 
            });
        if(index >= 0) return d.values[index]
        // index === 'undefined'
        else {
            return d.values[0]
        }
    });
    return data;
}

const getMaxRows = (rawData, encoding) =>{
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let data = calculateData.map(function (d,i) {
        let index = d3.scan(d.values, function(a, b) {
            if(a[encoding.y.field] && b[encoding.y.field])
                return b[encoding.y.field]- a[encoding.y.field]; 
            });
        if(index >= 0) return d.values[index]
        // index === 'undefined'
        else {
            return d.values[0]
        }
    });
    return data;
}

export {getCategories, getSeries, getMinRows, getMaxRows}