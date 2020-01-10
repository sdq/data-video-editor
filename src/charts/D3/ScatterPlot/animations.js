import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';

const animations = {
    "Tendency": [
        {
            type: ChartAnimationType.DATA_TREND,
            task: ChartAnimationTask.TENDENCY,
            title: "Data Trend",
            description: "Show data trend of all series from {range}",
            duration: 10000,
            spec: {
                series: "all",
                effect: "appear", // or fade in
                //temporal
                range: "full",
                rangeScope: [],
                gap: 0,
            }
        },
        {
            type: ChartAnimationType.REGRESSION,
            task: ChartAnimationTask.TENDENCY,
            title: "Regression",
            description: "Show regression of {range} series",
            duration: 2000,
            spec: {
                series: "all",
                effect: "grow" // or fadein
            }
        },
    ],
    "Emphasize": [
        {
            type: ChartAnimationType.EMPHASIZE_SERIES,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Series",
            description: "Emphasize the {series} series",
            duration: 2000,
            spec: {
                series: "all",
                effect: "flicker" // or filter
            }
        },{
            type: ChartAnimationType.EMPHASIZE_EXTREME,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Extreme",
            description: "Emphasize the {extreme} value in the {series} series",
            duration: 2000,
            spec: {
                series: "all",
                channel: "x",
                value: "max",
                effect: "filter" // or flicker
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_VALUE,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Value",
            description: "Emphasize the {value} value in the {series} series",
            duration: 2000,
            spec: {
                series: "all",
                channel: "x",
                value: "max",
                effect: "filter" // or flicker
            }
        },
    ],
    "Comparison": [
        {
            type: ChartAnimationType.COMPARE_SERIES,
            task: ChartAnimationTask.COMPARISON,
            title: "Series",
            description: "Compare the {series1} and {series2}",
            duration: 2000,
            spec: {
                series1: null,
                series2: null,
                effect: "superposition"
            }
        },
        {
            type: ChartAnimationType.COMPARE_EXTREMES,
            task: ChartAnimationTask.COMPARISON,
            title: "Extremes",
            description: "Compare the {extreme} values between between the {series1} and {series2}",
            duration: 5000,
            spec: {
                series1: null,
                value1: "max",
                series2: null,
                value2: "max",
                channel: "x",
                effect: "superposition" // or difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_VALUES,
            task: ChartAnimationTask.COMPARISON,
            title: "Values",
            description: "Compare the values of {category} between the {series1} and {series2}",
            duration: 5000,
            spec: {
                series1: null,
                value1: "max",
                series2: null,
                value2: "max",
                channel: "x",
                effect: "difference" // or difference
            }
        },
    ],
    "Reconfiguration": [
        {
            type: ChartAnimationType.RECONFIGURE_SCOPE,
            task: ChartAnimationTask.RECONFIGURATION,
            title: "Scope",
            description: "Reconfigure the view scope to {scope}",
            duration: 2000,
            spec: {
                scope: {},
                effect: "zoom in"
            }
        },
        {
            type: ChartAnimationType.RECONFIGURE_STYLE,
            task: ChartAnimationTask.RECONFIGURATION,
            title: "Style",
            description: "Reconfigure the scale in x axis",
            duration: 2000,
            spec: {
                from: "linear",
                to: "log",
            }
        },
    ],
};

export default animations;