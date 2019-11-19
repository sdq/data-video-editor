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
        dataSeries[s] = getMaxRows(dataSeries[s], encoding);
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
            return d.values[0]
        }
    });
    return data;
}

export {getCategories, getSeries, getStackedData, getMinRows, getMaxRows}