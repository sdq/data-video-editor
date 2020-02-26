import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';

const animations = {
    "Temporal": [
        {
            type: ChartAnimationType.TREND,
            task: ChartAnimationTask.TEMPORAL,
            title: "Trend",
            description: "Show data trend of all series from {range}",
            duration: 2000,
            spec: {
                series: "all",
                effect: "wipe", // or fade in
            }
        }
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
    ],
    "Emphasis": [
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
        }, {
            type: ChartAnimationType.EMPHASIZE_EXTREME,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Extreme",
            description: "Emphasize the max value in the series",
            duration: 3000,
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
            description: "Emphasize the value of {category} of in the {series} series",
            duration: 2000,
            spec: {
                series: "",
                value: "",
                category: "",
                effect: "filter" // or flicker
            }
        },
    ],
    "Granularity": [
        {
            type: ChartAnimationType.GRANULARITY_SCOPE,
            task: ChartAnimationTask.GRANULARITY,
            title: "Scope",
            description: "Reconfigure the view scope to {scope}",
            duration: 2000,
            spec: {
                scope: {},
                effect: "zoom in"
            }
        },
    ],
    "Style": [
        {
            type: ChartAnimationType.RECONFIGURE_STYLE,
            task: ChartAnimationTask.STYLE,
            title: "Style",
            description: "Reconfigure the stacked style to the percent style",
            duration: 2000,
            spec: {
                startLayout: "stacked",
                endLayout: "percent",
            }
        },
    ],
};

export default animations;