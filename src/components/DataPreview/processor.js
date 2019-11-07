import * as d3 from 'd3';
import FieldType from '@/constants/FieldType';

class DataProcessor {
    constructor() {
        if (!DataProcessor.instance) {
            DataProcessor.instance = this;
        } else {
            return DataProcessor.instance;
        }
    }

    definedType = () => {
        return FieldType.NOMINAL;
    }

    process = (fileURL) => {
        return new Promise((resolve, reject) => {
            d3.csv(fileURL)
                .then(function (data) {
                    let schema = [];
                    for (let key in data[0]) {
                        if (!isNaN(data[0][key])) {
                            schema.push({ name: key, type: FieldType.QUANTITATIVE })
                        }
                        else {
                            schema.push({ name: key, type: FieldType.NOMINAL })
                        }
                    }
                    let dataItem = {
                        schema: schema,
                        data: data
                    }
                    resolve(dataItem);
                })
                .catch(function (error) {
                    reject(error);
                })
        });
    }
}

export default DataProcessor;