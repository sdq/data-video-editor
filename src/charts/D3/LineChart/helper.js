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
        let index = d3.scan(d.values, function (a, b) {
            if (a[encoding.y.field] && b[encoding.y.field])
                return a[encoding.y.field] - b[encoding.y.field];
        });
        if (index >= 0) return d.values[index]
        // index === 'undefined'
        else {
            return d.values[0]
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

const getMaxRows = (rawData, encoding) => {
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let data = calculateData.map(function (d, i) {
        let index = d3.scan(d.values, function (a, b) {
            if (a[encoding.y.field] && b[encoding.y.field])
                return b[encoding.y.field] - a[encoding.y.field];
        });
        if (index >= 0) return d.values[index]
        // index === 'undefined'
        else {
            return d.values[0]
        }
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


const getLeastSquares = (X, Y) => {

    let ret = {}

    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumXSq = 0
    let N = X.length


    for (let i = 0; i < N; ++i) {
        sumX += X[i]
        sumY += Y[i]
        sumXY += X[i] * Y[i]
        sumXSq += X[i] * X[i]
    }

    ret.m = ((sumXY - sumX * sumY / N)) / (sumXSq - sumX * sumX / N)
    ret.b = sumY / N - ret.m * sumX / N

    return ret;
}

// var formatMillisecond = d3.timeFormat(".%L"),
//     formatSecond = d3.timeFormat(":%S"),
//     formatMinute = d3.timeFormat("%I:%M"),
//     formatHour = d3.timeFormat("%I %p"),
//     formatDay = d3.timeFormat("%a %d"),
//     formatWeek = d3.timeFormat("%b %d"),
//     formatMonth = d3.timeFormat("%B"),
//     formatYear = d3.timeFormat("%Y");

// var format_1 = d3.timeFormat("%Y-%m-%d"),
//     format_2 = d3.timeFormat("%Y");

// function multiFormat(date) {
//   return (d3.timeSecond(date) < date ? formatMillisecond
//       : d3.timeMinute(date) < date ? formatSecond
//       : d3.timeHour(date) < date ? formatMinute
//       : d3.timeDay(date) < date ? formatHour
//       : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
//       : d3.timeYear(date) < date ? formatMonth
//       : formatYear)(date);
// }

// const parseTime = d3.timeParse("%Y-%m-%d") ? d3.timeParse("%Y-%m-%d") : d3.timeParse("%Y");

const parseTime = (date) => {
    if (d3.timeParse("%Y-%m-%d")(date)) 
        return d3.timeParse("%Y-%m-%d")(date);
    else if (d3.timeParse("%Y/%m/%d")(date)) 
        return d3.timeParse("%Y/%m/%d")(date);
    else if (d3.timeParse("%Y-%m")(date)) 
        return d3.timeParse("%Y-%m")(date);
    else if (d3.timeParse("%Y/%m")(date)) 
        return d3.timeParse("%Y/%m")(date);
    else if (d3.timeParse("%Y")(date))
        return d3.timeParse("%Y")(date)
} 
const formatTick = (date) => {
    if (d3.timeParse("%Y-%m-%d")(date)) 
        return d3.timeFormat("%Y-%m-%d");
    else if (d3.timeParse("%Y/%m/%d")(date))
        return d3.timeFormat("%Y/%m/%d")
    else if (d3.timeParse("%Y-%m")(date))
        return d3.timeFormat("%Y-%m")
    else if (d3.timeParse("%Y/%m")(date))
        return d3.timeFormat("%Y/%m")
    else if (d3.timeParse("%Y")(date))
        return d3.timeFormat("%Y")
}

const formatTicksCount = (date) => {
    if (d3.timeParse("%Y-%m-%d")(date)) 
        return d3.timeDay
    else if (d3.timeParse("%Y/%m/%d")(date))
        return d3.timeDay
    else if (d3.timeParse("%Y-%m")(date))
        return d3.timeMonth
    else if (d3.timeParse("%Y/%m")(date))
        return d3.timeMonth
    else if (d3.timeParse("%Y")(date))
        return d3.timeYear
}

function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return parseTime(a.x) - parseTime(b.x);
}




export { getCategories, getSeries, getMinRows, getMaxRows, parseTime, formatTick, getLeastSquares, getAggregatedRows, formatTicksCount, sortByDateAscending }