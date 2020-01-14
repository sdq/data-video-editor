const defaultSpec = {
    "encoding": {
        "x": { "field": "Year", "type": "temporal" },
        "y": { "field": "Horsepower", "type": "quantitative" },
        "color": { "field": "Origin", "type": "nordinal" },
        "time": { "field": "Year", "type": "temporal" },
    },
    "style": {
        "layout": "stacked",
    },
    "animation": []
}

export default defaultSpec;