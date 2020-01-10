import ChartAnimationTask from '../ChartAnimationTask';
import ChartAnimationType from '../ChartAnimationType';

const animations = {
    "Tendency": [
        {
            type: ChartAnimationType.DATA_TREND,
            task: ChartAnimationTask.TENDENCY,
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
    "Emphasize": [
        {
            type: ChartAnimationType.EMPHASIZE_EXTREME,
            task: ChartAnimationTask.EMPHASIZE,
            title: "Extreme",
            description: "Emphasize the  maximum value",
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
    "Comparison": [
        {
            type: ChartAnimationType.COMPARE_EXTREMES,
            task: ChartAnimationTask.COMPARISON,
            title: "Extremes",
            description: "Compare the extreme values between max and max",
            duration: 1000,
            spec: {
                extreme1: "max",
                extreme2: "max",
                effect: "juxtaposition" 
            }
        },
        {
            type: ChartAnimationType.COMPARE_VALUES,
            task: ChartAnimationTask.COMPARISON,
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

};

export default animations;