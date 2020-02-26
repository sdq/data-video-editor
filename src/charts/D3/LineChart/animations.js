import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';
 
const animations = {
    "Temporal": [
        {
            type: ChartAnimationType.TREND,
            task: ChartAnimationTask.TEMPORAL,
            title: "Data Trend",
            description: "Show data trend of all series from {range}",
            duration: 2000,
            spec: {
                series: "all",
                effect: "grow", // or fadeIn grow
                oneByOne: false
            }
        },
        {
            type: ChartAnimationType.REGRESSION,
            task: ChartAnimationTask.TEMPORAL,
            title: "Regression",
            description: "Show regression of {range} series",
            duration: 2000,
            spec: {
                series: "",
                effect: "grow" // or fadein
            }
        },
    ],
    'Compare': [
        {
            type: ChartAnimationType.COMPARE_SERIES,
            task: ChartAnimationTask.COMPARE,
            title: "Series",
            description: "Compare the {series1} and {series2}",
            duration: 2000,
            spec: {
                series1: null,
                series2: null,
                effect: "superposition" // superposition difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_EXTREMES,
            task: ChartAnimationTask.COMPARE,
            title: "Extremes",
            description: "Compare the max value in the {series1} and {series2}",
            duration: 2000,
            spec: {
                series1: null,
                series2: null,
                value: 'max',
                effect: "difference" // superposition difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_VALUES,
            task: ChartAnimationTask.COMPARE,
            title: "Values",
            description: "Compare the value of category in the {series1} and {series2}",
            duration: 2000,
            spec: {
                series1: null,
                series2: null,
                value: 'max',
                effect: "difference" // superposition difference
            }
        },
    ],
    "Emphasis": [
        {
            type: ChartAnimationType.EMPHASIZE_SERIES,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Series",
            description: "Emphasize the {range} series",
            duration: 2000,
            spec: {
                series: "",
                effect: "popUp" // filter flicker or popUp
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_EXTREME,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Extreme",
            description: "Emphasize the max value in the series",
            duration: 2000,
            spec: {
                series: "all",
                value: "max",
                effect: "filter" // or flicker filter circle
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_VALUE,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Value",
            description: "Emphasize the value of category in the series",
            duration: 2000,
            spec: {
                series: "",
                category: "",
                effect: "flicker" // or flicker filter circle
            }
        },
    ], 
};

export default animations;