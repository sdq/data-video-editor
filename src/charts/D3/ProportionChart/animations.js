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
        }
    ],
    "Comparison": [
        {
            type: ChartAnimationType.COMPARE_EXTREMES,
            task: ChartAnimationTask.COMPARISON,
            title: "Extremes",
            description: "Compare the extreme values",
            duration: 1000,
            spec: {
                series1: "",
                extreme1: "max",
                series2: "",
                extreme2: "min",
                effect: "juxtaposition" // juxtaposition
            }
        },
        {
            type: ChartAnimationType.COMPARE_VALUES,
            task: ChartAnimationTask.COMPARISON,
            title: "Values",
            description: "Compare between the values of category",
            duration: 1000,
            spec: {
                series1: "",
                category1: "",
                series2: "",
                category2: "",
                effect: "juxtaposition" // juxtaposition
            }
        }
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
        }
    ],
};

export default animations;