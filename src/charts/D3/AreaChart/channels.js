import FieldType from '@/constants/FieldType';

const channels = {
    x: {
        name: 'x',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
    },
    y: {
        name: 'y',
        type: [FieldType.QUANTITATIVE],
        aggregation: 'average'
    },
    color: {
        name: 'color',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
    },
    // time: {
    //     name: 'time',
    //     type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
    //     animation: true,
    // }
};

export default channels;