import FieldType from '@/constants/FieldType';

const channels = {
    size: {
        name: 'size',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
        aggregation: 'average',
    },
    color: {
        name: 'color',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
    },
    time: {
        name: 'time',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
        animation: true,
    }
};

export default channels;