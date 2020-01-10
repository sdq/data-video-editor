// import * as d3 from 'd3';
import _ from 'lodash';

const getSeries = (rawData, encoding) => {
    if(('color' in encoding) && !_.isEmpty(encoding.color))
        return Array.from(new Set(rawData.map(d => d[encoding.color.field])));
    else return [];
}

const getLeastSquares = (X, Y) => {
    let ret = {}
  
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumXSq = 0
    let N = X.length
  
    for(let i = 0; i < N; ++i) {
      sumX += X[i]
      sumY += Y[i]
      sumXY += X[i] * Y[i]
      sumXSq += X[i] * X[i]
    }
  
    ret.m = ((sumXY - sumX * sumY / N) ) / (sumXSq - sumX * sumX / N)
    ret.b = sumY / N - ret.m * sumX / N
  
    return ret;
  }


export {getSeries, getLeastSquares}