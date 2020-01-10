import FieldType from '@/constants/FieldType';

const channels = {
    x: {
        name: 'x',
        type: [FieldType.QUANTITATIVE],
    },
    y: {
        name: 'y',
        type: [FieldType.QUANTITATIVE],
    },
    color: {
        name: 'color',
        type:[FieldType.NOMINAL, FieldType.ORDINAL],//, FieldType.QUANTITATIVE
    },
    size: {
        name: 'size',
        type:[FieldType.QUANTITATIVE],
    },
    time: {
        name: 'time',
        type: [FieldType.TEMPORAL],
        animation: true,
    },
    id: {
        name: 'id',
        type: [FieldType.NOMINAL],
        animation: true,
    }
};

export default channels;