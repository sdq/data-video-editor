import FieldType from '../../constants/FieldType';

const countrysSchema = [
    {
        name: "Country",
        type: FieldType.NOMINAL,
    },
    {
        name: "Year",
        type: FieldType.TEMPORAL,
    },
    {
        name: "Income",
        type: FieldType.QUANTITATIVE,
    },
    {
        name: "Life_expectancy",
        type: FieldType.QUANTITATIVE,
    },
];
export default countrysSchema;