import * as d3 from 'd3';
import _ from 'lodash';

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
const getSeriesValue = (rawData, encoding) => {
    if(('color' in encoding) && !_.isEmpty(encoding.color)){
    // console.log(new Set(rawData.map(d => d[encoding.color.field])))
        return Array.from(new Set(rawData.map(d => d[encoding.color.field])));}
    else return [];
}

const getStackedData = (rawData, encoding) => {
    if (!('color' in encoding)) {
        return []
    }
    let dataCategories = getCategories(rawData, encoding);
    let categories = Object.keys(dataCategories);
    let dataSeries = getSeries(rawData, encoding);
    let series = Object.keys(dataSeries);
    let dataSeriesCategories = {};
    for (const s in dataSeries) {
        dataSeriesCategories[s] = {};
        dataSeries[s] = getAggregatedRows(dataSeries[s], encoding);
        for (let index = 0; index < dataSeries[s].length; index++) {
            const rowData = dataSeries[s][index];
            // console.log(rowData);
            dataSeriesCategories[s][rowData[encoding.x.field]] = rowData[encoding.y.field]
        }
    }

    let preparedData = series.map((s) => {
        let sData = [];
        categories.forEach(c => {
            sData.push({
                x: c,
                y: dataSeriesCategories[s][c]?dataSeriesCategories[s][c]:0,
                y0: 0,
            })
        });
        return sData;
    })
    let reducedData = preparedData[0].map((d) => {
        let z = {x: d.x};
        z[series[0]] = d.y;
        return z;
    });
    for (let i = 1; i < preparedData.length; i++) {
        let s = series[i]
        for (let j = 0; j < categories.length; j++) {
            // const element = array[index];
            reducedData[j][s] = preparedData[i][j].y
        }
        
    }
    let stackedData = d3.stack().keys(series)(reducedData);
    return stackedData;

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
            return d.values[0];
        }
    });
    return data;
}

const getSumRows = (rawData, encoding) =>{
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let sumData = new Array(calculateData.length).fill(0);
    let data = calculateData.map(function (d,i) {
        d.values.forEach(d=>{
            sumData[i] += d[encoding.y.field]
        })
        let sumRows = Object.assign({},d.values[0])
        sumRows[encoding.y.field] = sumData[i]
        return sumRows
    });
    return data;
}

const getAverageRows = (rawData, encoding) =>{
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let sumData = new Array(calculateData.length).fill(0);
    let data = calculateData.map(function (d,i) {
        d.values.forEach(d=>{
            sumData[i] += d[encoding.y.field]
        })
        let sumRows = Object.assign({},d.values[0])
        sumRows[encoding.y.field] = sumData[i] / d.values.length;
        return sumRows;
    });
    return data;
}

const getAggregatedRows = (rawData, encoding) => {
    let data;
    switch (encoding.y.aggregation) {
        case 'sum':
            data = getSumRows(rawData, encoding);
            break;
        case 'average':
            data = getAverageRows(rawData, encoding);
            break;
        case 'max':
            data = getMaxRows(rawData, encoding);
            break;
        case 'min':
            data = getMinRows(rawData, encoding);
            break;

        default:
            data = getMaxRows(rawData, encoding);
            break;
    }
    return data;
}

export {getCategories, getSeries, getStackedData, getAggregatedRows, getMaxRows, getSeriesValue}