import FieldType from '../../constants/FieldType';

const nCoV2020Schema = [
    {
        name: "Date",
        type: FieldType.TEMPORAL,
    },
    {
        name: "Province",
        type: FieldType.CATEGORICAL,
    },
    {
        name: "Country",
        type: FieldType.CATEGORICAL,
    },
    {
        name: "Confirmed",
        type: FieldType.QUANTITATIVE,
    },
    {
        name: "Deaths",
        type: FieldType.QUANTITATIVE,
    },
    {
        name: "Recovered",
        type: FieldType.QUANTITATIVE,
    },
];
export default nCoV2020Schema;