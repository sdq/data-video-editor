const columns = [
    {
        title: 'Name',
    },
    {
        title: 'Cylinders',
        sorter: (a, b) => a.Cylinders - b.Cylinders,
    },
    {
        title: 'Origin',
    },
    {
        title: 'Acceleration',
        sorter: (a, b) => a.Acceleration - b.Acceleration,
    },
    {
        title: 'Miles_per_Gallon',
        sorter: (a, b) => a.Miles_per_Gallon - b.Miles_per_Gallon,
    },
    {
        title: 'Displacement',
        sorter: (a, b) => a.Cylinders - b.Cylinders,
    },
    {
        title: 'Horsepower',
        sorter: (a, b) => a.Horsepower - b.Horsepower,
    },
    {
        title: 'Weight_in_lbs',
        sorter: (a, b) => a.Weight_in_lbs - b.Weight_in_lbs,
    },
    {
        title: 'Year',
        sorter: (a, b) => a.Year - b.Year,
    },
];

export default columns;