import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';

const animations = {
    "Tendency": [
        {
            type: ChartAnimationType.DATA_TREND,
            task: ChartAnimationTask.TENDENCY,
            title: "Trend",
            description: "Show data trend of all series from {range}",
            duration: 2000,
            spec: {
                series: "all",
                effect: "wipe", // or fade in
            }
        }
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
                effect: "superposition" // superposition difference
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
            description: "Reconfigure the style to the {to} style",
            duration: 2000,
            spec: {
                startLayout: "stacked",
                endLayout: "percent",
            }
        },
    ],
};

export default animations;