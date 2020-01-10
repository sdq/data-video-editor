import FieldType from '@/constants/FieldType';

const channels = {
    color: {
        name: 'color',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
    },
    size: {
        name: 'size',
        type: [FieldType.QUANTITATIVE],
        aggregation: 'average',
    },
    time: {
        name: 'time',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
        animation: true,
    }
};

export default channels;