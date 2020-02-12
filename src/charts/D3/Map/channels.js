import FieldType from '@/constants/FieldType';

const channels = {
    area: {
        name: 'area',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
    },
    color: {
        name: 'color',
        type: [FieldType.NOMINAL, FieldType.ORDINAL, FieldType.TEMPORAL],
    },
};

export default channels;