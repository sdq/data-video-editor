import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';

const animations = {
    "Temporal": [
        {
            type: ChartAnimationType.TREND,
            task: ChartAnimationTask.TEMPORAL,
            title: "Trend",
            description: "Show data trend of all data from 1970-1982",
            duration: 10000,
            spec: {
                range: "full",
                rangeScope: [],
                gap: 0,
            }
        },
    ],
    "Compare": [
        {
            type: ChartAnimationType.COMPARE_EXTREMES,
            task: ChartAnimationTask.COMPARE,
            title: "Extremes",
            description: "Compare the extreme values between max and max",
            duration: 1000,
            spec: {
                extreme1: "max",
                extreme2: "min",
                effect: "juxtaposition" 
            }
        },
        {
            type: ChartAnimationType.COMPARE_VALUES,
            task: ChartAnimationTask.COMPARE,
            title: "Values",
            description: "Compare the values between USA and Europe",
            duration: 1000,
            spec: {
                category1: "",
                category2: "",
                effect: "juxtaposition" 
            }
        },
    ],
    "Emphasis": [
        {
            type: ChartAnimationType.EMPHASIZE_EXTREME,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Extreme",
            description: "Emphasize the  max value",
            duration: 1000,
            spec: {
                extreme: "max",
                effect: "filter" //or fliker/popup
            }
        },
        {
            type: ChartAnimationType.EMPHASIZE_VALUE,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Value",
            description: "Emphasize the value of USA",
            duration: 1000,
            spec: {
                category: "",
                effect: "filter" // or flicker/popup
            }
        },
    ],
};

export default animations;