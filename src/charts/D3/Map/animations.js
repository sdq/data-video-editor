import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';

const animations = {
    "Tendency": [
        {
            type: ChartAnimationType.DATA_TREND,
            task: ChartAnimationTask.TENDENCY,
            title: "Data Trend",
            description: "Show data trend of all series",
            duration: 10000,
            spec: {
                range: "full",
                rangeScope: [],
                gap: 0,
            }
        },
    ],
    "Emphasize": [
        {
            type: ChartAnimationType.EMPHASIZE_CATEGORY,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Category",
            description: "Emphasize the category",
            duration: 1000,
            spec: {
                category: "",
                effect: "filter" // or flicker
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_EXTREME,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Extreme",
            description: "Emphasize the max value in the series",
            duration: 1000,
            spec: {
                series: "",
                extreme: "max",
                effect: "filter" // or flicker
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_VALUE,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Value",
            description: "Emphasize the value of category in the series",
            duration: 1000,
            spec: {
                series: "",
                category: "",
                effect: "filter" // or flicker
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_SERIES,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Series",
            description: "Emphasize the series",
            duration: 1000,
            spec: {
                series: "",
                effect: "filter" // or flicker
            }
        },
    ],
    "Comparison": [
        {
            type: ChartAnimationType.COMPARE_CATEGORIES,
            task: ChartAnimationTask.COMPARISON,
            title: "Categories",
            description: "Compare two categories",
            duration: 1000,
            spec: {
                category1: "",
                category2: "",
                effect: "superposition" // or difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_EXTREMES,
            task: ChartAnimationTask.COMPARISON,
            title: "Extremes",
            description: "Compare the extreme values between series",
            duration: 1000,
            spec: {
                series1: "",
                extreme1: "max",
                series2: "",
                extreme2: "max",
                effect: "superposition" // or difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_VALUES,
            task: ChartAnimationTask.COMPARISON,
            title: "Values",
            description: "Compare between the values of category in series",
            duration: 1000,
            spec: {
                series1: "",
                category1: "",
                series2: "",
                category2: "",
                effect: "superposition" // or difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_SERIES,
            task: ChartAnimationTask.COMPARISON,
            title: "Series",
            description: "Compare the two series",
            duration: 1000,
            spec: {
                series1: "",
                series2: "",
                effect: "superposition" // or difference
            }
        },
    ],
    "Reconfiguration": [
        {
            type: ChartAnimationType.RECONFIGURE_ORDER,
            task: ChartAnimationTask.RECONFIGURATION,
            title: "Order",
            description: "Reconfigure the order to all series",
            duration: 1000,
            spec: {
                series: "",
                order: "ascending",
                effect: "switch",
            }
        },
        {
            type: ChartAnimationType.RECONFIGURE_SCOPE,
            task: ChartAnimationTask.RECONFIGURATION,
            title: "Scope",
            description: "Reconfigure the view scope to {scope}",
            duration: 1000,
            spec: {
                scope: {},
                effect: "zoom in"
            }
        },
        {
            type: ChartAnimationType.RECONFIGURE_STYLE,
            task: ChartAnimationTask.RECONFIGURATION,
            title: "Style",
            description: "Reconfigure the stacked style to the grouped style",
            duration: 1000,
            spec: {
                startLayout: "stacked",
                endLayout: "grouped",
            }
        },
    ],
};

export default animations;