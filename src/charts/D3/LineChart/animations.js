import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';
 
const animations = {
    "Tendency": [
        {
            type: ChartAnimationType.DATA_TREND,
            task: ChartAnimationTask.TENDENCY,
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
            task: ChartAnimationTask.TENDENCY,
            title: "Regression",
            description: "Show regression of {range} series",
            duration: 2000,
            spec: {
                series: "",
                effect: "grow" // or fadein
            }
        },
    ],
    "Emphasize": [
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
    'Comparison': [
        {
            type: ChartAnimationType.COMPARE_SERIES,
            task: ChartAnimationTask.COMPARISON,
            title: "Series",
            description: "Compare the {series1} and {series2}",
            duration: 2000,
            spec: {
                series1: null,
                series2: null,
                effect: "difference" // superposition difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_EXTREMES,
            task: ChartAnimationTask.COMPARISON,
            title: "Extreme",
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
            task: ChartAnimationTask.COMPARISON,
            title: "Value",
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
    "Reconfiguration": [
        {
            type: ChartAnimationType.RECONFIGURE_SCOPE,
            task: ChartAnimationTask.RECONFIGURATION,
            title: "Scope",
            description: "Reconfigure the view scope to {scope}",
            duration: 1000,
            spec: {
                scope: {},
                effect: "zoom in" //out
            }
        },
    ]
};

export default animations;