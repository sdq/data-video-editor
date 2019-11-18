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
                range: {},
                effect: "filter" // or flicker
            }
        },
    ],
    "Emphasize": [
        {
            type: ChartAnimationType.EMPHASIZE_CATEGORY,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Category",
            description: "Emphasize the category with {category}",
            duration: 2000,
            spec: {
                series: "",
                extreme: "",
                category: "",
                effect: "filter" // or flicker
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_EXTREME,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Extreme",
            description: "Emphasize the {extreme} value in the {series} series",
            duration: 2000,
            spec: {
                series: "",
                extreme: "",
                category: "",
                effect: "filter" // or flicker
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
                extreme: "",
                category: "",
                effect: "filter" // or flicker
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_SERIES,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Series",
            description: "Emphasize the {series} series",
            duration: 2000,
            spec: {
                series: "",
                extreme: "",
                category: "",
                effect: "filter" // or flicker
            }
        },
    ],
    "Comparison": [
        {
            type: ChartAnimationType.COMPARE_CATEGORIES,
            task: ChartAnimationTask.COMPARISON,
            title: "Categories",
            description: "Compare the {category1} and {category2} categories",
            duration: 2000,
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
            description: "Compare the {extreme} values between between the {series1} and {series2}",
            duration: 2000,
            spec: {
                series1: "",
                extreme1: "max",
                category1: "",
                series2: "",
                extreme2: "max",
                category2: "",
                effect: "superposition" // or difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_VALUES,
            task: ChartAnimationTask.COMPARISON,
            title: "Values",
            description: "Compare the values of {category} between the {series1} and {series2}",
            duration: 2000,
            spec: {
                series1: "",
                extreme1: "",
                category1: "",
                series2: "",
                extreme2: "",
                category2: "",
                effect: "superposition" // or difference
            }
        },
        {
            type: ChartAnimationType.COMPARE_SERIES,
            task: ChartAnimationTask.COMPARISON,
            title: "Series",
            description: "Compare the {series1} and {series2}",
            duration: 2000,
            spec: {
                series1: "",
                extreme1: "",
                category1: "",
                series2: "",
                extreme2: "",
                category2: "",
                effect: "superposition" // or difference
            }
        },
    ],
    "Reconfiguration": [
        {
            type: ChartAnimationType.RECONFIGURE_ORDER,
            task: ChartAnimationTask.RECONFIGURATION,
            title: "Order",
            description: "Reconfigure the order to {series} series",
            duration: 2000,
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
                from: "stacked",
                to: "normalized",
            }
        },
    ]
};

export default animations;